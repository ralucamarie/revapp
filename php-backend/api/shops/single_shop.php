<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$item = new Shop($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleShop();

if ($item != null) {
    $shop_Array = array(
        "id" =>  $item->id,
        "shop_name" => $item->shop_name,
        "category_ID" => $item->category_ID,
        "website_url" => $item->website_url
    );

    http_response_code(200);
    echo json_encode($shop_Array);
} else {
    http_response_code(404);
    echo json_encode("User record not found.");
}
