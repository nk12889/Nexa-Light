// Supabase data layer for NexaLight.
//
// The site was written against Firebase Firestore, so this module exposes the
// same small API (collection, doc, getDocs, getDoc, setDoc, updateDoc,
// deleteDoc, onSnapshot) on top of Supabase. Every Firestore document is a row
// in public.documents (collection, id, data jsonb).
//
// The key below is the public "publishable" key: it is meant to ship to the
// browser. Row Level Security only lets signed-in admins (public.admin_users)
// change data; everyone can read.
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";

const SUPABASE_URL = "https://rgqcfplwuxmdpvnioapg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_qGUkKu_rJD0V9dfTD1N47w_mw_A3mDZ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export const db = supabase;

const TABLE = "documents";

function check({ data, error }) {
    if (error) throw error;
    return data;
}

function snapshot(id, data) {
    return {
        id,
        exists: () => data !== null && data !== undefined,
        data: () => (data === null || data === undefined ? undefined : data)
    };
}

function querySnapshot(rows) {
    const docs = rows.map(r => snapshot(r.id, r.data));
    return {
        docs,
        size: docs.length,
        empty: docs.length === 0,
        forEach: (fn) => docs.forEach(fn)
    };
}

export function collection(_db, name) {
    return { type: "collection", collection: name };
}

export function doc(_db, collectionName, id) {
    return { type: "doc", collection: collectionName, id: String(id) };
}

export async function getDocs(colRef) {
    const rows = check(await supabase.from(TABLE).select("id, data").eq("collection", colRef.collection).order("id"));
    return querySnapshot(rows);
}

export async function getDoc(docRef) {
    const row = check(await supabase.from(TABLE).select("id, data")
        .eq("collection", docRef.collection).eq("id", docRef.id).maybeSingle());
    return snapshot(docRef.id, row ? row.data : null);
}

// Replaces the whole document, like Firestore setDoc without { merge }.
export async function setDoc(docRef, data) {
    check(await supabase.from(TABLE).upsert({ collection: docRef.collection, id: docRef.id, data }));
}

// Merges top-level fields into an existing document, like Firestore updateDoc.
export async function updateDoc(docRef, fields) {
    const current = await getDoc(docRef);
    if (!current.exists()) throw new Error(`No document to update: ${docRef.collection}/${docRef.id}`);
    check(await supabase.from(TABLE).update({ data: { ...current.data(), ...fields } })
        .eq("collection", docRef.collection).eq("id", docRef.id));
}

export async function deleteDoc(docRef) {
    check(await supabase.from(TABLE).delete().eq("collection", docRef.collection).eq("id", docRef.id));
}

// Calls `callback` with the current collection, then again after every
// insert/update/delete in it (Supabase Realtime). Returns an unsubscribe function.
export function onSnapshot(colRef, callback, onError) {
    const name = colRef.collection;
    let timer = null;
    const refresh = () => getDocs(colRef).then(callback).catch(err => {
        if (onError) onError(err); else console.error(`onSnapshot(${name}) failed:`, err);
    });

    refresh();
    const channel = supabase
        .channel(`documents-${name}-${Math.random().toString(36).slice(2)}`)
        .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, payload => {
            const row = payload.new && payload.new.collection ? payload.new : payload.old;
            if (!row || row.collection !== name) return;
            clearTimeout(timer);
            timer = setTimeout(refresh, 150);
        })
        .subscribe();

    return () => { clearTimeout(timer); supabase.removeChannel(channel); };
}

// --- Admin authentication (Supabase Auth) ---

export async function signIn(email, password) {
    check(await supabase.auth.signInWithPassword({ email, password }));
}

export async function signOut() {
    await supabase.auth.signOut();
}

export async function getSession() {
    return check(await supabase.auth.getSession()).session;
}

export async function isAdmin() {
    return check(await supabase.rpc("is_admin")) === true;
}

// Changes the signed-in admin's email and/or password.
export async function updateAdminLogin({ email, password }) {
    const changes = {};
    if (email) changes.email = email;
    if (password) changes.password = password;
    if (Object.keys(changes).length) check(await supabase.auth.updateUser(changes));
}

// --- Images (Supabase Storage, public bucket "media") ---

const MEDIA_BUCKET = "media";
const MEDIA_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/`;

// Uploads an image File/Blob and returns its public URL.
export async function uploadImage(file) {
    const type = file.type || "image/jpeg";
    const ext = (type.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    check(await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { contentType: type, cacheControl: "31536000" }));
    return MEDIA_PREFIX + path;
}

// Deletes an image previously returned by uploadImage(); other URLs are ignored.
export async function deleteImage(url) {
    if (typeof url !== "string" || !url.startsWith(MEDIA_PREFIX)) return;
    check(await supabase.storage.from(MEDIA_BUCKET).remove([decodeURIComponent(url.slice(MEDIA_PREFIX.length))]));
}

// Copies an external image into the bucket; returns the new URL, or the
// original one if the source cannot be fetched (e.g. blocked by CORS).
export async function importImage(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return url;
        return await uploadImage(await res.blob());
    } catch {
        return url;
    }
}
