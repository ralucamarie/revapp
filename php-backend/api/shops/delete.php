<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/shop.php';

$database = new Database();
$db = $database->getConnection();

//TODO: When deleting a shop delete all Reviews and ReviewAppreciations

$item = new Shop($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

if ($item->deleteShop()) {
    echo json_encode("Shop deleted.");
} else {
    echo json_encode("Shop Not deleted");
}
