<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

// Database connection parameters
$servername = "localhost";
$username = "root"; // Replace 'your_username' with your MySQL username
$dbname = "profil"; // Replace 'profil' with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the raw POST data
    $rawData = file_get_contents('php://input');

    // Attempt to decode the JSON data
    $data = json_decode($rawData, true);

    // Check if JSON decoding was successful
    if ($data === null) {
        echo json_encode(['success' => false, 'message' => 'Failed to decode JSON data']);
        exit;
    }

    // Extract data from the decoded JSON object
    $name = $data['name'];
    $age = $data['age'];
    $phone = $data['phone'];
    $email = $data['email'];
    $dob = $data['dob'];

    // Prepare and bind SQL statement using prepared statement
    $stmt = $conn->prepare("INSERT INTO profile (name, age, phone, email, dob) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $name, $age, $phone, $email, $dob);

    // Execute the SQL statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to insert data: ' . $conn->error]);
    }

    // Close statement
    $stmt->close();
}
else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

// Close connection
$conn->close();
?>
