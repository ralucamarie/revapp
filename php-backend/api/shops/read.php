<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$items = new Shop($db);

$stmt = $items->getShops();
$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $shopArray = array();


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "shop_name" => $first_name,
            "category_ID" => $category_ID,
            "website_url" => $website_url
        );

        array_push($shopArray, $e);
    }
    echo json_encode($shopArray);
} else {
    echo json_encode("");
}
