<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/user.php';
include_once '../../models/role.php';
include_once '../../models/address.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();


$user = new User($db);
$userAddress = new Address($db);
$userRole = new Role($db);

$data = json_decode(file_get_contents("php://input"));

//get user details from the received data
$user->name = $data->name;
$user->surname = $data->surname;
$user->email = $data->email;
$user->password = $data->password;

//get address details from the received data
$userAddress->city = $data->city;
$userAddress->country = $data->country;
var_dump($userAddress);

//get user role name from received data
$userRole->role_name = $data->role;
var_dump($userRole);

//get address id if exists
$userAddress->getAddressIdByCityAndCountry();
if ($userAddress->id) {
    $user->address_ID = $userAddress->id;
    echo ("User Address found:" . $userAddress->id . " " . $userAddress->city);
    echo ($user->address_ID);
} else {
    echo ('No address found');
}
$userRole->getRoleIdByRoleName();
if ($userRole->id) {
    $user->role_ID = $userRole->id;
    echo ("User Role found:" . $userRole->id);
    echo ($user->role_ID);
} else {
    echo ('No role found');
}

if ($user->createUser()) {
    echo json_encode("User created.");
} else {
    echo json_encode("Failed to create user.");
}