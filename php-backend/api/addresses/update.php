<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/address.php';;

$database = new Database();
$db = $database->getConnection();

$item = new Address($db);

$data = json_decode(file_get_contents("php://input"));

$item->id = $data->id;
$item->city = $data->city;
$item->country = $data->country;

if ($item->updateAddress()) {
    echo json_encode("Address updated.");
} else {
    echo json_encode("Address could not be updated.");
}
