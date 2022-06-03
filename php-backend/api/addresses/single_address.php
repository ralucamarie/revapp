<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Content-Type: application/json;");

include_once '../../config/database.php';
include_once '../../models/address.php';

$database = new Database();
$db = $database->getConnection();

$item = new Address($db);

$item->id = $_GET['id'] ?? null;
$city = $_GET['city'] ?? null;
$country = $_GET['country'] ?? null;

if ($item->id !=null){
    $item->getSingleAddress();
}
else if ($city != null && $country != null){
    $item->getSingleAddress($city,$country);
}

if ($item != null) {
    $addressArray = array(
        // "id" =>  $item->id,
        "city" => $item->city,
        "country" => $item->country
    );

    http_response_code(200);
    echo json_encode($addressArray);
} else {
    http_response_code(404);
    echo json_encode("Address not found.");
}
