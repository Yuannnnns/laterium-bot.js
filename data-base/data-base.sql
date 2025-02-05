-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2025 at 02:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
-- USE laterium;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laterium`
--

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `test` int(11) NOT NULL,
  `test2` varchar(11) NOT NULL,
  `test3` text NOT NULL,
  `test4` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='test';
COMMIT;

--
-- Table structure for table `user_roles`
--

CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    role_id VARCHAR(255) NOT NULL,
    UNIQUE(user_id, role_id)
);

--
-- Table structure for table `blocked_channels`
--

CREATE TABLE blocked_channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guild_id VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_channel (guild_id, channel_id)
);

/****
/// @lifestar (lrp) basic sql

--
-- Table structure for table `playerucp`
--

CREATE TABLE `playerucp` ( -- basic playerucp
  `id` int(11) NOT NULL, -- example user-id
  `ucp` varchar(11) NOT NULL, -- example user-ucp
  `verifycode` varchar(11) NOT NULL, -- example verifycode
  `DiscordID` BIGINT NOT NULL -- example Discord ID
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='playerucp';
COMMIT;

--
-- Table structure for table `players`
--

CREATE TABLE `players` ( -- basic players
  `reg_id` int(11) NOT NULL, -- example reg-id
  `username` varchar(11) NOT NULL -- example user-name
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='players';
COMMIT;

****/

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
