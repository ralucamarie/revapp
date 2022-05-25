<?php
class ReviewAppreciation{

    private $conn;
    private $dbTable = 'review_appreciation';

    public $review_ID;
    public $user_ID;
    public $like;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getReviewAppreciations(){
        $query = "SELECT * FROM " . $this->dbTable;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createReviewAppreciation(){
            $query = "INSERT INTO " . $this->dbTable . 
                    " SET 
                        review_ID = :review_ID,
                        user_ID = :user_ID,
                        like = :like";
    
            $stmt = $this->conn->prepare($query);
    
             $this->review_ID=htmlspecialchars(strip_tags($this->review_ID));
             $this->user_ID=htmlspecialchars(strip_tags($this->user_ID));
             $this->like=htmlspecialchars(strip_tags($this->like));

            $stmt->bindParams(":review_ID",$this->review_ID);
            $stmt->bindParams(":user_ID",$this->user_ID);
            $stmt->bindParams(":like",$this->like);
    
            if($stmt->execute()){
                return true;
            }
            return false;
    }

    public function getSingleReviewAppreciation(){
        $sqlQuery = "SELECT * FROM
                       ". $this->dbTable ."
                   WHERE 
                        review_ID = ?
                    AND
                        user_ID = ?
                   LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->review_ID);
        $stmt->bindParam(2, $this->user_ID);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->review_ID = $dataRow['review_ID'];
        $this->user_ID = $dataRow['user_ID'];
        $this->like = $dataRow['like'];
    }

    public function updateReviewAppreciation(){
        $query = "UPDATE " . $this->dbTable . " 
                    SET 
                        like = :like,
                    WHERE 
                        review_ID = :review_ID
                        AND
                        user_ID = :user_ID";

        $stmt = $this->conn->prepare($query);

        $this->like=htmlspecialchars(strip_tags($this->like));

        $this->review_ID=htmlspecialchars(strip_tags($this->review_ID));
        $this->user_ID=htmlspecialchars(strip_tags($this->user_ID));

        $stmt->bindParam(":like", $this->like);
        $stmt->bindParam(":review_ID", $this->review_ID);
        $stmt->bindParam(":user_ID", $this->user_ID);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function deleteReview(){
        $query = "DELETE FROM " . $this->dbTable . " 
                    WHERE 
                        review_ID = ? 
                        AND 
                        user_ID = ?";

        $stmt = $this->conn->prepare($query);

        $this->review_ID=htmlspecialchars(strip_tags($this->review_ID));
        $this->user_ID=htmlspecialchars(strip_tags($this->user_ID));

        $stmt->bindParam(1, $this->review_ID);
        $stmt->bindParam(2, $this->user_ID);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

}

?>