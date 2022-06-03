<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/address.php';

$database = new Database();
$db = $database->getConnection();

$item = new Address($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : null;
$city = $_GET['city'] ?? null;
$country = $_GET['country'] ?? null;

//in cazul in care vom vrea sa stergem dupa city sau dupa country sau amndoua
if( $city != null && $country != null ){

    if( $item->deleteAddress($city, $country) )
        echo json_encode("Address for country ".$country." and city ".$city." deleted.");
    else 
        echo json_encode("Address for country ".$country." and city ".$city." not deleted.");  

}

if( $city != null && $country == null ){

    if($item->deleteAddress($city, null))
        echo json_encode("Addresses for city ".$city." deleted.");
    else 
        echo json_encode("Addresses for city ".$city." not deleted"); 
}

if( $city == null && $country != null ){

    if($item->deleteAddress(null, $country))
        echo json_encode("Addresses for country ".$country." deleted.");
    else 
        echo json_encode("Addresses for country ".$country." not deleted");   
}

if(  $city == null && $country == null ){

    if (notNull($item->id) && $item->deleteAddress()) 
        echo json_encode("Address deleted.");
    else 
        echo json_encode("Address Not deleted");
}
