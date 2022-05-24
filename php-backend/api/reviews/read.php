<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$items = new Review($db);

$stmt = $items->getReviews();
$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $reviewArray = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "review_date" => $review_date,
            "shop_ID" => $shop_ID,
            "user_ID" => $user_ID,
            "rating" => $rating,
            "title" => $title,
            "content" => $content
        );

        array_push($reviewArray, $e);
    }
    echo json_encode($reviewArray);
} else {
    echo json_encode("");
}
