<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/shop.php';

$database = new Database();
$db = $database->getConnection();

$items = new Shop($db);

$category_name = $_GET['category_name'] ?? null;

if($category_name != null) {
    $stmt = $items->getShops($category_name);
}
else {
    $stmt = $items->getShops();
}

$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $shopArray = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        if (!isset($_GET['category_name'])) {
            $e = array(
                "id" => $id,
                "shop_name" => $shop_name,
                "category_ID" => $category_ID,
                "website_url" => $website_url
            );
        }
        else {
            $e = array(
                "id" => $id,
                "shop_name" => $shop_name,
                "category_ID" => $category_ID,
                "website_url" => $website_url,
                "category_name" => $category_name
            );
        }
        array_push($shopArray, $e);
    }
    echo json_encode($shopArray);
} else {
    echo json_encode("");
}
