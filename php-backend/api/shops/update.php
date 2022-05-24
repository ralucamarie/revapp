<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$item = new Shop($db);

$data = json_decode(file_get_contents("php://input"));

$item->id = $data->id;
$item->shop_name = $data->shop_name;
$item->category_ID = $data->category_ID;
$item->website_url = $data->website_url;


if ($item->updateShop()) {
    echo json_encode("Shop updated.");
} else {
    echo json_encode("Shop could not be updated.");
}
