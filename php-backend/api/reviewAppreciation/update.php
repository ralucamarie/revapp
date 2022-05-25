<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/reviewAppreciation.php';;

$database = new Database();
$db = $database->getConnection();

$item = new ReviewAppreciation($db);

$data = json_decode(file_get_contents("php://input"));

$item->review_ID = $data->review_ID;
$item->user_ID = $data->user_ID;
$item->like_status = $data->like_status;

if ($item->updateReviewAppreciation()) {
    echo json_encode("ReviewAppreciation updated.");
} else {
    echo json_encode("ReviewAppreciation could not be updated.");
}
