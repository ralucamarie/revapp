<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/review.php';
include_once '../../models/reviewAppreciation.php';

$database = new Database();
$db = $database->getConnection();

//TODO: Delete all ReviewAppreciations when deleting a Review


$item = new Review($db);
$item->id = isset($_GET['id']) ? $_GET['id'] : die();

//facem un ReviewAppreciation cu acelasi id
$reviewAppr = new ReviewAppreciation($db);
$reviewAppr->review_ID = $item->id;

if($reviewAppr->deleteByReviewID()){
    echo json_encode("ReviewAppreciantions with review_ID " .$item->id. " deleted.");
}
else {
    echo json_encode("Cloud not delete ReviewAppreciations with review_ID " .$item->id);
}

if ($item->deleteReview()) {
echo json_encode("Review deleted.");
} else {
    echo json_encode("Not deleted");
}
