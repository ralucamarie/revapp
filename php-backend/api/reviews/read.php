<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/review.php';

$database = new Database();
$db = $database->getConnection();

$items = new Review($db);
$user_ID = $_GET['user_ID'] ?? null;
$shop_ID = $_GET['shop_ID'] ?? null;
$names = true;

if($user_ID != null && $shop_ID == null)
    $stmt = $items->getReviews($names, $user_ID, null);

if($user_ID == null && $shop_ID != null)
    $stmt = $items->getReviews($names, null ,$shop_ID);

if($user_ID != null && $shop_ID != null)
    $stmt = $items->getReviews($names, $user_ID, $shop_ID);
if ($user_ID == null && $shop_ID == null)
    $stmt = $items->getReviews($names);

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
            "user_name" => $user_name,
            "user_surname" => $user_surname,
            "shop_name" => $shop_name,
            "rating" => $rating,
            "title" => $title,
            "content" => $content
        );

        array_push($reviewArray, $e);
    }
    echo json_encode($reviewArray);
} else {
    echo json_encode("No Review found or something went wrong");
}
