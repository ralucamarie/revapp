<?php

class Review
{
    private $conn;
    private $dbTable = 'review';

    public $id;
    public $review_date;
    public $shop_ID;
    public $user_ID;
    public $rating;
    public $title;
    public $content;


    public function __construct($db){
        $this->conn = $db;
    }

    //ar trebui sa se foloseasca long dar php nu are long sau bigint
    //dar pentru noi e ok si int simplu
    public function getReviews(?bool $names = null, ?int $user_ID = null, ?int $shop_ID = null){
        // with * select all columns
        $querySelect = "SELECT r.id, 
                    r.review_date, 
                    r.shop_ID, 
                    r.user_ID, 
                    r.rating, 
                    r.title,
                    r.content ";
        $queryFrom = "FROM " . $this->dbTable . " r";
        $query = $querySelect . $queryFrom;
        if ($names){
            $querySelect = $querySelect . ", u.name AS user_name, u.surname AS user_surname, s.shop_name AS shop_name ";
            $queryFrom = $queryFrom .
                " LEFT JOIN user u ON u.id = r.user_ID  
                LEFT JOIN shop s ON s.id = r.shop_ID";
            $query = $querySelect . $queryFrom;
        }
        $stmt = $this->conn->prepare($query);

        if($shop_ID != null && $user_ID == null){
            $query = $query . " WHERE r.shop_ID = ?";

            $stmt = $this->conn->prepare($query);
            $this->shop_ID=htmlspecialchars(strip_tags($shop_ID));
            $stmt->bindParam(1, $this->shop_ID);
        }
        if($shop_ID == null && $user_ID != null){
            $query = $query . " WHERE r.user_ID = ?";

            $stmt = $this->conn->prepare($query);
            $this->user_ID=htmlspecialchars(strip_tags($user_ID));
            $stmt->bindParam(1, $this->user_ID);
        }
        if($shop_ID != null && $user_ID != null){
            $query = $query  .
                " WHERE r.user_ID = ? AND r.shop_ID = ?";

            $stmt = $this->conn->prepare($query);
            $this->user_ID=htmlspecialchars(strip_tags($user_ID));
            $this->shop_ID=htmlspecialchars(strip_tags($shop_ID));
            $stmt->bindParam(1, $this->user_ID);
            $stmt->bindParam(2, $this->shop_ID);
        }
        $stmt->execute();
        return $stmt;
    }

    public function createReview(){
        // ar putea exista ceva probleme din cauza faptului ca am folosit numele coloanei date si atat
        // am schimbat cu review_date si in MySQL si aici
        $query = "INSERT INTO " . $this->dbTable . " 
                    SET 
                        review_date = :review_date,
                        shop_ID = :shop_ID,
                        user_ID = :user_ID,
                        rating = :rating,
                        title = :title,
                        content = :content";

        $stmt = $this->conn->prepare($query);

        $this->review_date=htmlspecialchars(strip_tags($this->review_date));
        $this->shop_ID=htmlspecialchars(strip_tags($this->shop_ID));
        $this->user_ID=htmlspecialchars(strip_tags($this->user_ID));
        $this->rating=htmlspecialchars(strip_tags($this->rating));
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->content=htmlspecialchars(strip_tags($this->content));

        $stmt->bindParam(":review_date", $this->review_date);
        $stmt->bindParam(":shop_ID", $this->shop_ID);
        $stmt->bindParam(":user_ID", $this->user_ID);
        $stmt->bindParam(":rating", $this->rating);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content",$this->content);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function getSingleReview(){
        $sqlQuery = "SELECT * FROM
                       ". $this->dbTable ."
                   WHERE 
                      id = ?
                   LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->review_date = $dataRow['review_date'];
        $this->shop_ID = $dataRow['shop_ID'];
        $this->user_ID = $dataRow['user_ID'];
        $this->rating = $dataRow['rating'];
        $this->title = $dataRow['title'];
        $this->content = $dataRow['content'];
    }

    public function updateReview(){
        // ar putea exista ceva probleme din cauza faptului ca am folosit numele coloanei date si atat
        // am schimbat cu review_date si in MySQL si aici
        $query = "UPDATE " . $this->dbTable . " 
                    SET 
                        review_date = :review_date,
                        shop_ID = :shop_ID,
                        user_ID = :user_ID,
                        rating = :rating,
                        title = :title,
                        content = :content
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($query);

        $this->review_date=htmlspecialchars(strip_tags($this->review_date));
        $this->shop_ID=htmlspecialchars(strip_tags($this->shop_ID));
        $this->user_ID=htmlspecialchars(strip_tags($this->user_ID));
        $this->rating=htmlspecialchars(strip_tags($this->rating));
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->content=htmlspecialchars(strip_tags($this->content));
        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":review_date", $this->review_date);
        $stmt->bindParam(":shop_ID", $this->shop_ID);
        $stmt->bindParam(":user_ID", $this->user_ID);
        $stmt->bindParam(":rating", $this->rating);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content",$this->content);
        $stmt->bindParam(":id",$this->id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function deleteReview(){
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
