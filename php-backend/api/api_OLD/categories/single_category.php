<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/category.php';

$database = new Database();
$db = $database->getConnection();

$item = new Category($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleCategory();

if ($item != null) {
    $category_Array = array(
        "id" =>  $item->id,
        "category_name" => $item->category_name,
    );

    http_response_code(200);
    echo json_encode($category_Array);
} else {
    http_response_code(404);
    echo json_encode("Category not found.");
}
