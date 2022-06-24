<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/shop.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new Shop($db);
$data = json_decode(file_get_contents("php://input"));

$item->shop_name = $data->shop_name;
$item->website_url = $data->website_url;
$item->category_ID = $data->category_ID;
// $category->category_name = $data->category_name;
// $category->getCategoryIDbyCategoryName($category->category_name);
// var_dump($category);
// $item->category_ID = $category->id;




//find the shop id by name and assign

if ($item->createShop()) {
    echo json_encode("Shop created.");
} else {
    echo json_encode("Failed to create Shop.");
}
