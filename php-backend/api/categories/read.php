<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../models/category.php';
include_once '../../config/database.php';


$database = new Database();
$db = $database->getConnection();

$item = new Category($db);

$stmt = $item->getCategories();
$itemCount = $stmt->rowCount();


if ($itemCount > 0) {

    $categoryArray = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $item->id,
            "category_name" => $item->category_name
        );
        array_push($categoryArray, $e);
    }

    echo json_encode($categoryArray);
    
} 
else {
    echo json_encode("");
}
