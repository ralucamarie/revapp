<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleUser();

if ($item != null) {
    $user_Arr = array(
        "id" =>  $item->id,
        "first_name" => $item->first_name,
        "last_name" => $item->last_name,
        "address_id" => $item->address_id,
        "role_id" => $item->role_id,
        "email_id" => $item->email_id,
        "password" => $item->password
    );

    http_response_code(200);
    echo json_encode($user_Arr);
} else {
    http_response_code(404);
    echo json_encode("User record not found.");
}
