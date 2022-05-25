<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/reviewAppreciation.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new ReviewAppreciation($db);

$data = json_decode(file_get_contents("php://input"));

$item->review_ID = $data->review_ID;
$item->user_ID = $data->user_ID;
$item->like = $data->like;

if ($item->createReviewAppreciation()) {
    echo json_encode("ReviewAppreciation created.");
} else {
    echo json_encode("Failed to create ReviewAppreciation.");
}
