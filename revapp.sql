-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2022 at 08:11 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `revapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `city`, `country`) VALUES
(1, 'Cluj-Napoca', 'Romania'),
(2, 'Milan', 'Italy'),
(3, 'Munich', 'Germany'),
(4, 'Oradea', 'Romania'),
(5, 'Rome', 'Italy'),
(6, 'Koln', 'Germany');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`,`category_name`) VALUES
	(1,"Animals & Pets"),
	(2,"Beauty & Well-being"),
	(3,"Business Services"),
	(4,"Construction & Manufacturing"),
	(5,"Education & Training"),
	(6,"Electronics & Technology"),
	(7,"Events & Entertainment"),
	(8,"Food, Beverages & Tobacco"),
	(9,"Health & Medical"),
	(10,"Hobbies & Crafts"),
	(11,"Home & Garden"),
	(12,"Home-Services"),
	(13,"Legal Services & Government"),
	(14,"Media & Publishing"),
	(15,"Money & Insurance"),
	(16,"Public & Local Services"),
	(17,"Restaurants & Bars"),
	(18,"Shopping & Fashion"),
	(19,"Sports"),
	(20,"Travel & Vacation"),
	(21,"Utilities"),
	(22,"Vehicles & Transportation");



-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `review_date` date DEFAULT NULL,
  `shop_ID` int(11) DEFAULT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------


CREATE TABLE `review_appreciation` (
  `review_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `like_status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'USER'),
(2, 'MODERATOR'),
(3, 'ADMINISTRATOR');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `shop_name` varchar(50) DEFAULT NULL,
  `category_ID` int(11) DEFAULT NULL,
  `website_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `shop` (`id`,`shop_name`, `category_ID`, `website_url`) VALUES
(1,"Happy Pet", 1, 'www.happypet.ro'),
(2,"Animal Care", 1, 'www.animalcare.it'),
(3,'Hairline', 2, 'www.hairline.de'),
(4,'FairTrade', 3, 'www.fairtrade.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `address_ID` int(11) DEFAULT NULL,
  `role_ID` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `user`
--


INSERT INTO `user` (`id`,`name`, `surname`, `address_ID`, `role_ID`, `email`, `password`) VALUES
(1,'Andrea', 'Iordache', 1, 1, 'andrea@gmail.com', 'parola'),
(2,'Razvan', 'Suhan', 1, 1, 'razvan@gmail.com', 'parola'),
(3,'Raluca', 'Ceuca', 1, 1, 'raluca@gmail.com', 'parola'),
(4,'Sergiu', 'Casuneanu', 1, 1, 'sergiu@gmail.com', 'parola'),
(5,'Simona', 'Labici', 1, 1, 'simona@gmail.com', 'parola'),
(6,'Delia', 'Cotisel', 1, 1, 'delia@gmail.com', 'parola');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `FK_address_idx` (`address_ID`),
  ADD KEY `FK_role_idx` (`role_ID`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_shop_idx` (`shop_ID`),
  ADD KEY `FK_user_idx` (`user_ID`);

--
-- Indexes for table `review_appreciation`
--
ALTER TABLE `review_appreciation`
  ADD PRIMARY KEY (`review_ID`,`user_ID`),
  ADD KEY `FK_user_like_idx` (`user_ID`),
  ADD KEY `FK_review_idx` (`review_ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_category_idx` (`category_ID`);


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_shop` FOREIGN KEY (`shop_ID`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`user_ID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review_appreciation`
--
ALTER TABLE `review_appreciation`
  ADD CONSTRAINT `FK_review` FOREIGN KEY (`review_ID`) REFERENCES `review` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_user_like` FOREIGN KEY (`user_ID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `FK_category` FOREIGN KEY (`category_ID`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_address` FOREIGN KEY (`address_ID`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_role` FOREIGN KEY (`role_ID`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
