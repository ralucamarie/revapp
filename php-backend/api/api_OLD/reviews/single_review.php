<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/review.php';

$database = new Database();
$db = $database->getConnection();

$item = new Review($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleReview();

if ($item != null) {
    $reviewArray = array(
        "id" =>  $item->id,
        "review_date" => $item->review_date,
        "shop_ID" => $item->shop_ID,
        "user_ID" => $item->user_ID,
        "rating" => $item->rating,
        "title" => $item->title,
        "content" => $item->content
    );

    http_response_code(200);
    echo json_encode($reviewArray);
} else {
    http_response_code(404);
    echo json_encode("Review not found.");
}
