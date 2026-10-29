<?php
header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || empty($data['file'])) {
    echo json_encode(['success' => false, 'error' => 'No file specified.']);
    exit;
}

$fileUrl = $data['file'];
// Extract filename from URL (e.g., /uploads/img_12345.jpg -> img_12345.jpg)
$filename = basename($fileUrl);

// Ensure it's inside the uploads directory and no directory traversal
if (preg_match('/^[a-zA-Z0-9_\-\.]+$/', $filename)) {
    $filePath = __DIR__ . '/../uploads/' . $filename;

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to delete file.']);
        }
    } else {
        // If file doesn't exist on server, still return success to clean up DB
        echo json_encode(['success' => true]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid filename.']);
}
?>
