<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require "dbh.php"; // Connect to the database

// Get the raw POST data as a string
$json_data = file_get_contents("php://input");

// Decode the JSON data into an associative array
$request_data = json_decode($json_data, true); 

// Check if 'username' and 'password' keys exist in $request_data and if they are not empty
if (isset($request_data['username']) && !empty($request_data['username']) && isset($request_data['password']) && !empty($request_data['password'])) {
    // Get the username and password from the decoded JSON data
    $username = $request_data['username'];
    $password = $request_data['password'];

    // Query to check login credentials using prepared statements
    $sql = "SELECT * FROM login1 WHERE username = :username AND password = :password";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if login credentials are valid
    if ($result) {
        $response['status'] = "success";
        $response['message'] = "Login successful!";
    } else {
        $response['status'] = "error";
        $response['message'] = "Invalid username or password";
    }

    // Close the prepared statement
    $stmt->closeCursor();
} else {
    // Handle the case where 'username' or 'password' is missing
    $response['status'] = "error";
    $response['message'] = "Please provide both username and password";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
