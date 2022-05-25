<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/reviewAppreciation.php';

$database = new Database();
$db = $database->getConnection();

$item = new ReviewAppreciation($db);

$item->review_ID = isset($_GET['review_ID']) ? $_GET['review_ID'] : die();
$item->user_ID = isset($_GET['user_ID']) ? $_GET['user_ID'] : die();

$item->getSingleReviewAppreciation();

if ($item != null) {
    $reviewAppreciation_Array = array(
        "review_ID" =>  $item->review_ID,
        "user_ID" => $item->user_ID,
        "like" => $item->like
    );

    http_response_code(200);
    echo json_encode($reviewAppreciation_Array);
} else {
    http_response_code(404);
    echo json_encode("ReviewAppreciation not found.");
}
