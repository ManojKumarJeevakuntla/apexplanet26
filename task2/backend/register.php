<?php
include 'db_connect.php';

// ✅ Safely read POST values
$fullName = $_POST['FullName'] ?? '';   // no spaces in keys
$email    = $_POST['Email'] ?? '';
$password = $_POST['Password'] ?? '';

if (empty($fullName) || empty($email) || empty($password)) {
    echo "All fields are required!";
    exit;
}

// ✅ Use placeholders, not direct values
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo "Error preparing statement: " . $conn->error;
    exit;
}

// ✅ Bind variables correctly
$stmt->bind_param("sss", $fullName, $email, $password);

if ($stmt->execute()) {
    echo "Registration Successful!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
