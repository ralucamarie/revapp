<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,
        Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/reviewAppreciation.php';

$database = new Database();
$db = $database->getConnection();

$item = new ReviewAppreciation($db);

$item->review_ID = isset($_GET['review_ID']) ? $_GET['review_ID'] : die();
$item->user_ID = isset($_GET['user_ID']) ? $_GET['user_ID'] : die();

if ($item->deleteReviewAppreciation()) {
    echo json_encode("ReviewAppreciation deleted.");
} else {
    echo json_encode("ReviewAppreciation Not deleted");
}
