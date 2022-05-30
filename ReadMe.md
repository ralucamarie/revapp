Razvan Backend:  
-Added Shops get by category_name  
-Corrected previous version of api/categories/read.php that was replaced with another read  
-Updated revapp.sql with hard coded data for users, categories, shops and addresses:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete the revapp database from XAMPP mysql, create another database with the same name but without any tables  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and import the file from this branch  

-05.30.22 Brought back categories api files (careate, read, single_category, delete and update) from back-up version