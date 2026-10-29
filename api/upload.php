<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for local testing

// The directory where images will be saved
$uploadDir = '../uploads/';

// Create the directory if it doesn't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {

        $file = $_FILES['image'];

        // Basic validation
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            echo json_encode(['success' => false, 'error' => 'Only JPG, PNG, WEBP, and GIF files are allowed.']);
            exit;
        }

        // Generate a unique filename to prevent overwriting
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newFileName = uniqid('img_') . '.' . $fileExtension;

        $destination = $uploadDir . $newFileName;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            // Return the public URL path relative to the root domain
            echo json_encode([
                'success' => true,
                'url' => '/uploads/' . $newFileName
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to move the uploaded file.']);
        }
    } else {
        $errorMsg = isset($_FILES['image']['error']) ? 'Upload error code: ' . $_FILES['image']['error'] : 'No file sent.';
        echo json_encode(['success' => false, 'error' => $errorMsg]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method. Please use POST.']);
}
?>
