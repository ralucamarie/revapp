<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/review.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new Review($db);

$data = json_decode(file_get_contents("php://input"));

$item->review_date = $data->review_date;
$item->shop_ID = $data->shop_ID;
$item->user_ID = $data->user_ID;
$item->rating = $data->rating;
$item->title = $data->title;
$item->content = $data->content;

if ($item->createReview()) {
    echo json_encode("Review created.");
} else {
    echo json_encode("Failed to create Review.");
}
