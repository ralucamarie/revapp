<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/user.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);

$data = json_decode(file_get_contents("php://input"));

$item->first_name = $data->first_name;
$item->last_name = $data->last_name;
$item->address_id = $data->address_id;
$item->role_id = $data->role_id;
$item->email_id = $data->email_id;
$item->password = $data->password;


if ($item->createUser()) {
    echo json_encode("User created.");
} else {
    echo json_encode("Failed to create user.");
}
