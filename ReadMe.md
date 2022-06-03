### Razvan Backend:  
-Added Shops get by category_name  
-Corrected previous version of api/categories/read.php that was replaced with another read  
##### Updated revapp.sql with hard coded data for users, categories, shops and addresses:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete the revapp database from XAMPP mysql, create another database with the same name but without any tables  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and import the file from this branch

##### 05.30.22 
-brought back categories api files (careate, read, single_category, delete and update) from back-up version
##### 06.03.22
-fixed no data return for the simple GET call of shops/read.php
-added CRUD in api/addresses (create.php,read.php{with filters by city and/or country},single_address.php, delete.php{with options to delete by id or by city and/or country})
-added filter by user_ID and/or shop_ID for GET call of reviews/read.php 