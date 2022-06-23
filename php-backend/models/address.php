<?php
class Address
{
    private $conn;

    // table
    private $dbTable = "address";

    // col
    public $id;
    public $city;
    public $country;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAddresses(?string $city = null, ?string $country = null) {
        if ($country == null && $city == null){
            $sqlQuery = "SELECT * FROM " . $this->dbTable;
            $stmt = $this->conn->prepare($sqlQuery);
        }
        if($country != null && $city == null){
            $sqlQuery = "SELECT * FROM " . $this->dbTable . 
            " WHERE country = ?";

            $stmt = $this->conn->prepare($sqlQuery);
            $this->country = htmlspecialchars(strip_tags($country));
            $stmt->bindParam(1, $this->country);
        }
        if($country == null && $city != null){
            $sqlQuery = "SELECT * FROM " . $this->dbTable .
                " WHERE city = ?";

            $stmt = $this->conn->prepare($sqlQuery);
            $this->city = htmlspecialchars(strip_tags($city));
            $stmt->bindParam(1, $this->city);
        }
        $stmt->execute();
        return $stmt;
    }

    public function getAddressIdByCityAndCountry() {
        $sqlQuery = "SELECT
                    id, 
                    city, 
                    country 
                  FROM
                    " . $this->dbTable . "
                WHERE 
                   city = :city and country = :country LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);
        // $stmt->bind_param('sssd', $code, $language, $official, $percent);
        $stmt->bindParam(":city", $this->city, PDO::PARAM_STR);
        $stmt->bindParam(":country", $this->country, PDO::PARAM_STR);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $dataRow['id'];
    }

    // CREATE Address
    public function createAddress()
    {
        $sqlQuery = "INSERT INTO
                        " . $this->dbTable . "
                    SET
                    city = :city, 
                    country = :country";

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->country = htmlspecialchars(strip_tags($this->country));

        // bind data
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":country", $this->country);


        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // GET Address
    public function getSingleAddress(?string $city = null, ?string $country = null)
    {   
        if ($city != null && $country != null){
            $sqlQuery = "SELECT
                        id, 
                        city, 
                        country 
                        FROM
                            " . $this->dbTable . "
                        WHERE 
                            city = ? and country = ?
                            LIMIT 0,1";

            $stmt = $this->conn->prepare($sqlQuery);

            $this->city = htmlspecialchars(striptags($city));
            $this->country = htmlspecialchars(striptags($country));

            $stmt->bindParam(1, $this->city, PDO::PARAM_STR);
            $stmt->bindParam(2, $this->country, PDO::PARAM_STR);
        }
        if ($city == null && $country == null){
            $sqlQuery = "SELECT
                        id, 
                        city, 
                        country 
                    FROM
                        " . $this->dbTable . "
                    WHERE 
                    id = ?
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($sqlQuery);

            $stmt->bindParam(1, $this->id);
        }
        
        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $dataRow['id'];
        $this->city = $dataRow['city'];
        $this->country = $dataRow['country'];
    }


    //UPDATE Adress
    public function updateAddress()
    {
        $sqlQuery = "UPDATE
                        " . $this->dbTable . "
                    SET
                    city = :city, 
                    country = :country
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->name = htmlspecialchars(strip_tags($this->city));
        $this->surname = htmlspecialchars(strip_tags($this->country));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind data
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //DELETE Address
    function deleteAddress(?string $city = null, ?string $country = null)
    {
        if($city == null && $country == null){ 
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
    
            $this->id = htmlspecialchars(strip_tags($this->id));
    
            $stmt->bindParam(1, $this->id);
        }
        if($city != null && $country == null){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE city = ?";
            $stmt = $this->conn->prepare($sqlQuery);
    
            $this->city = htmlspecialchars(strip_tags($city));
            $stmt->bindParam(1, $this->city);
        }
        if($city == null && $country != null){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE country = ?";
            $stmt = $this->conn->prepare($sqlQuery);
    
            $this->country = htmlspecialchars(strip_tags($country));
            $stmt->bindParam(1, $this->country);
        }
        if($city != null && $country != null){
            $sqlQuery = "DELETE FROM " . $this->dbTable . 
                        " WHERE city = ? AND country = ?";
            $stmt = $this->conn->prepare($sqlQuery);
    
            $this->city = htmlspecialchars(strip_tags($city));
            $this->country = htmlspecialchars(strip_tags($country));
            $stmt->bindParam(1, $this->city);
            $stmt->bindParam(2, $this->country);
        }

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
