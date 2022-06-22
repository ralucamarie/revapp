<?php

class Shop
{
    private $conn;
    private $dbTable = "shop";

    public $id;
    public $shop_name;
    public $category_ID;
    public $website_url;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getShops(?string $category_name = null){
        // with * select all columns
        if ($category_name == null) {
            $query = "SELECT * FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        else {
            $query = "SELECT s.id, s.shop_name, s.category_ID, s.website_url, c.category_name
                        FROM " . $this->dbTable . " s" ." 
                        LEFT JOIN category c ON c.id = s.category_ID 
                        WHERE c.category_name = :category_name";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":category_name", $category_name);
            $stmt->execute();
            return $stmt;
        }
    }

    public function createShop()
    {
        $query = "INSERT INTO " . $this->dbTable . " 
                SET 
                   shop_name = :shop_name,
                   category_ID = :category_ID,
                   website_url = :website_url";

        $stmt = $this->conn->prepare($query);

        $this->shop_name = htmlspecialchars(strip_tags($this->shop_name));
        $this->category_ID = htmlspecialchars(strip_tags($this->category_ID));
        $this->website_url = strip_tags($this->website_url);

        $stmt->bindParam(":shop_name", $this->shop_name);
        $stmt->bindParam(":category_ID", $this->category_ID);
        $stmt->bindParam(":website_url", $this->website_url);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getSingleShop()
    {
        $sqlQuery = "SELECT * FROM
                       " . $this->dbTable . "
                   WHERE 
                      id = ?
                   LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->shop_name = $dataRow['shop_name'];
        $this->category_ID = $dataRow['category_ID'];
        $this->website_url = $dataRow['website_url'];
    }

    public function updateShop()
    {
        $query = "UPDATE " . $this->dbTable . " 
                    SET 
                        shop_name = :shop_name,
                        category_ID = :category_ID,
                        website_url = :website_url 
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($query);

        $this->shop_name = htmlspecialchars(strip_tags($this->shop_name));
        $this->category_ID = htmlspecialchars(strip_tags($this->category_ID));
        $this->website_url = strip_tags($this->website_url);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":shop_name", $this->shop_name);
        $stmt->bindParam(":category_ID", $this->category_ID);
        $stmt->bindParam(":website_url", $this->website_url);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteShop()
    {
        $query = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
