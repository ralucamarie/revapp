<?php
class Category{

    private $conn;
    private $dbTable = 'categories';

    public $id;
    public $category_name;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getCategories(){
        // with * select all columns
        $query = "SELECT * from " . $this->dbTable;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createCategory(){
        $query = "INSERT INTO " . $this->dbTable . " SET category_name = :category_name";

        $stmt = $this->conn->prepare($query);

        $this->category_name=htmlspecialchars(strip_tags($this->category_name));
        $stmt->bindParams(":category_name",$this->category_name);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function getSingleCategory(){
        $query = "SELECT * FROM ". $this->dbTable ." 
                WHERE 
                id = ?
                LIMIT 0,1";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->category_name = $dataRow['category_name'];

    }
    
    public function updateCategory(){
        $query = "UPDATE " . $this->dbTable . " 
        SET 
            category_name = :category_name 
        WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->category_name=htmlspecialchars(strip_tags($this->category_name));

        $stmt->bindParam(":category_name",$this->category_name);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function deleteCategory(){
        $query = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
}

?>