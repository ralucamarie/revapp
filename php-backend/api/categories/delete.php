<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/category.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new Category($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

if ($item->deleteCategory()) {
    echo json_encode("Category deleted.");
} else {
    echo json_encode("Category Not deleted");
}
