<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/category.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new Category($db);

$data = json_decode(file_get_contents("php://input"));

$item->category_name = $data->category_name;

if ($item->createCategory()) {
    echo json_encode("Category created.");
} else {
    echo json_encode("Failed to create Category.");
}
