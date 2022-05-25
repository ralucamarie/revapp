<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/category.php';

$database = new Database();
$db = $database->getConnection();

$item = new Category($db);

$data = json_decode(file_get_contents("php://input"));

$item->id = $data->id;
$item->category_name = $data->category_name;

if ($item->updateCategory()) {
    echo json_encode("Category updated.");
} else {
    echo json_encode("Category could not be updated.");
}
