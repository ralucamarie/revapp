### Razvan Backend:  
- Added Shops get by category_name  
- Corrected previous version of api/categories/read.php that was replaced with another read  
##### Updated revapp.sql with hard coded data for users, categories, shops and addresses:  
 - Delete the revapp database from XAMPP mysql, create another database with the same name but without any tables  
and import the file from this branch

##### 05.30.22 
- Brought back categories api files (careate, read, single_category, delete and update) from back-up version
##### 06.03.22
- Fixed no data return for the simple GET call of shops/read.php
- Added CRUD in api/addresses/ 
- - create.php
- - read.php - with filters by city and/or country
- - single_address.php - also can be called with city AND country
- - delete.php - with options to delete by id or by city and/or country
- - update.php
- Added filter by user_ID and/or shop_ID for GET call of reviews/read.php 