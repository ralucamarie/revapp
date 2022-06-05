<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");


include_once '../../config/database.php';
include_once '../../models/address.php';

$database = new Database();
$db = $database->getConnection();

$items = new Address($db);
$country = $_GET['country'] ?? null;
$city = $_GET['city'] ?? null;

if($city == null && $country != null)
    $stmt = $items->getAddresses(null, $country);
if($city != null && $country == null)
    $stmt = $items->getAddresses($city);
else
    $stmt = $items->getAddresses();

$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $addressArray = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "city" => $city,
            "country" => $country
        );

        array_push($addressArray, $e);
    }
    echo json_encode($addressArray);
} else {
    echo json_encode("");
}
