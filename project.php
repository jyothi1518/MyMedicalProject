<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "dbh.php"; // Connect to the database

// Get the raw POST data as a string
$json_data = file_get_contents("php://input");

// Decode the JSON data into an associative array
$request_data = json_decode($json_data, true);

// Check if 'username', 'password', and 'email' keys exist in $request_data
if (isset($request_data['username']) && isset($request_data['password']) && isset($request_data['email']) && isset($request_data['confirm_password'])) {
    // Get the username, email, and password from the decoded JSON data
    $username = $request_data['username'];
    $password = $request_data['password'];
    $email = $request_data['email'];
    $confirm_password = $request_data['confirm_password'];

    if (isset($request_data['register']) && $request_data['register'] === true) {
        // Registration
        // Check if passwords match
        if(password_verify($confirm_password, $hashed_password)) {
            // Hash the password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert user into database
            $sql = "INSERT INTO first (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':password', $hashed_password, PDO::PARAM_STR);
            $stmt->execute();
            
            // Check if the insertion was successful
            if ($stmt->rowCount() > 0) {
                $response['status'] = "success";
                $response['message'] = "Registration successful!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to register user";
            }
            // Close the prepared statement
            $stmt->closeCursor();
        } else {
            $response['status'] = "error";
            $response['message'] = "Passwords do not match";
        }
    } else {
        // Handle the case where 'register' is not set to true
        $response['status'] = "error";
        $response['message'] = "Invalid registration request";
    }
} else {
    // Handle the case where 'username', 'password', or 'email' is missing
    $response['status'] = "error";
    $response['message'] = "Invalid registration data";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
