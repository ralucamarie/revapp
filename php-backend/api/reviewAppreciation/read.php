<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/reviewAppreciation.php';

$database = new Database();
$db = $database->getConnection();

$items = new ReviewAppreciation($db);

$stmt = $items->getReviewAppreciations();
$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $reviewAppreciationArray = array();


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "review_ID" => $review_ID,
            "user_ID" => $user_ID,
            "like" => $like
        );

        array_push($reviewAppreciationArray, $e);
    }
    echo json_encode($reviewAppreciationArray);
} else {
    echo json_encode("");
}
