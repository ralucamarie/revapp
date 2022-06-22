### Razvan Backend:  
- Added Shops get by category_name  
- Corrected previous version of api/categories/read.php that was replaced with another read  
#### Updated revapp.sql with hard coded data for users, categories, shops and addresses:  
 - Delete the revapp database from XAMPP mysql, create another database with the same name but without any tables  
and import the file from this branch

#### Backend calls for now:
- User: 
- - (METHOD : GET) http://localhost/revapp/php-backend/api/users/read.php
- - (METHOD : GET) http://localhost/revapp/php-backend/api/users/single_user.php?id=1
- - (METHOD : POST) http://localhost/revapp/php-backend/api/users/create.php
- - (METHOD : PUT) http://localhost/revapp/php-backend/api/users/update.php
- - (METHOD : DELETE) http://localhost/revapp/php-backend/api/users/delete.php?id=1

- Shop:
- - (METHOD : GET) http://localhost/revapp/php-backend/api/shops/read.php
- - (METHOD : GET) http://localhost/revapp/php-backend/api/shops/read.php?category_name=Searched Category
- - (METHOD : GET) http://localhost/revapp/php-backend/api/shops/single_shop.php?id=1
- - (METHOD : POST) http://localhost/revapp/php-backend/api/shops/create.php
- - (METHOD : PUT) http://localhost/revapp/php-backend/api/shops/update.php
- - (METHOD : DELETE) http://localhost/revapp/php-backend/api/shops/delete.php?id=1

- Review:
- - (METHOD : GET) http://localhost/revapp/php-backend/api/reviews/read.php
- - (METHOD : GET) http://localhost/revapp/php-backend/api/reviews/read.php?user_ID=1 (gettting reviews for a user)
- - (METHOD : GET) http://localhost/revapp/php-backend/api/reviews/read.php?shop_ID=5 (getting reviews for a shop)
- - (METHOD : GET) http://localhost/revapp/php-backend/api/reviews/read.php?user_ID=1&shop_ID=1 (getting reviews for a speciffic shop and user)
- - (METHOD : POST) http://localhost/revapp/php-backend/api/reviews/create.php
- - (METHOD : PUT) http://localhost/revapp/php-backend/api/reviews/update.php
- - (METHOD : DELETE) http://localhost/revapp/php-backend/api/reviews/delete.php?id=1
##### 05.30.22 
- Brought back categories api files (create, read, single_category, delete and update) from back-up version
##### 06.03.22
- Fixed no data return for the simple GET call of shops/read.php
- Added CRUD in api/addresses/ 
- - create.php
- - read.php - with filters by city and/or country
- - single_address.php - also can be called with city AND country
- - delete.php - with options to delete by id or by city and/or country
- - update.php
- Added filter by user_ID and/or shop_ID for GET call of reviews/read.php 
##### 06.05.22
- Fixed reviews/read.php filter by user_ID and/or shop_ID
- Calling reviews/read.php now also gets user_name, user_surname and shop_name

