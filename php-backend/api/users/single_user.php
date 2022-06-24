<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/user.php';
include_once '../../models/address.php';
include_once '../../models/role.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleUser();


if ($item != null) {
    $address = new Address($db);
    $address->id = $item->address_ID;
    $address->getSingleAddress();
    $role = new Role($db);
    $role->id = $item->role_ID;
    $role->getSingleRole();
    $user_Arr = array(
        "id" =>  $item->id,
        "name" => $item->name,
        "surname" => $item->surname,
        "email" => $item->email,
        "role_ID" => $item->role_ID,
        "role_name" => $role->role_name,
        "address_ID" => $item->address_ID,
        "city" => $address->city,
        "country" => $address->country
    );

    http_response_code(200);
    echo json_encode($user_Arr);
} else {
    http_response_code(404);
    echo json_encode("User record not found.");
}
