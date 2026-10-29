<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || empty($data['url'])) {
    echo json_encode(['success' => false, 'error' => 'No URL specified.']);
    exit;
}

$url = $data['url'];

// Basic validation to ensure it's an external URL
if (!filter_var($url, FILTER_VALIDATE_URL) || !preg_match('/^https?:\/\//', $url)) {
    echo json_encode(['success' => false, 'error' => 'Invalid URL provided.']);
    exit;
}

$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Set up a context to avoid 403 Forbidden on some external hosts
$options = [
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n" .
                    "Accept: image/webp,image/apng,image/*,*/*;q=0.8\r\n"
    ]
];
$context = stream_context_create($options);

// Download the image data
$imageData = @file_get_contents($url, false, $context);

if ($imageData === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to download image from external URL.']);
    exit;
}

// Try to guess the extension from URL, fallback to .jpg
$extension = 'jpg';
$pathInfo = pathinfo(parse_url($url, PHP_URL_PATH));
if (isset($pathInfo['extension'])) {
    // Basic sanitization of extension
    $ext = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $pathInfo['extension']));
    if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
        $extension = $ext;
    }
}

// Determine actual mime type from data
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->buffer($imageData);
$mimeMap = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif'
];
if (isset($mimeMap[$mime])) {
    $extension = $mimeMap[$mime];
}

$newFileName = uniqid('mig_') . '.' . $extension;
$destination = $uploadDir . $newFileName;

if (file_put_contents($destination, $imageData) !== false) {
    echo json_encode([
        'success' => true,
        'url' => '/uploads/' . $newFileName
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save the image to the uploads folder.']);
}
?>
