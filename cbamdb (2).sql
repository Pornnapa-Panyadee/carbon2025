-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 07:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbamdb`
--
CREATE DATABASE IF NOT EXISTS cbamdb;
USE cbamdb;

-- --------------------------------------------------------

--
-- Table structure for table `ad_units`
--

CREATE TABLE `ad_units` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ad_units`
--

INSERT INTO `ad_units` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 't', '2025-06-19 11:10:35', '2025-06-19 11:10:35'),
(2, '1000Nm3', '2025-06-19 11:10:35', '2025-06-19 11:10:35');

-- --------------------------------------------------------

--
-- Table structure for table `authorised_representatives`
--

CREATE TABLE `authorised_representatives` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `authorised_representatives`
--

INSERT INTO `authorised_representatives` (`id`, `name`, `email`, `phone`, `fax`, `created_at`, `updated_at`) VALUES
(1, 'ทดสอบ ระบบ', 'test@gmail.com', '08712345678', '053855741', NULL, NULL),
(2, 'ตรวจสอบ ระบบ', 'test01@gmail.com', '08712345678', '053855741', NULL, NULL),
(3, 'พรนภา ปัญญาดี', 'pornnapa200@gmail.com', '0830057417', '053888888', NULL, NULL),
(4, 'sdf', 'pornnapa200@gmail.com', '0830057417', '12345678', NULL, NULL),
(5, 'Pornnapa Panyadee', 'pornnapa200@gmail.com', '0830057417', '12345678', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `b_emission_installations`
--

CREATE TABLE `b_emission_installations` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `source_stream_name` varchar(255) DEFAULT NULL,
  `activity_data` float DEFAULT NULL,
  `AD_Unit` varchar(50) DEFAULT NULL,
  `net_calorific_value` float DEFAULT NULL,
  `ef` float DEFAULT NULL,
  `ef_unit` varchar(50) DEFAULT NULL,
  `oxidation_factor_percentage` float DEFAULT NULL,
  `biomass_content_percentage` float DEFAULT NULL,
  `NCV_unit` varchar(255) DEFAULT NULL,
  `CO2e_fossil` float DEFAULT NULL,
  `CO2e_bio` float DEFAULT NULL,
  `energy_content_fossil` float DEFAULT NULL,
  `energy_content_bio` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `b_emission_installations`
--

INSERT INTO `b_emission_installations` (`id`, `report_id`, `method`, `source_stream_name`, `activity_data`, `AD_Unit`, `net_calorific_value`, `ef`, `ef_unit`, `oxidation_factor_percentage`, `biomass_content_percentage`, `NCV_unit`, `CO2e_fossil`, `CO2e_bio`, `energy_content_fossil`, `energy_content_bio`, `created_at`, `updated_at`) VALUES
(1, 1, 'Combustion\r\n', 'Heavy fuel oil', 252000, 't', 45, 73, 'tCO2/TJ', 100, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Process Emissions', 'Raw meal for clinker', 121000, 't', NULL, 0.09, 'tCO2/t', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Process Emissions', 'Raw meal for clinker', 121000, 't', NULL, 0.09, 'tCO2/t', NULL, NULL, NULL, NULL, NULL, 22, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_codes`
--

CREATE TABLE `cn_codes` (
  `cn_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cn_code` varchar(50) DEFAULT NULL,
  `goods_category_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cn_codes`
--

INSERT INTO `cn_codes` (`cn_id`, `name`, `cn_code`, `goods_category_id`, `created_at`, `updated_at`) VALUES
(1, 'White portland cement, whether or not artificially coloured', '2523 21 00', 1, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(2, 'Portland cement (excl. white, whether or not artificially coloured)', '2523 29 00', 1, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(3, 'Cement, whether or not coloured (excl. portland cement and aluminous cement)', '2523 90 00', 1, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(4, 'Cement clinkers', '2523 10 00', 2, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(5, 'Kaolinic clays (other than kaolin)', '2507 00 80', 3, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(6, 'Aluminous cement', '2523 30 00', 4, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(7, 'Powder and flakes, of aluminium (excl. pellets of aluminium, and spangles)', '7603', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(8, 'Powders of aluminium, of non-lamellar structure (excl. pellets of aluminium)', '7603 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(9, 'Powders of aluminium, of lamellar structure, and flakes of aluminium (excl. pellets of aluminium, and spangles)', '7603 20 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(10, 'Bars, rods and profiles, of aluminium, n.e.s.', '7604', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(11, 'Bars, rods and profiles, of non-alloy aluminium, n.e.s.', '7604 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(12, 'Bars, rods and profiles, of non-alloy aluminium', '7604 10 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(13, 'Profiles of non-alloy aluminium, n.e.s.', '7604 10 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(14, 'Hollow profiles of aluminium alloys, n.e.s.', '7604 21 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(15, 'Bars, rods and solid profiles, of aluminium alloys, n.e.s.', '7604 29', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(16, 'Bars and rods of aluminium alloys', '7604 29 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(17, 'Solid profiles, of aluminium alloys, n.e.s.', '7604 29 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(18, 'Aluminium wire (excl. stranded wire, cables, plaited bands and the like and other articles of heading 7614, electrically insulated wires, and strings for musical instruments)', '7605', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(19, 'Wire of non-alloy aluminium, with a maximum cross-sectional dimension of > 7 mm (excl. stranded wire, cables, plaited bands and the like and other articles of heading 7614, and electrically insulated wires)', '7605 11 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(20, 'Wire of non-alloy aluminium, with a maximum cross-sectional dimension of <= 7 mm (other than stranded wires, cables, ropes and other articles of heading 7614, electrically insulated wires, strings for musical instruments)', '7605 19 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(21, 'Wire of aluminium alloys, with a maximum cross-sectional dimension of > 7 mm (excl. stranded wire, cables, plaited bands and the like and other articles of heading 7614, and electrically insulated wires)', '7605 21 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(22, 'Wire, of aluminium alloys, having a maximum cross-sectional dimension of <= 7 mm (other than stranded wires, cables, ropes and other articles of heading 7614, electrically insulated wires, strings for musical instruments)', '7605 29 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(23, 'Plates, sheets and strip, of aluminium, of a thickness of > 0,2 mm (excl. expanded plates, sheets and strip)', '7606', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(24, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of > 0,2 mm, square or rectangular (excl. expanded plates, sheets and strip)', '7606 11', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(25, 'Aluminium Composite Panel, of non-alloy aluminium, of a thickness of > 0,2 mm', '7606 11 30', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(26, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of > 0,2 mm, square or rectangular, painted, varnished or coated with plastics (excl. Aluminium Composite Panel)', '7606 11 50', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(27, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of > 0,2 mm but < 3 mm, square or rectangular (excl. such products painted, varnished or coated with plastics, and expanded plates, sheets and strip)', '7606 11 91', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(28, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of >= 3 mm but < 6 mm, square or rectangular (excl. such products painted, varnished or coated with plastics)', '7606 11 93', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(29, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of >= 6 mm, square or rectangular (excl. such products painted, varnished or coated with plastics)', '7606 11 99', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(30, 'Plates, sheets and strip, of aluminium alloys, of a thickness of > 0,2 mm, square or rectangular (excl. expanded plates, sheets and strip)', '7606 12', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(31, 'Beverage can body stock, of aluminium alloys, of a thickness of > 0,2 mm', '7606 12 11', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(32, 'Beverage can end stock and tab stock, of aluminium alloys, of a thickness of > 0,2 mm', '7606 12 19', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(33, 'Aluminium Composite Panel, of aluminium alloys, of a thickness of > 0,2 mm', '7606 12 30', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(34, 'Plates, sheets and strip, of aluminium alloys, of a thickness of > 0,2 mm, square or rectangular, painted, varnished or coated with plastics (excl. beverage can body stock, end stock and tab stock, and Aluminium Composite Panel)', '7606 12 50', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(35, 'Plates, sheets and strip, of aluminium alloys, of a thickness of > 0,2 mm but < 3 mm, square or rectangular (excl. painted, varnished or coated with plastics, expanded plates, sheets and strip, beverage can body stock, end stock and tab stock)', '7606 12 92', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(36, 'Plates, sheets and strip, of aluminium alloys, of a thickness of >= 3 mm but < 6 mm, square or rectangular (excl. such products painted, varnished or coated with plastics)', '7606 12 93', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(37, 'Plates, sheets and strip, of aluminium alloys, of a thickness of >= 6 mm, square or rectangular (excl. such products painted, varnished or coated with plastics)', '7606 12 99', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(38, 'Plates, sheets and strip, of non-alloy aluminium, of a thickness of > 0,2 mm (other than square or rectangular)', '7606 91 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(39, 'Plates, sheets and strip, of aluminium alloys, of a thickness of > 0,2 mm (other than square or rectangular)', '7606 92 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(40, 'Aluminium foil, \"whether or not printed or backed with paper, paperboard, plastics or similar backing materials\", of a thickness \"excl. any backing\" of <= 0,2 mm (excl. stamping foils of heading 3212, christmas tree decorating material)', '7607', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(41, 'Aluminium foil, not backed, rolled but not further worked, of a thickness of <= 0,2 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 11', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(42, 'Aluminium foil, not backed, rolled but not further worked, of a thickness of < 0,021 mm, in rolls of a weight of <= 10 kg (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 11 11', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(43, 'Aluminium foil, not backed, rolled but not further worked, of a thickness of < 0,021 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material and in rolls of a weight <= 10 kg)', '7607 11 19', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(44, 'Aluminium foil, not backed, rolled but not further worked, of a thickness of >= 0,021 mm but <= 2 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 11 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(45, 'Aluminium foil, not backed, rolled and further worked, of a thickness of <= 2 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 19', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(46, 'Aluminium foil, not backed, rolled and further worked, of a thickness of < 0,021 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 19 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(47, 'Aluminium foil, not backed, rolled and further worked, of a thickness (excl. any backing) from 0,021 mm to 0,2 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 19 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(48, 'Aluminium foil, backed, of a thickness (excl. any backing) of <= 0,2 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 20', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(49, 'Aluminium foil, backed, of a thickness (excl. any backing) of < 0,021 mm (excl. stamping foils of heading 3212, and foil made up as christmas tree decorating material)', '7607 20 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(50, 'Aluminium Composite Panel, of a thickness <= 0,2 mm', '7607 20 91', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(51, 'Aluminium foil, backed, of a thickness (excl. any backing) of >= 0,021 mm but <= 0,2 mm (excl. stamping foils of heading 3212, foil made up as christmas tree decorating material, and Aluminium Composite Panel)', '7607 20 99', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(52, 'Aluminium tubes and pipes (excl. hollow profiles)', '7608', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(53, 'Tubes and pipes of non-alloy aluminium (excl. hollow profiles)', '7608 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(54, 'Tubes and pipes of aluminium alloys (excl. hollow profiles)', '7608 20', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(55, 'Tubes and pipes of aluminium alloys, welded (excl. hollow profiles)', '7608 20 20', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(56, 'Tubes and pipes of aluminium alloys, not further worked than extruded (excl. hollow profiles)', '7608 20 81', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(57, 'Tubes and pipes of aluminium alloys (excl. such products welded or not further worked than extruded, and hollow profiles)', '7608 20 89', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(58, 'Aluminium tube or pipe fittings \"e.g., couplings, elbows, sleeves\"', '7609 00 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(59, 'Structures and parts of structures \"e.g., bridges and bridge-sections, towers, lattice masts, pillars and columns, roofs, roofing frameworks, doors and windows and their frames and thresholds for doors, shutters, balustrades\", of aluminium (excl. prefabri', '7610', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(60, 'Doors, windows and their frames and thresholds for door, of aluminium (excl. door furniture)', '7610 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(61, 'Structures and parts of structures, of aluminium, n.e.s., and plates, rods, profiles, tubes and the like, prepared for use in structures, of aluminium, n.e.s. (excl. prefabricated buildings of heading 9406, doors and windows and their frames and threshold', '7610 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(62, 'Bridges and bridge-sections, towers and lattice masts, of aluminium', '7610 90 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(63, 'Structures and parts of structures, of aluminium, n.e.s., and plates, rods, profiles, tubes and the like, prepared for use in structures, of aluminium, n.e.s. (excl. prefabricated buildings of heading 9406, doors and windows and their frames and threshold', '7610 90 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(64, 'Reservoirs, tanks, vats and similar containers, of aluminium, for any material (other than compressed or liquefied gas), of a capacity of > 300 l, not fitted with mechanical or thermal equipment, whether or not lined or heat-insulated (excl. containers sp', '7611 00 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(65, 'Casks, drums, cans, boxes and similar containers, incl. rigid or collapsible tubular containers, of aluminium, for any material (other than compressed or liquefied gas), of a capacity of <= 300 l, not fitted with mechanical or thermal equipment, whether o', '7612', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(66, 'Collapsible tubular containers, of aluminium', '7612 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(67, 'Casks, drums, cans, boxes and similar containers, incl. rigid tubular containers, of aluminium, for any material (other than compressed or liquefied gas), of a capacity of <= 300 l, n.e.s.', '7612 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(68, 'Containers of a kind used for aerosols, of aluminium', '7612 90 20', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(69, 'Casks, drums, cans, boxes and similar containers, of aluminium, manufactured from foil of a thickness <= 0,2 mm', '7612 90 30', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(70, 'Casks, drums, cans, boxes and similar containers <= 300 l, of aluminium, for any material (other than compressed or liquefied gas), n.e.s. (other than collapsible tubular containers, containers for aerosols and containers manufactured from foil of a thick', '7612 90 80', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(71, 'Aluminium containers for compressed or liquefied gas', '7613 00 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(72, 'Stranded wire, cables, plaited bands and the like, of aluminium (excl. such products electrically insulated)', '7614', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(73, 'Stranded wire, cables, plaited bands and the like, of aluminium, with steel core (excl. such products electrically insulated)', '7614 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(74, 'Stranded wires, cables, ropes and similar articles, of aluminium (other than with steel core and electrically insulated products)', '7614 90 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(75, 'Articles of aluminium, n.e.s.', '7616', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(76, 'Nails, tacks, staples, screws, bolts, nuts, screw hooks, rivets, cotters, cotter pins, washers and similar articles, of aluminium (excl. staples in strips, plugs, bungs and the like, threaded)', '7616 10 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(77, 'Cloth, grill, netting and fencing, of aluminium wire (excl. cloth of metal fibres for clothing, lining and similar uses, and cloth, grill and netting made into hand sieves or machine parts)', '7616 91 00', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(78, 'Articles of aluminium, n.e.s.', '7616 99', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(79, 'Articles of aluminium, cast, n.e.s.', '7616 99 10', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(80, 'Articles of aluminium, uncast, n.e.s.', '7616 99 90', 5, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(81, 'Unwrought aluminium', '7601', 6, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(82, 'Aluminium, not alloyed, unwrought', '7601 10 00', 6, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(83, 'Unwrought aluminium alloys', '7601 20', 6, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(84, 'Unwrought aluminium alloys in the form of slabs or billets', '7601 20 20', 6, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(85, 'Unwrought aluminium alloys (excl. slabs and billets)', '7601 20 80', 6, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(86, 'Granules and powders of pig iron, spiegeleisen, iron or steel (excl. granules and powders of ferro-alloys, turnings and filings of iron or steel, radioactive iron powders \"isotopes\" and certain low-calibre, substandard balls for ballbearings)', '7205', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(87, 'Granules, of pig iron, spiegeleisen, iron or steel (excl. granules of ferro-alloys, turnings and filings of iron or steel, certain small calibre items, defective balls for ball-bearings)', '7205 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(88, 'Powders, of alloy steel (excl. powders of ferro-alloys and radioactive iron powders \"isotopes\")', '7205 21 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(89, 'Powders, of pig iron, spiegeleisen, iron or non-alloy steel (excl. powders of ferro-alloys and radioactive iron powders \"isotopes\")', '7205 29 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(90, 'Flat-rolled products of iron or non-alloy steel, of a width >= 600 mm, hot-rolled, not clad, plated or coated', '7208', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(91, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, with patterns in relief directly due to the rolling process', '7208 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(92, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm, pickled, without patterns in relief', '7208 25 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(93, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 3 mm but < 4,75 mm, pickled, without patterns in relief', '7208 26 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(94, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of < 3 mm, pickled, without patterns in relief', '7208 27 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(95, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 10 mm, not pickled, without patterns in relief', '7208 36 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(96, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm but < 10 mm, not pickled, without patterns in relief', '7208 37 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(97, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 3 mm but < 4,75 mm, not pickled, without patterns in relief', '7208 38 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(98, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply hot-rolled, not clad, plated or coated, of a thickness of < 3 mm, not pickled, without patterns in relief', '7208 39 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(99, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, with patterns in relief directly due to the rolling process', '7208 40 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(100, 'Flat-rolled products of iron or non-alloy steel, of a width >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of > 10 mm, without patterns in relief', '7208 51', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(101, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of > 15 mm, without patterns in relief', '7208 51 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(102, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 2.050 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of > 10 mm but <= 15 mm, without patterns in relief (excl. \"wide flats\")', '7208 51 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(103, 'Flat-rolled products of iron or non-alloy steel, of a width of < 2.050 mm but >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of > 10 mm but <= 15 mm, without patterns in relief', '7208 51 98', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(104, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm but <= 10 mm, without patterns in relief', '7208 52', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(105, 'Flat-rolled products of iron or non-alloy steel, of a width of <= 1.250 mm, not in coils, simply hot-rolled on four faces or in a closed box pass, not clad, plated or coated, of a thickness of >= 4,75 mm but <= 10 mm, without patterns in relief', '7208 52 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(106, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 2.050 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm but <= 10 mm, without patterns in relief', '7208 52 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(107, 'Flat-rolled products of iron or non-alloy steel, of a width of < 2.050 mm but >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm but <= 10 mm, without patterns in relief (excl. rolled on four faces or in a', '7208 52 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(108, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 3 mm but < 4,75 mm, without patterns in relief', '7208 53', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(109, 'Flat-rolled products of iron or non-alloy steel, of a width of <= 1.250 mm, not in coils, simply hot-rolled on four faces or in a closed box pass, not clad, plated or coated, of a thickness of >= 4 mm but < 4,75 mm, without patterns in relief', '7208 53 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(110, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of >= 3 mm but < 4,75 mm, without patterns in relief (excl. rolled on four faces or in a closed bow pass ', '7208 53 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(111, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply hot-rolled, not clad, plated or coated, of a thickness of < 3 mm, without patterns in relief', '7208 54 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(112, 'Flat-rolled products of iron or steel, of a width >= 600 mm, hot-rolled and further worked, but not clad, plated or coated', '7208 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(113, 'Flat-rolled products of iron or steel, of a width >= 600 mm, hot-rolled and further worked, but not clad, plated or coated, perforated', '7208 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(114, 'Flat-rolled products of iron or steel, of a width >= 600 mm, hot-rolled and further worked, but not clad, plated or coated, non-perforated', '7208 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(115, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, cold-rolled \"cold-reduced\", not clad, plated or coated', '7209', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(116, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 3 mm', '7209 15 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(117, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of > 1 mm but < 3 mm', '7209 16', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(118, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", of a thickness of > 1 mm but < 3 mm \"electrical\"', '7209 16 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(119, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of > 1 mm but < 3 mm (excl. electrical)', '7209 16 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(120, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 0,5 mm but <= 1 mm', '7209 17', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(121, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", of a thickness of >= 0,5 mm but <= 1 mm \"electrical\"', '7209 17 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(122, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 0,5 mm but <= 1 mm (excl. electrical)', '7209 17 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(123, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of < 0,5 mm', '7209 18', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(124, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", of a thickness of < 0,5 mm \"electrical\"', '7209 18 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(125, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 0,35 mm but < 0,5 mm (excl. electrical)', '7209 18 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(126, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of < 0,35 mm (excl. electrical)', '7209 18 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(127, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 3 mm', '7209 25 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(128, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of > 1 mm but < 3 mm', '7209 26', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(129, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", of a thickness of > 1 mm but < 3 mm \"electrical\"', '7209 26 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(130, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of > 1 mm but < 3 mm (excl. electrical)', '7209 26 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(131, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 0,5 mm but <= 1 mm', '7209 27', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(132, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", of a thickness of >= 0,5 mm but <= 1 mm \"electrical\"', '7209 27 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(133, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of >= 0,5 mm but <= 1 mm (excl. electrical)', '7209 27 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(134, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of < 0,5 mm', '7209 28', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(135, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", of a thickness of < 0,5 mm \"electrical\"', '7209 28 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(136, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, not in coils, simply cold-rolled \"cold-reduced\", not clad, plated or coated, of a thickness of < 0,5 mm (excl. electrical)', '7209 28 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(137, 'Flat-rolled products of iron or steel, of a width of >= 600 mm, cold-rolled \"cold-reduced\", and further worked, but not clad, plated or coated', '7209 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(138, 'Flat-rolled products of iron or steel, of a width of >= 600 mm, cold-rolled \"cold-reduced\" and further worked, but not clad, plated or coated, perforated', '7209 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(139, 'Flat-rolled products of iron or steel, of a width of >= 600 mm, cold-rolled \"cold-reduced\" and further worked, but not clad, plated or coated, non-perforated', '7209 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(140, 'Flat-rolled products of iron or non-alloy steel, of a width >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad, plated or coated', '7210', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(141, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", tinned, of a thickness of >= 0,5 mm', '7210 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(142, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", tinned, of a thickness of < 0,5 mm', '7210 12', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(143, 'Tinplate of iron or non-alloy steel, of a width of >= 600 mm and of a thickness of < 0,5 mm, tinned [coated with a layer of metal containing, by weight, >= 97% of tin], not further worked than surface-treated', '7210 12 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(144, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with tin, of a thickness of < 0,5 mm (excl. tinplate)', '7210 12 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(145, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with lead, incl. terne-plate', '7210 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(146, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", electrolytically plated or coated with zinc', '7210 30 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(147, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", corrugated, plated or coated with zinc (excl. electrolytically plated or coated with zinc)', '7210 41 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(148, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", not corrugated, plated or coated with zinc (excl. electrolytically plated or coated with zinc)', '7210 49 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(149, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with chromium oxides or with chromium and chromium oxides', '7210 50 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(150, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with aluminium-zinc alloys', '7210 61 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(151, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with aluminium (excl. products plated or coated with aluminium-zinc alloys)', '7210 69 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(152, 'Flat products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", painted, varnished or coated with plastics', '7210 70', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(153, 'Tinplate of a width of >= 600 mm and of a thickness of < 0,5 mm, tinned [coated with a layer of metal containing, by weight, >= 97% of tin], not further worked than varnished, and flat products plated or coated with chromium oxides or with chromium and ch', '7210 70 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(154, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", painted, varnished or plastic coated (excl. tinplate and products electrolytically plated or coated with chrome, varnished)', '7210 70 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(155, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad, plated or coated (excl. tinned, plated or coated with lead, zinc, chromium oxides, chromium and chromium oxides, or aluminium, painte', '7210 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(156, 'Flat-rolled products of iron or non-alloy steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad', '7210 90 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(157, 'Flat-rolled products of iron or non-alloy steel, tinned and printed, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7210 90 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(158, 'Flat-rolled products of iron or non-alloy steel, hot-rolled or cold-rolled \"cold-reduced\", of a width of >= 600 mm, plated or coated (excl. plated or coated with thin, lead \"incl. terne-plate\", zinc, aluminium, chromium, chromium oxides, plastics, platinu', '7210 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(159, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", not clad, plated or coated', '7211', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(160, 'Flat-rolled products of iron or non-alloy steel, simply hot-rolled on four faces or in a closed box pass, not clad, plated or coated, of a width of > 150 mm but < 600 mm and a thickness of >= 4 mm, not in coils, without patterns in relief, commonly known ', '7211 13 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(161, 'Flat-rolled products of iron or non-alloy steel, of a width < 600 mm, not further worked than hot-rolled, not clad, plated or coated, of a thickness of >= 4,75 mm (excl. \"wide flats\")', '7211 14 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(162, 'Flat-rolled products of iron or non-alloy steel, of a width < 600 mm, simply hot-rolled, not clad, plated or coated, of a thickness < 4,75 mm (excl. \"wide flats\")', '7211 19 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(163, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, simply cold-rolled \"cold-reduced\", not clad, plated or coated, containing by weight < 0,25% of carbon', '7211 23', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(164, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, simply cold-rolled \"cold-reduced\", not clad, plated or coated, containing by weight < 0,25% of carbon \"electrical\"', '7211 23 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(165, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm and of a thickness of >= 0,35 mm, simply cold-rolled \"cold-reduced\", not clad, plated or coated, containing by weight < 0,25% of carbon (excl. electrical plate)', '7211 23 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(166, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm and of a thickness of < 0,35 mm, simply cold-rolled \"cold-reduced\", not clad, plated or coated, containing by weight < 0,25% of carbon (excl. electrical plate)', '7211 23 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(167, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, simply cold-rolled \"cold-reduced\", not clad, plated or coated, containing by weight >= 0,25% of carbon', '7211 29 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(168, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, but not clad, plated or coated', '7211 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(169, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, but not clad, plated or coated, perforated', '7211 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(170, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, but not clad, plated or coatednon-perforated', '7211 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(171, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad, plated or coated', '7212', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(172, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", tinned', '7212 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(173, 'Tinplate of iron or non-alloy steel, of a width of < 600 mm and of a thickness of < 0,5 mm, tinned [coated with a layer of metal containing, by weight, >= 97% of tin], not further worked than surface-treated', '7212 10 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(174, 'Flat-rolled products of iron or non-alloy steel, hot-rolled or cold-rolled \"cold-reduced\", of a width of < 600 mm, tinned (excl. tinplate, not further worked than surface-treated)', '7212 10 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(175, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", electrolytically plated or coated with zinc', '7212 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(176, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", tinned (excl. electrolytically plated or coated with zinc)', '7212 30 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(177, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", painted, varnished or coated with plastics', '7212 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(178, 'Tinplate of a width of < 600 mm and of a thickness of < 0,5 mm, tinned [coated with a layer of metal containing, by weight, >= 97% of tin], not further worked than varnished, and flat products plated or coated with chromium oxides or with chromium and chr', '7212 40 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(179, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", painted, varnished or plastic coated (excl. tinplate, not further worked than varnished, and products plated or coated with chromium oxides ', '7212 40 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(180, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated (excl. tinned, plated or coated with zinc, painted, varnished or coated with plastics)', '7212 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(181, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with chromium oxides or with chromium and chromium oxides (excl. varnished)', '7212 50 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(182, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with chromium or nickel', '7212 50 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(183, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with copper', '7212 50 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(184, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with aluminium-zinc alloys', '7212 50 61', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(185, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", plated or coated with aluminium (excl. products plated or coated with aluminium-zinc alloys)', '7212 50 69', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(186, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad (excl. products plated or coated with tin or zinc, copper, with chromium oxides or with chromium and chromium oxides, chromium, nickel ', '7212 50 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(187, 'Flat-rolled products of iron or non-alloy steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", clad', '7212 60 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(188, 'Bars and rods of iron or non-alloy steel, hot-rolled, in irregularly wound coils', '7213', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(189, 'Bars and rods, hot-rolled, in irregularly wound coils of iron or non-alloy steel, with indentations, ribs, grooves or other deformations produced during the rolling process', '7213 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(190, 'Bars and rods, hot-rolled, in irregularly wound coils, of non-alloy free-cutting steel (excl. bars and rods containing indentations, ribs, grooves or other deformations produced during the rolling process)', '7213 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(191, 'Bars and rods, hot-rolled, in irregularly wound coils, of iron or non-alloy steel, of circular cross-section measuring < 14 mm in diameter (excl. bars and rods of free-cutting steel, and bars and rods with indentations, ribs, grooves or other deformations', '7213 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(192, 'Bars and rods, hot-rolled, of the type used for concrete reinforcement, smooth, of iron or non-alloy steel, in irregularly wound coils, of circular cross-section measuring < 14 mm in diameter', '7213 91 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(193, 'Bars and rods, hot-rolled, of the type used for tyre cord, smooth, of iron or non-alloy steel, in irregularly wound coils', '7213 91 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(194, 'Bars and rods, hot-rolled, of iron or non-alloy steel, in irregularly wound coils, containing by weight <= 0,06% of carbon, of circular cross-section measuring < 14 mm in diameter (excl. free-cutting steel, bars and rods, hot-rolled, for concrete reinforc', '7213 91 41', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(195, 'Bars and rods, hot-rolled, of iron or non-alloy steel, in irregularly wound coils, containing by weight > 0,06% and < 0,25% of carbon, of circular cross-section, measuring < 14 mm in diameter (excl. of free-cutting steel, bars and rods, hot-rolled, for co', '7213 91 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(196, 'Bars and rods, hot-rolled, in irregularly wound coils, of iron or non-alloy steel, containing by weight >= 0,25% but <= 0,75% carbon, of circular cross-section measuring < 14 mm in diameter (excl. of free-cutting steel, and bars and rods, smooth, for conc', '7213 91 70', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(197, 'Bars and rods, hot-rolled, of iron or non-alloy steel, in irregularly wound coils, containing by weight > 0,75% of carbon, of circular cross-section measuring < 14 mm in diameter (excl. of free-cutting steel, bars and rods, smooth, for tyre cord and bars ', '7213 91 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(198, 'Bars and rods, hot-rolled, in irregularly wound coils, of iron or non-alloy steel (excl. products of circular cross-section measuring < 14 mm in diameter, bars and rods of free-cutting steel, and bars and rods with indentations, ribs, grooves or other def', '7213 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(199, 'Bars and rods, of iron or non-alloy steel, hot-rolled, in irregularly wound coils, containing by weight < 0,25% carbon (excl. products of circular cross-section measuring < 14 mm in diameter, bars and rods of free-cutting steel, and bars and rods with ind', '7213 99 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(200, 'Bars and rods, hot-rolled, in irregularly wound coils, of iron or non-alloy steel, containing by weight >= 0,25% carbon (excl. products of circular cross-section measuring < 14 mm diameter, bars and rods of free-cutting steel, and bars and rods with inden', '7213 99 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(201, 'Bars and rods, of iron or non-alloy steel, not further worked than forged, hot-rolled, hot-drawn or hot-extruded, but incl. those twisted after rolling (excl. in irregularly wound coils)', '7214', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(202, 'Bars and rods, of iron or non-alloy steel, not further worked than forged (excl. in irregularly wound coils)', '7214 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(203, 'Bars and rods, of iron or non-alloy steel, with indentations, ribs, groves or other deformations produced during the rolling process', '7214 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(204, 'Bars and rods, of non-alloy free-cutting steel, not further worked than hot-rolled, hot-drawn or hot-extruded (excl. containing indentations, ribs, grooves or other deformations produced during the rolling process or twisted after rolling)', '7214 30 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(205, 'Bars and rods, of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, of rectangular \"other than square\" cross-section (excl. containing indentations, ribs, grooves or other deformations produced during the rolling proc', '7214 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(206, 'Bars and rods of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, containing by weight < 0,25% of carbon, of rectangular \"other than square\" cross-section (excl. those with indentations, ribs, grooves or other deform', '7214 91 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(207, 'Other bars and rods of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded, containing by weight >= 0,25% of carbon, of rectangular \"other than square\" cross-section (excl. those with indentations, ribs, grooves or other deformat', '7214 91 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(208, 'Bars and rods, of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded (excl. of rectangular [other than square] cross-section and those containing indentations, ribs, grooves or other deformations produced during the rolling proc', '7214 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(209, 'Bars and rods of the type used for concrete reinforcement, smooth, of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded, containing < 0,25% of carbon, of square cross-section or of a cross-section other than rectangular', '7214 99 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(210, 'Bars and rods of iron or non-alloy steel, only hot-rolled, hot-drawn or hot-extruded, containing < 0,25% of carbon, of circular cross-section, of a maximum diameter of >= 80 mm (other than of free-cutting steel, smooth bars and rods, for reinfoced concret', '7214 99 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(211, 'Bars and rods of iron or non-alloy steel, only hot-rolled, hot-drawn or hot-extruded, containing < 0,25% of carbon, of circular cross-section of a maximum diameter of < 80 mm (other than of free-cutting steel, smooth bars and rods, for reinforced concrete', '7214 99 39', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(212, 'Bars and rods of iron or non-alloy steel, only hot-rolled, hot-drawn or hot-extruded, containing by weight < 0,25% of carbon, of square cross-section or of a cross-section other than square or circular (other than of free-cutting steel, smooth bars and ro', '7214 99 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38');
INSERT INTO `cn_codes` (`cn_id`, `name`, `cn_code`, `goods_category_id`, `created_at`, `updated_at`) VALUES
(213, 'Bars and rods of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded, containing by weight >= 0,25% carbon, of circular cross-section measuring >= 80 mm in diameter (excl. bars and rods with indentations, ribs, grooves or other d', '7214 99 71', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(214, 'Bars and rods of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded, containing by weight >= 0,25% carbon, of circular cross-section measuring < 80 mm in diameter (excl. bars and rods with indentations, ribs, grooves or other de', '7214 99 79', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(215, 'Bars and rods of iron or non-alloy steel, only hot-rolled, only hot-drawn or only hot-extruded, containing by weight >= 0,25% carbon, of square or of other than rectangular or circular cross-section (excl. indentations, ribs, grooves or other deformations', '7214 99 95', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(216, 'Bars and rods, of iron or non-alloy steel, cold-formed or cold-finished, whether or not further worked, or hot-formed and further worked, n.e.s.', '7215', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(217, 'Bars and rods, of non-alloy free-cutting steel, not further worked than cold-formed or cold-finished', '7215 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(218, 'Bars and rods, of iron or non-alloy steel, not further worked than cold-formed or cold-finished (excl. of free-cutting steel)', '7215 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(219, 'Other bars and rods of iron or non-alloy steel, not further worked than cold-formed or cold-finished, containing by weight < 0,25% of carbon of rectangular \"other than square\" cross-section (excl. those of free-cutting steel)', '7215 50 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(220, 'Other bars and rods of iron or non-alloy steel, not further worked than cold-formed or cold-finished, containing by weight < 0,25% of carbon, of square or other than rectangular cross-section (excl. those of free-cutting steel)', '7215 50 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(221, 'Other bars and rods of iron or non-alloy steel, not further worked than cold-formed or cold-finished, containing by weight >= 0,25% of carbon (excl. those of free-cutting steel)', '7215 50 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(222, 'Bars or rods, of iron or non-alloy steel, cold-formed or cold-finished and further worked or hot-formed and further worked, n.e.s.', '7215 90 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(223, 'Angles, shapes and sections of iron or non-alloy steel, n.e.s.', '7216', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(224, 'U, I or H sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or extruded, of a height of < 80 mm', '7216 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(225, 'L sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or extruded, of a height of < 80 mm', '7216 21 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(226, 'T sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or extruded, of a height of < 80 mm', '7216 22 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(227, 'U sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, of a height >= 80 mm', '7216 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(228, 'U sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height >= 80 mm but <= 220 mm', '7216 31 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(229, 'U sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height > 220 mm', '7216 31 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(230, 'I sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, of a height >= 80 mm', '7216 32', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(231, 'I sections with parallel flange faces, of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height >= 80 mm but <= 220 mm', '7216 32 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(232, 'I sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height >= 80 mm but <= 220 mm (excl. 7216.32.11)', '7216 32 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(233, 'I sections with parallel flange faces, of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height > 220 mm', '7216 32 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(234, 'I sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height > 220 mm (excl. 7216.32.91)', '7216 32 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(235, 'H sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, of a height >= 80 mm', '7216 33', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(236, 'H sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height >= 80 mm but <= 180 mm', '7216 33 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(237, 'H sections of iron or non-alloy steel, simply hot-rolled, hot-drawn or extruded, of a height > 180 mm', '7216 33 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(238, 'L sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, of a height >= 80 mm', '7216 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(239, 'L sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or extruded, of a height of >= 80 mm', '7216 40 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(240, 'T sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or extruded, of a height of >= 80 mm', '7216 40 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(241, 'Sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded (excl. U, I, H, L or T sections)', '7216 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(242, 'Sections of iron or non-alloy steel, not further worked than hot-rolled, hot-drawn or hot-extruded, with a cross-section which is capable of being enclosed in a square the side of which is <= 80 mm (excl. U, I, H, L or T sections)', '7216 50 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(243, 'Bulb sections \"bulb flat\", only hot-rolled, hot-drawn or hot-extruded', '7216 50 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(244, 'Profile of iron or non-alloy steel, only hot-rolled, hot-drawn or hot-extruded (other than with a cross-section which is capable of being enclosed in a square the side of which is <= 80 mm, and U-, I-, H-, L- or T-sections and ribbed sections [ribbed stee', '7216 50 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(245, 'Angles, shapes and sections, of iron or non-alloy steel, from flat-rolled products simply cold-formed or cold-finished (excl. profiled sheet)', '7216 61', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(246, 'c, l, u, z, omega or open-ended sections of iron or non-alloy steel, simply cold-formed or cold-finished, obtained from flat-rolled products', '7216 61 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(247, 'Angles, shapes and sections (other than c, l, u, z, omega or open-ended sections) of iron or non-alloy steel, simply cold-formed or cold-finished, obtained from flat-rolled products', '7216 61 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(248, 'Angles, shapes and sections, of iron or non-alloy steel, not further worked than cold-formed or cold-finished (excl. profiled sheet)', '7216 69 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(249, 'Angles, shapes and sections, of iron or non-alloy steel, cold-formed or cold-finished from flat-rolled products and further worked', '7216 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(250, 'Sheets sheets of iron or non-alloy steel, cold-formed or cold finished, profiled \"ribbed\"', '7216 91 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(251, 'Angles, shapes and sections, of iron or non-alloy steel, cold-formed or cold-finished from flat-rolled products and further worked (excl. profiled sheet)', '7216 91 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(252, 'Angles, shapes and sections, of iron or non-alloy steel, cold-formed or cold-finished and further worked, or hot-forged, or hot-formed by other means and further worked, n.e.s. (excl. from flat-rolled products)', '7216 99 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(253, 'Wire of iron or non-alloy steel, in coils (excl. bars and rods)', '7217', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(254, 'Wire of iron or non-alloy steel, in coils, not plated or coated, whether or not polished (excl. bars and rods)', '7217 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(255, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, not plated or coated, whether or not polished, with a maximum cross-sectional dimension of < 0,8 mm', '7217 10 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(256, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, with indentations, ribs, grooves or other deformations produced during the rolling process, not plated or coated, with a maximum cross-sectional dimension of >= 0,8 mm', '7217 10 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(257, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, not plated or coated, with a maximum cross-sectional dimension of >= 0,8 mm (without indentations, ribs, grooves or other deformations produced during the rolling process)', '7217 10 39', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(258, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,25% but < 0,6% carbon, not plated or coated, whether or not polished (excl. hot-rolled bars and rods)', '7217 10 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(259, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,6% carbon, not plated or coated, whether or not polished (excl. hot-rolled bars and rods)', '7217 10 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(260, 'Wire of iron or non-alloy steel, in coils, plated or coated with zinc (excl. bars and rods)', '7217 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(261, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, plated or coated with zinc, with a maximum cross-sectional dimension of < 0,8 mm', '7217 20 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(262, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, plated or coated with zinc, with a maximum cross-sectional dimension of < 0,8 mm (excl. bars and rods)', '7217 20 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(263, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,25% but < 0,6% carbon, plated or coated with zinc (excl. bars and rods)', '7217 20 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(264, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,6% carbon, plated or coated with zinc (excl. bars and rods)', '7217 20 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(265, 'Wire of iron or non-alloy steel, in coils, plated or coated with base metals (excl. plated or coated with zinc, and bars and rods)', '7217 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(266, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, copper-coated (excl. bars and rods)', '7217 30 41', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(267, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, plated or coated with base metals (excl. products plated or coated with zinc or copper and bars and rods)', '7217 30 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(268, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,25% but < 0,6% carbon, plated or coated with base metals (excl. products plated or coated with zinc, and bars and rods)', '7217 30 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(269, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,6% carbon, plated or coated with base metals (excl. products plated or coated with zinc, and bars and rods)', '7217 30 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(270, 'Wire of iron or non-alloy steel, in coils, plated or coated (excl. plated or coated with base metals, and bars and rods)', '7217 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(271, 'Wire of iron or non-alloy steel, in coils, containing by weight < 0,25% carbon, plated or coated (excl. products plated or coated with base metals and bars and rods)', '7217 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(272, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,25% but < 0,6% carbon, plated or coated (excl. products plated or coated with with base metals, and bars and rods)', '7217 90 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(273, 'Wire of iron or non-alloy steel, in coils, containing by weight >= 0,6% carbon, plated or coated (excl. products plated or coated with base metals, and bars and rods)', '7217 90 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(274, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7219', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(275, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of > 10 mm', '7219 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(276, 'Flat-rolled products of stainless steel, of a width of>= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 4,7 mm and <= 10 mm', '7219 12', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(277, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 4,75 mm but <= 10 mm, containing by weight >= 2,5 nickel', '7219 12 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(278, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 4,75 mm but <= 10 mm, containing by weight < 2,5 nickel', '7219 12 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(279, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 3 mm and < 4,75 mm', '7219 13', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(280, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 3 mm but <= 4,75 mm, containing by weight >= 2,5 nickel', '7219 13 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(281, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of >= 3 mm but <= 4,75 mm, containing by weight < 2,5 nickel', '7219 13 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(282, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of < 3 mm', '7219 14', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(283, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of < 3 mm, containing by weight >= 2,5 nickel', '7219 14 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(284, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils, of a thickness of < 3 mm, containing by weight < 2,5 nickel', '7219 14 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(285, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of > 10 mm', '7219 21', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(286, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of > 10 mm, containing by weight >= 2,5 nickel', '7219 21 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(287, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of > 10 mm, containing by weight < 2,5 nickel', '7219 21 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(288, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of >= 4,75 mm and <= 10 mm', '7219 22', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(289, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of >= 4,75 mm but <= 10 mm, containing by weight >= 2,5% nickel', '7219 22 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(290, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of >= 4,75 mm but <= 10 mm, containing by weight < 2,5% nickel', '7219 22 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(291, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of >= 3 mm and < 4,75 mm', '7219 23 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(292, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of < 3 mm', '7219 24 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(293, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 4,75 mm', '7219 31 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(294, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 3 mm but < 4,75 mm', '7219 32', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(295, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 3 mm but <= 4,75 mm, containing by weight >= 2,5% nickel', '7219 32 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(296, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 3 mm but <= 4,75 mm, containing by weight < 2,5% nickel', '7219 32 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(297, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of > 1 mm but < 3 mm', '7219 33', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(298, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of > 1 mm but < 3 mm, containing by weight >= 2,5% nickel', '7219 33 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(299, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of > 1 mm but < 3 mm, containing by weight < 2,5% nickel', '7219 33 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(300, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 0,5 mm but <= 1 mm', '7219 34', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(301, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 0,5 mm but <= 1 mm, containing by weight >= 2,5% nickel', '7219 34 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(302, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 0,5 mm but <= 1 mm, containing by weight < 2,5% nickel', '7219 34 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(303, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of < 0,5 mm', '7219 35', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(304, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of < 0,5 mm, containing by weight >= 2,5% nickel', '7219 35 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(305, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of < 0,5 mm, containing by weight < 2,5% nickel', '7219 35 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(306, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked', '7219 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(307, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, perforated', '7219 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(308, 'Flat-rolled products of stainless steel, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, non-perforated', '7219 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(309, 'Flat-rolled products of stainless steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7220', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(310, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than hot-rolled, of a thickness of >= 4,75 mm', '7220 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(311, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than hot-rolled, of a thickness of < 4,75 mm', '7220 12 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(312, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\"', '7220 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(313, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 3 mm and containing by weight >= 2,5% nickel', '7220 20 21', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(314, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of >= 3 mm and containing by weight < 2,5% nickel', '7220 20 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(315, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of > 0,35 mm but < 3 mm, and containing by weight >= 2,5% nickel', '7220 20 41', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(316, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of > 0,35 mm but < 3 mm, and containing by weight < 2,5% nickel', '7220 20 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(317, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of <= 0,35 mm and containing by weight >= 2,5% nickel', '7220 20 81', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(318, 'Flat-rolled products of stainless steel, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\", of a thickness of <= 0,35 mm and containing by weight < 2,5% nickel', '7220 20 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(319, 'Flat-rolled products of stainless steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked', '7220 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(320, 'Flat-rolled products of stainless steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, perforated', '7220 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(321, 'Flat-rolled products of stainless steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked, non-perforated', '7220 90 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(322, 'Bars and rods of stainless steel, hot-rolled, in irregularly wound coils', '7221 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(323, 'Bars and rods of stainless steel, hot-rolled, in irregularly wound coils, containing by weight >= 2,5% nickel', '7221 00 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(324, 'Bars and rods of stainless steel, hot-rolled, in irregularly wound coils, containing by weight < 2,5% nickel', '7221 00 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(325, 'Other bars and rods of stainless steel; angles, shapes and sections of stainless steel, n.e.s.', '7222', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(326, 'Bars and rods of stainless steel, only hot-rolled, only hot-drawn or only hot-extruded, of circular cross-section', '7222 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(327, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, of circular cross-section of a diameter of >= 800 mm, containing by weight >= 2,5% nickel', '7222 11 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(328, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, of circular cross-section of a diameter of >= 800 mm, containing by weight < 2,5% nickel', '7222 11 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(329, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, of circular cross-section measuring < 80 mm and containing by weight >= 2,5% nickel', '7222 11 81', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(330, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, of circular cross-section measuring < 80 mm and containing by weight < 2,5% nickel', '7222 11 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(331, 'Bars and rods of stainless steel, only hot-rolled, only hot-drawn or only extruded (excl. of circular cross-section)', '7222 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(332, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, containing by weight >= 2,5% nickel (excl. such products of circular cross-section)', '7222 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(333, 'Bars and rods of stainless steel, not further worked than hot-rolled, hot-drawn or extruded, containing by weight < 2,5% nickel (excl. such products of circular cross-section)', '7222 19 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(334, 'Other bars and rods of stainless steel, not further worked than cold-formed or cold-finished', '7222 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(335, 'Bars and rods of stainless steel, of circular cross-section of a diameter >= 80 mm, simply cold-formed or cold-finished, containing by weight >= 2,5% nickel', '7222 20 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(336, 'Bars and rods of stainless steel, of circular cross-section of a diameter >= 80 mm, simply cold-formed or cold-finished, containing by weight < 2,5% nickel', '7222 20 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(337, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section measuring >= 25 mm but < 80 mm and containing by weight >= 2,5% nickel', '7222 20 21', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(338, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section measuring >= 25 mm but < 80 mm and containing by weight < 2,5% nickel', '7222 20 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(339, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section measuring < 25 mm and containing by weight >= 2,5% nickel', '7222 20 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(340, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section measuring < 25 mm and containing by weight < 2,5% nickel', '7222 20 39', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(341, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, containing by weight >= 2,5% nickel (excl. such products of circular cross-section)', '7222 20 81', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(342, 'Bars and rods of stainless steel, not further worked than cold-formed or cold-finished, containing by weight < 2,5% nickel (excl. such products of circular cross-section)', '7222 20 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(343, 'Other bars and rods of stainless steel, cold-formed or cold-finished and further worked, or not further worked than forged, or forged, or hot-formed by other means and further worked, n.e.s.', '7222 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(344, 'Other bars and rods of stainless steel, containing by weight >= 2,5% of nickel, forged', '7222 30 51', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(345, 'Other bars and rods of stainless steel, containing by weight < 2,5% of nickel, forged', '7222 30 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(346, 'Bars and rods of stainless steel, cold-formed or cold-finished and further worked, or hot-formed and further worked, n.e.s. (excl. forged products)', '7222 30 97', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(347, 'Angles, shapes and sections of stainless steel, n.e.s.', '7222 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(348, 'Angles, shapes and sections of stainless steel, only hot-rolled, only hot-drawn or only extruded', '7222 40 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(349, 'Angles, shapes and sections of stainless steel, not further worked than cold-formed or cold-finished', '7222 40 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(350, 'Angles, shapes and sections of stainless steel, cold-formed or cold-finished and further worked, or not further worked than forged, or forged, or hot-formed by other means and further worked, n.e.s.', '7222 40 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(351, 'Wire of stainless steel, in coils (excl. bars and rods)', '7223 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(352, 'Wire of stainless steel, in coils, containing by weight 28% to 31% nickel and 20% to 22% chromium (excl. bars and rods)', '7223 00 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(353, 'Wire of stainless steel, in coils, containing by weight >= 2,5% nickel (excl. such products containing 28% to 31% nickel and 20% to 22% chromium, and bars and rods)', '7223 00 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(354, 'Wire of stainless steel, in coils, containing by weight < 2,5% nickel, 13% to 25% chromium and 3,5% to 6% aluminium (excl. bars and rods)', '7223 00 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(355, 'Wire of stainless steel, in coils, containing by weight < 2,5% nickel (excl. such products containing 13% to 25% chromium and 3,5% to 6% aluminium, and bars and rods)', '7223 00 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(356, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7225', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(357, 'Flat-rolled products of silicon-electrical steel, of a width of >= 600 mm, grain-oriented', '7225 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(358, 'Flat-rolled products of silicon-electrical steel, of a width of >= 600 mm, non-grain-oriented', '7225 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(359, 'Flat-rolled products of silicon-electrical steel, of a width of >= 600 mm, hot-rolled', '7225 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(360, 'Flat-rolled products of silicon-electrical steel, of a width of >= 600 mm, cold-rolled \"cold-reduced\", non-grain-oriented', '7225 19 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(361, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, in coils (excl. products of silicon-electrical steel)', '7225 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(362, 'Flat-rolled products of tool steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils', '7225 30 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(363, 'Flat-rolled products of high-speed steel, of a width of >= 600 mm, not further worked than hot-rolled, in coils', '7225 30 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(364, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, in coils (excl. products of tool steel, high-speed steel or silicon-electrical steel)', '7225 30 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(365, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, not in coils (excl. products of silicon-electrical steel)', '7225 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(366, 'Flat-rolled products of tool steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils', '7225 40 12', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(367, 'Flat-rolled products of high-speed steel, of a width of >= 600 mm, not further worked than hot-rolled, not in coils', '7225 40 15', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(368, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of > 10 mm (excl. products of tool steel, high-speed steel or silicon-electrical steel)', '7225 40 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(369, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of >= 4,75 mm but <= 10 mm (excl. products of tool steel, high-speed steel or silicon-electrical steel)', '7225 40 60', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(370, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than hot-rolled, not in coils, of a thickness of < 4,75 mm (excl. products of tool steel, high-speed steel or silicon-electrical steel)', '7225 40 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(371, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\" (excl. products of silicon-electrical steel)', '7225 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(372, 'Flat-rolled products of high-speed steel, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\"', '7225 50 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(373, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, not further worked than cold-rolled \"cold-reduced\" (excl. products of high-speed steel or silicon-electrical steel)', '7225 50 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(374, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and electrolytically plated or coated with zinc (excl. products of silicon-electrical steel)', '7225 91 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(375, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and plated or coated with zinc (excl. electrolytically plated or coated and products of silicon-electrical steel)', '7225 92 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(376, 'Flat-rolled products of alloy steel other than stainless, of a width of >= 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked (excl. plated or coated with zinc and products of silicon-electrical steel)', '7225 99 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(377, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7226', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(378, 'Flat-rolled products of silicon-electrical steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", grain-oriented', '7226 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(379, 'Flat-rolled products of silicon-electrical steel, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\", not grain-oriented', '7226 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(380, 'Flat-rolled products of silicon-electrical steel, of a width of < 600 mm, not further worked than hot-rolled', '7226 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(381, 'Flat-rolled products of silicon-electrical steel, of a width of < 600 mm, cold-rolled \"cold-reduced\", whether or not further worked, or hot-rolled and further worked, non-grain-oriented', '7226 19 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(382, 'Flat-rolled products of high-speed steel, of a width of <= 600 mm, hot-rolled or cold-rolled \"cold-reduced\"', '7226 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(383, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, not further worked than hot-rolled (excl. products of high-speed steel or silicon-electrical steel)', '7226 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(384, 'Flat-rolled products of tool steel, of a width of < 600 mm, simply hot-rolled', '7226 91 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(385, 'Flat-rolled products of alloy steel other than stainless steel, simply hot-rolled, of a thickness of >= 4,75 mm, of a width of < 600 mm (excl. of tool steel, silicon-electrical steel or high speed steel)', '7226 91 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(386, 'Flat-rolled products of alloy steel other than stainless steel, simply hot-rolled, of a thickness of < 4,75 mm, of a width of < 600 mm (excl. of tool steel, silicon-electrical steel or high speed steel)', '7226 91 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(387, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, not further worked than cold-rolled \"cold-reduced\" (excl. products of high-speed steel or silicon-electrical steel)', '7226 92 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(388, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked (excl. products of high-speed steel or silicon-electrical steel)', '7226 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(389, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and electrolytically plated or coated with zinc (excl. products of high-speed steel or silicon-electrical steel)', '7226 99 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(390, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and plated or coated with zinc (excl. electrolytically plated or coated, and products of high-speed steel or silicon-electrical stee', '7226 99 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(391, 'Flat-rolled products of alloy steel other than stainless, of a width of < 600 mm, hot-rolled or cold-rolled \"cold-reduced\" and further worked (excl. plated or coated with zinc, and products of high-speed steel or silicon-electrical steel)', '7226 99 70', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(392, 'Bars and rods of alloy steel other than stainless, hot-rolled, in irregularly wound coils', '7227', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(393, 'Bars and rods of high-speed steel, hot-rolled, in irregularly wound coils', '7227 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(394, 'Bars and rods of silico-manganese steel, hot-rolled, in irregularly wound coils', '7227 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(395, 'Bars and rods of alloy steel other than stainless, hot-rolled, in irregularly wound coils (excl. products of high-speed steel or silicon-electrical steel)', '7227 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(396, 'Bars and rods, hot-rolled, of steel containing by weight >= 0,0008% of boron with any other element < the minimum content referred to in Note 1 f to this chapter, in irregularly wound coils', '7227 90 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(397, 'Bars and rods, hot-rolled, of steel containing by weight 0,9% to 1,15% carbon, 0,5% to 2% of chromium and, if present, <= 0,5 of molybdenum, in irregularly wound coils', '7227 90 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(398, 'Bars and rods, hot-rolled, in irregularly wound coils of alloy steel other than stainless (excl. of high-speed steel or silico-manganese steel and bars and rods of subheadings 7227.90.10 and 7227.90.50)', '7227 90 95', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(399, 'Other bars and rods of alloy steel other than stainless, angles, shapes and sections of alloy steel other than stainless, n.e.s.; hollow drill bars and rods, of alloy or non-alloy steel', '7228', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(400, 'Bars and rods of high-speed steel (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(401, 'Bars and rods of high-speed steel, not further worked than hot-rolled, hot-drawn or extruded, and hot-rolled, hot-drawn or extruded, not further worked than clad (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregular', '7228 10 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(402, 'Bars and rods of high-speed steel, forged (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 10 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(403, 'Bars and rods of high-speed steel, not further worked than cold-formed or cold-finished, whether or not further worked, or hot-formed and further worked (excl. forged products, semi-finished products, flat-rolled products and hot-rolled bars and rods in i', '7228 10 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(404, 'Bars and rods of silico-manganese steel (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(405, 'Bars and rods of silico-manganese steel, of rectangular \"other than square\" cross-section, hot-rolled on four faces (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 20 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(406, 'Bars and rods of silico-manganese steel, of square or other than rectangular cross-section, not further worked than hot-rolled, hot-drawn or extruded, and hot-rolled, hot-drawn or extruded, not further worked than clad (excl. semi-finished products, flat-', '7228 20 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(407, 'Bars and rods of silico-manganese stee, of square or other than rectangular cross-section, only cold-formed or cold-finished, incl. further worked, or hot-rolled and further worked (excl. hot-rolled, hot drawn or extruded, not further worked than clad, se', '7228 20 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(408, 'Bars and rods of alloy steel other than stainless, not further worked than hot-rolled, hot-drawn or extruded (excl. products of high-speed steel or silico-manganese steel, semi-finished products, flat-rolled products and hot-rolled bars and rods in irregu', '7228 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(409, 'Bars and rods of tool steel, only hot-rolled, only hot-drawn or only extruded (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 30 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(410, 'Bars and rods of steel containing by weight 0,9 to 1,15% of carbon and 0,5 to 2% of chromium, and, if present, <= 0,5% of molybdenum, only hot-rolled, hot-drawn or hot-extruded, of a circular cross-section of a diameter of >= 80 mm (excl. semi-finished pr', '7228 30 41', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(411, 'Bars and rods of steel containing by weight 0,9 to 1,15% of carbon and 0,5 to 2% of chromium, and, if present, <= 0,5% of molybdenum, only hot-rolled, only hot-drawn or hot-extruded (other than of circular cross-section, of a diameter of >= 80 mm and excl', '7228 30 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(412, 'Bars and rods of alloy steel other than stainless steel, only hot-rolled, hot-drawn or hot-extruded, of circular cross-section, of a diameter of >= 80 mm (other than of high-speed steel, silico-manganese steel, tool steel, articles of subheading 7228.30.4', '7228 30 61', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(413, 'Bars and rods or alloy steel other than stainless steel, only hot-rolled, hot-drawn or hot-extruded, of circular cross-section, of a diameter of < 80 mm (other than of high-speed steel, silico-manganese steel, tool steel and articles of subheading 7228.30', '7228 30 69', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(414, 'Bars and rods of alloy steel other than stainless steel, of rectangular \"other than square\" cross-section, hot-rolled on four faces (other than of high-speed steel, silico-manganese steel, tool steel, articles of subheading 7228.30.41 and 7228.30.49 and e', '7228 30 70', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(415, 'Bars and rods of alloy steel other than stainless steel, only hot-rolled, hot-drawn or hot-extruded, of other than rectangular [other than square] cross-section, rolled on four faces, or of circular cross-section (other than of high-speed steel, silico-ma', '7228 30 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(416, 'Bars and rods of alloy steel other than stainless, not further worked than forged (excl. products of high-speed steel or silico-manganese steel, semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(417, 'Bars and rods of tool steel, only forged (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 40 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(418, 'Bars and rods of alloy steel, other than stainless steel, only forged (excl. of high-speed steel, silico-manganese steel, tool steel, semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 40 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(419, 'Bars and rods of alloy steel other than stainless, not further worked than cold-formed or cold-finished (excl. products of high-speed steel or silico-manganese steel, semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly', '7228 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(420, 'Bars and rods of tool steel, only cold-formed or cold-finished (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 50 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(421, 'Bars and rods of steel containing 0,9% to 1,15% of carbon, 0,5% to 2% of chromium and, if present <= 0,5% of molybdenum, only cold-formed or cold-finished (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly woun', '7228 50 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(422, 'Bars and rods of alloy steel, other than stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section, of a diameter of >= 80 mm (excl. of high-speed steel, silico-manganese steel, tool steel, articles of subheading 722', '7228 50 61', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(423, 'Bars and rods of alloy steel, other than stainless steel, not further worked than cold-formed or cold-finished, of circular cross-section, of a diameter of < 80 mm (excl. of high-speed steel, silico-manganese steel, tool steel, articles of subheading 7228', '7228 50 69', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(424, 'Bars and rods of alloy steel, other than stainless steel, not further worked than cold-formed or cold-finished (excl. of circular cross-section and products of high-speed steel, silico-manganese steel, tool steel, articles of subheading 7228.50.40, semi-f', '7228 50 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38');
INSERT INTO `cn_codes` (`cn_id`, `name`, `cn_code`, `goods_category_id`, `created_at`, `updated_at`) VALUES
(425, 'Bars and rods of alloy steel other than stainless, cold-formed or cold-finished and further worked or hot-formed and further worked, n.e.s. (excl. products of high-speed steel or silico-manganese steel, semi-finished products, flat-rolled products and hot', '7228 60', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(426, 'Bars and rods of tool steel, cold-formed or cold-finished and further worked or hot-formed and further worked (excl. semi-finished products, flat-rolled products and hot-rolled bars and rods in irregularly wound coils)', '7228 60 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(427, 'Bars and rods of alloy steel, other than stainless steel, cold-formed or cold-finished and further worked or hot-formed and further worked (excl. bars and rods of high-speed steel, silico-manganese steel or tool steel, semi-finished products, flat-rolled ', '7228 60 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(428, 'Angles, shapes and sections of alloy steel other than stainless, n.e.s.', '7228 70', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(429, 'Angles, shapes and sections of alloy steel other than stainless, not further worked than hot-rolled, hot-drawn or extruded', '7228 70 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(430, 'Angles, shapes and sections of alloy steel other than stainless, n.e.s. (excl. products not further worked than hot-rolled, hot-drawn or extruded)', '7228 70 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(431, 'Hollow drill bars and rods, of alloy or non-alloy steel', '7228 80 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(432, 'Wire of alloy steel other than stainless, in coils (excl. bars and rods)', '7229', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(433, 'Wire of silico-manganese steel, in coils (excl. bars and rods)', '7229 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(434, 'Wire of alloy steel other than stainless, in coils (excl. bars and rods and wire of silico-manganese steel)', '7229 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(435, 'Wire of high-speed steel, in coils (excl. bars and rods)', '7229 90 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(436, 'Wire of steel containing by weight 0,9% to 1,1% of carbon, 0,5% to 2% of chromium and, if present, <= 0,5% of molybdenum, in coils (excl. rolled bars and rods)', '7229 90 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(437, 'Wire of alloy steel other than stainless, in coils (excl. rolled bars and rods, wire of high-speed steel or silico-manganese steel and articles of subheading 7229.90.50)', '7229 90 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(438, 'Sheet piling of iron or steel, whether or not drilled, punched or made from assembled elements; welded angles, shapes and sections, of iron or steel', '7301', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(439, 'Sheet piling of iron or steel, whether or not drilled, punched or made from assembled elements', '7301 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(440, 'Angles, shapes and sections, of iron or steel, welded', '7301 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(441, 'Railway or tramway track construction material of iron or steel, the following : rails, check-rails and rack rails, switch blades, crossing frogs, point rods and other crossing pieces, sleepers \"cross-ties\", fish-plates, chairs, chair wedges, sole plates ', '7302', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(442, 'Rails of iron or steel, for railway or tramway track (excl. check-rails)', '7302 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(443, 'Current-conducting rails of iron or steel, with parts of non-ferrous metal, for railway or tramway track (excl. check-rails)', '7302 10 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(444, 'Vignole rails of iron or steel, for railway or tramway track, new, of a weight of >= 36 kg/m', '7302 10 22', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(445, 'Vignole rails of iron or steel, for railway or tramway track, new, of a weight of < 36 kg/m', '7302 10 28', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(446, 'Grooved rails of iron or steel, for railway or tramway track, new', '7302 10 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(447, 'Rails of iron or steel, for railway or tramway track, new (excl. vignole rails, grooved rails, and current-conducting rails with parts of non-ferrous metal)', '7302 10 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(448, 'Rails of iron or steel, for railway or tramway track, used (excl. current-conducting rails with parts of non-ferrous metal)', '7302 10 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(449, 'Switch blades, crossing frogs, point rods and other crossing pieces, for railway or tramway track, of iron or steel', '7302 30 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(450, 'Fish-plates and sole plates of iron or steel, for railways or tramways', '7302 40 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(451, 'Sleepers \"cross-ties\", check-rails, rack rails, chairs, chair wedges, rail clips, bedplates and ties and other specialised material for the jointing or fixing of railway or tramway track, of iron or steel (excl. rails, switch blades, crossing frogs, point', '7302 90 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(452, 'Tubes, pipes and hollow profiles, of cast iron', '7303 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(453, 'Tubes and pipes of a kind used in pressure systems, of cast iron', '7303 00 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(454, 'Tubes, pipes and hollow profiles, of cast iron (excl. products of a kind used in pressure systems)', '7303 00 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(455, 'Tubes, pipes and hollow profiles, seamless, of iron or steel (excl. products of cast iron)', '7304', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(456, 'Line pipe of a kind used for oil or gas pipelines, seamless, of stainless steel', '7304 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(457, 'Line pipe of a kind used for oil or gas pipelines, seamless, of iron or steel (excl. products of stainless steel or of cast iron)', '7304 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(458, 'Line pipe of a kind used for oil or gas pipelines, seamless, of iron or steel, of an external diameter of <= 168,3 mm (excl. products of stainless steel or of cast iron)', '7304 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(459, 'Line pipe of a kind used for oil or gas pipelines, seamless, of iron or steel, of an external diameter of > 168,3 mm but <= 406,4 mm (excl. products of stainless steel or of cast iron)', '7304 19 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(460, 'Line pipe of a kind used for oil or gas pipelines, seamless, of iron or steel, of an external diameter of > 406,4 mm (excl. products of stainless steel or of cast iron)', '7304 19 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(461, 'Drill pipe, seamless, of stainless steel, of a kind used in drilling for oil or gas', '7304 22 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(462, 'Drill pipe, seamless, of a kind used in drilling for oil or gas, of iron or steel (excl. products of stainless steel or of cast iron)', '7304 23 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(463, 'Casing and tubing, seamless, of a kind used for drilling for oil or gas, of stainless steel', '7304 24 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(464, 'Casing and tubing, seamless, of iron or steel, of a kind used in drilling for oil or gas (excl. products of cast iron)', '7304 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(465, 'Casing and tubing of a kind used for drilling for oil or gas, seamless, of iron or steel, of an external diameter <= 168,3 mm (excl. products of cast iron)', '7304 29 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(466, 'Casing and tubing of a kind used for drilling for oil or gas, seamless, of iron or steel, of an external diameter > 168,3 mm, but <= 406,4 mm (excl. products of cast iron)', '7304 29 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(467, 'Casing and tubing of a kind used for drilling for oil or gas, seamless, of iron or steel, of an external diameter > 406,4 mm (excl. products of cast iron)', '7304 29 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(468, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, cold-drawn or cold-rolled \"cold-reduced\" (excl. cast iron products and line pipe of a kind used for oil or gas pipelines or casing and tubing of a kind used', '7304 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(469, 'Precision tubes, seamless, of circular cross-section, of iron or non-alloy steel, cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines or casing and tubing of a kind used for drilling for oil or gas)', '7304 31 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(470, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, cold-drawn or cold-rolled \"cold-reduced\" (excl. cast iron products, line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for ', '7304 31 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(471, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, not cold-drawn or cold-rolled \"cold-reduced\" (excl. cast iron products, line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used ', '7304 39', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(472, 'Threaded or threadable tubes \"gas pipe\", seamless, of iron or non-alloy steel (excl. of cast iron)', '7304 39 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(473, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, of an external diameter of <= 168,3 mm (excl. cold-drawn or cold-rolled, of cast iron, line pipe of a kind used for oil or gas pipelines, casing, tubing and', '7304 39 82', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(474, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, of an external diameter of > 168,3 mm but <= 406,4 mm (excl. cold-drawn or cold-rolled, of cast iron, line pipe of a kind used for oil or gas pipelines, cas', '7304 39 83', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(475, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of iron or non-alloy steel, of an external diameter of > 406,4 mm (excl. cold-drawn or cold-rolled, of cast iron, line pipe of a kind used for oil or gas pipelines, casing, tubing and ', '7304 39 88', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(476, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of stainless steel, cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for drilling for oil or gas)', '7304 41 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(477, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of stainless steel, not cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines or of a kind used for drilling for oil or gas)', '7304 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(478, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of stainless steel, of an external diameter of <= 168,3 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, and casing and tubing of a kind used for', '7304 49 83', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(479, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of stainless steel, of an external diameter of > 168,3 mm but <= 406,4 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, and casing and tubing of ', '7304 49 85', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(480, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of stainless steel, of an external diameter of > 406,4 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, and casing and tubing of a kind used for ', '7304 49 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(481, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for drilling fo', '7304 51', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(482, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, cold-drawn or cold-rolled \"cold-reduced\", straight and of uniform wall-thickness, containing by weight >= 0,9% but <= 1,15% carbon and >= 0,5% but ', '7304 51 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(483, 'Precision tubes, seamless, of circular cross-section, of alloy steel other than stainless, cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for drilling for oil and tubes, ', '7304 51 81', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(484, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, not cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for drillin', '7304 51 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(485, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, not cold-drawn or cold-rolled \"cold-reduced\" (excl. line pipe of a kind used for oil or gas pipelines, casing and tubing of a kind used for drillin', '7304 59', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(486, 'Tubes, pipes and hollow profiles of alloy steel (excl. stainless), seamless, of circular cross-section (not cold-drawn or cold-rolled), straight and of uniform wall-thickness, containing by weight >= 0,9% but <= 1,15% carbon and >= 0,5% but <= 2% chromium', '7304 59 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(487, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, of an external diameter of <= 168,3 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, casing and tubing of a ', '7304 59 82', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(488, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, of an external diameter of > 168,3 mm but <= 406,4 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, casing a', '7304 59 83', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(489, 'Tubes, pipes and hollow profiles, seamless, of circular cross-section, of alloy steel other than stainless, of an external diameter of > 406,4 mm (excl. cold-drawn or cold-rolled, line pipe of a kind used for oil or gas pipelines, casing and tubing of a k', '7304 59 89', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(490, 'Tubes, pipes and hollow profiles, seamless, of non-circular cross-section, of iron or steel (excl. products of cast iron)', '7304 90 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(491, 'Tubes and pipes, having circular cross-sections and an external diameter of > 406,4 mm, of flat-rolled products of iron or steel \"e.g., welded, riveted or similarly closed\"', '7305', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(492, 'Line pipe of a kind used for oil or gas pipelines, having circular cross-sections and an external diameter of > 406,4 mm, of iron or steel, longitudinally submerged arc welded', '7305 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(493, 'Line pipe of a kind used for oil or gas pipelines, having circular cross-sections and an external diameter of > 406,4 mm, of iron or steel, longitudinally arc welded (excl. products longitudinally submerged arc welded)', '7305 12 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(494, 'Line pipe of a kind used for oil or gas pipelines, having circular cross-sections and an external diameter of > 406,4 mm, of flat-rolled products of iron or steel (excl. products longitudinally arc welded)', '7305 19 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(495, 'Casing of a kind used in drilling for oil or gas, having circular cross-sections and an external diameter of > 406,4 mm, of flat-rolled products of iron or steel', '7305 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(496, 'Tubes and pipes having circular cross-sections and an external diameter of > 406,4 mm, of iron or steel, longitudinally welded (excl. products of a kind used for oil or gas pipelines or of a kind used in drilling for oil or gas)', '7305 31 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(497, 'Tubes and pipes having circular cross-sections and an external diameter of > 406,4 mm, of iron or steel, welded (excl. products longitudinally welded or of a kind used for oil or gas pipelines or of a kind used in drilling for oil or gas)', '7305 39 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(498, 'Tubes and pipes having circular cross-sections and an external diameter of > 406,4 mm, of flat-rolled products of iron or steel, welded (excl. welded products or products of a kind used for oil or gas pipelines or of a kind used in drilling for oil or gas', '7305 90 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(499, 'Tubes, pipes and hollow profiles \"e.g., open seam or welded, riveted or similarly closed\", of iron or steel (excl. of cast iron, seamless tubes and pipes and tubes having internal and external circular cross-sections and an external diameter of > 406,4 mm', '7306', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(500, 'Line pipe of a kind used for oil or gas pipelines, welded, of flat-rolled products of stainless steel, of an external diameter of <= 406,4 mm', '7306 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(501, 'Line pipe of a kind used for oil or gas pipelines, welded, of flat-rolled products of iron or steel, of an external diameter of <= 406,4 mm (excl. products of stainless steel or of cast iron)', '7306 19 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(502, 'Casing and tubing of a kind used in drilling for oil or gas, welded, of flat-rolled products of stainless steel, of an external diameter of <= 406,4 mm', '7306 21 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(503, 'Casing and tubing of a kind used in drilling for oil or gas, welded, of flat-rolled products of iron or steel, of an external diameter of <= 406,4 mm (excl. products of stainless steel or of cast iron)', '7306 29 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(504, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of iron or non-alloy steel (excl. products having internal and external circular cross-sections and an external diameter of > 406,4 mm, or line pipe of a kind used for oil or gas pipelin', '7306 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(505, 'Precision tubes, welded, of circular cross-section, of iron or non-alloy steel, cold-drawn or cold-rolled \"cold-reduced\"', '7306 30 12', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(506, 'Precision tubes, welded, of circular cross-section, of iron or non-alloy steel (excl. cold-drawn or cold-rolled)', '7306 30 18', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(507, 'Threaded or threadable tubes \"gas pipe\", welded, of circular cross-section, of iron or non-alloy steel, plated or coated with zinc', '7306 30 41', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(508, 'Threaded or threadable tubes \"gas pipe\", welded, of circular cross-section, of iron or non-alloy steel (excl. products plated or coated with zinc)', '7306 30 49', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(509, 'Other tubes, pipes and hollow profiles, welded, of circular cross-section, of iron or non-alloy steel, of an external diameter of <= 168,3 mm, plated or coated with zinc (excl. line pipe of a kind used for oil or gas pipelines or casing and tubingof a kin', '7306 30 72', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(510, 'Other tubes, pipes and hollow profiles, welded, of circular cross-section, of iron or non-alloy steel of an external diameter of <= 168,3 mm (excl. plated or coated with zinc and line pipe of a kind used for oil or gas pipelines, casing and tubing of a ki', '7306 30 77', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(511, 'Tubes, pipes and hollow profiles, welded, having a circular cross-section, of iron or steel, of an external diameter of > 168,3 mm but <= 406,4 mm (excl. line pipe of a kind used for oil or gas pipelines or casing and tubing of a kind used in drilling for', '7306 30 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(512, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of stainless steel (excl. products having internal and external circular cross-sections and an external diameter of > 406,4 mm, and products of a kind used for oil or gas pipelines or of', '7306 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(513, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of stainless steel, cold-drawn or cold-rolled \"cold-reduced\" (excl. products having internal and external circular cross-sections and an external diameter of > 406,4 mm, and line pipe of', '7306 40 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(514, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of stainless steel (excl. products cold-drawn or cold-rolled \"cold-reduced\", tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, ', '7306 40 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(515, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of alloy steel other than stainless (excl. tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, and line pipe of a kind used for o', '7306 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(516, 'Precision steel tubes, welded, of circular cross-section, of alloy steel other than stainless, cold-drawn or cold-rolled \"cold-reduced\"', '7306 50 21', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(517, 'Precision steel tubes, welded, of circular cross-section, of alloy steel other than stainless (excl. cold-drawn or cold-rolled)', '7306 50 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(518, 'Tubes, pipes and hollow profiles, welded, of circular cross-section, of alloy steel other than stainless (excl. tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, and line pipe of a kind used for o', '7306 50 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(519, 'Tubes and pipes and hollow profiles, welded, of square or rectangular cross-section, of iron or steel', '7306 61', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(520, 'Tubes and pipes and hollow profiles, welded, of square or rectangular cross-section, of stainless steel', '7306 61 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(521, 'Tubes and pipes and hollow profiles, welded, of square or rectangular cross-section, of iron or steel other than stainless steel, with a wall thickness of <= 2 mm', '7306 61 92', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(522, 'Tubes and pipes and hollow profiles, welded, of square or rectangular cross-section, of iron or steel other than stainless steel, with a wall thickness of > 2 mm', '7306 61 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(523, 'Tubes, pipes and hollow profiles, welded, of non-circular cross-section, of iron or steel (excl. tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, line pipe of a kind used for oil or gas pipelines', '7306 69', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(524, 'Tubes, pipes and hollow profiles, welded, of non-circular cross-section, of stainless steel (excl. tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, line pipe of a kind used for oil or gas pipelin', '7306 69 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(525, 'Tubes, pipes and hollow profiles, welded, of non-circular cross-section, of iron or steel other than stainless steel (excl. tubes and pipes having internal and external circular cross-sections and an external diameter of > 406,4 mm, line pipe of a kind us', '7306 69 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(526, 'Tubes, pipes and hollow profiles \"e.g., open seam, riveted or similarly closed\", of iron or steel (excl. of cast iron, seamless or welded tubes and pipes and tubes and pipes having internal and external circular cross-sections and an external diameter of ', '7306 90 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(527, 'Tube or pipe fittings \"e.g. couplings, elbows, sleeves\", of iron or steel', '7307', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(528, 'Tube or pipe fittings of non-malleable cast iron', '7307 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(529, 'Tube or pipe fittings of non-malleable cast iron, of a kind used in pressure systems', '7307 11 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(530, 'Tube or pipe fittings of non-malleable cast iron (excl. products of a kind used in pressure systems)', '7307 11 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(531, 'Cast tube or pipe fittings of iron or steel (excl. products of non-malleable cast iron)', '7307 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(532, 'Tube or pipe fittings of cast iron (excl. of non-malleable)', '7307 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(533, 'Cast tube or pipe fittings of steel', '7307 19 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(534, 'Flanges of stainless steel (excl. cast products)', '7307 21 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(535, 'Threaded elbows, bends and sleeves of stainless steel (excl. cast products)', '7307 22', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(536, 'Sleeves, of stainless steel, threaded (excl. cast products)', '7307 22 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(537, 'Elbows and bends, of stainless steel, threaded (excl. cast products)', '7307 22 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(538, 'Butt welding tube or pipe fittings of stainless steel (excl. cast products)', '7307 23', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(539, 'Butt welding elbows and bends of stainless steel (excl. cast products)', '7307 23 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(540, 'Butt welding tube or pipe fittings of stainless steel (excl. cast products and elbows and bends)', '7307 23 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(541, 'Tube or pipe fittings of stainless steel (excl. cast products, flanges, threaded elbows, bends and sleeves and butt weldings fittings)', '7307 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(542, 'Threaded tube or pipe fittings of stainless steel (excl. cast products, flanges, elbows, bends and sleeves)', '7307 29 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(543, 'Tube or pipe fittings of stainless steel (excl. cast, threaded, butt welding fittings and flanges)', '7307 29 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(544, 'Flanges of iron or steel (excl. cast or stainless products)', '7307 91 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(545, 'Threaded elbows, bends and sleeves, of stainless steel (excl. cast or stainless products)', '7307 92', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(546, 'Sleeves of iron or steel, threaded (excl. cast or of stainless steel)', '7307 92 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(547, 'Elbows and bends, of iron or steel, threaded (excl. cast or of stainless steel)', '7307 92 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(548, 'Butt welding fittings of iron or steel (excl. cast iron or stainless steel products, and flanges)', '7307 93', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(549, 'Butt welding elbows and bends, of iron or steel, with greatest external diameter <= 609,6 mm (excl. cast iron or stainless steel products)', '7307 93 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(550, 'Butt welding fittings of iron or steel, with greatest external diameter <= 609,6 mm (excl. cast iron or stainless steel products, elbows, bends and flanges)', '7307 93 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(551, 'Butt welding elbows and bends, of iron or steel, with greatest external diameter > 609,6 mm (excl. cast iron or stainless steel products)', '7307 93 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(552, 'Butt welding fittings of iron or steel, with greatest external diameter > 609,6 mm (excl. cast iron or stainless steel products, elbows, bends and flanges)', '7307 93 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(553, 'Tube or pipe fittings, of iron or steel (excl. cast iron or stainless steel products; flanges; threaded elbows, bends and sleeves; butt welding fittings)', '7307 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(554, 'Threaded tube or pipe fittings, of iron or steel (excl. cast iron or stainless steel products, flanges, elbows, bends and sleeves)', '7307 99 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(555, 'Tube or pipe fittings, of iron or steel (excl. of cast iron or stainless steel, threaded, butt welding fittings, and flanges)', '7307 99 80', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(556, 'Structures and parts of structures \"e.g., bridges and bridge-sections, lock-gates, towers, lattice masts, roofs, roofing frameworks, doors and windows and their frames and thresholds for doors, shutters, balustrades, pillars and columns\", of iron or steel', '7308', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(557, 'Bridges and bridge-sections, of iron or steel', '7308 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(558, 'Towers and lattice masts, of iron or steel', '7308 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(559, 'Doors, windows and their frames and thresholds for doors, of iron or steel', '7308 30 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(560, 'Equipment for scaffolding, shuttering, propping or pit-propping (excl. composite sheetpiling products and formwork panels for poured-in-place concrete, which have the characteristics of moulds)', '7308 40 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(561, 'Structures and parts of structures, of iron or steel, n.e.s. (excl. bridges and bridge-sections, towers and lattice masts, doors and windows and their frames, thresholds for doors, props and similar equipment for scaffolding, shuttering, propping or pit-p', '7308 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(562, 'Panels comprising two walls of profiled \"ribbed\" sheet, of iron or steel, with an insulating core', '7308 90 51', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(563, 'Structures and parts of structures, of iron or steel, solely or principally of sheet, n.e.s. (excl. doors and windows and their frames, and panels comprising two walls of profiled \"ribbed\" sheet, of iron or steel, with an insulating core)', '7308 90 59', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(564, 'Structures and parts of structures of iron or steel, n.e.s. (excl. bridges and bridge-sections; towers; lattice masts; doors, windows and their frames and thresholds; equipment for scaffolding, shuttering, propping or pit-propping, and products made princ', '7308 90 98', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(565, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for any material \"other than compressed or liquefied gas\", of a capacity of > 300 l, not fitted with mechanical or thermal equipment, whether or not lined or heat-insulated (excl. container', '7309 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(566, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for gases other than compressed or liquefied gas, of a capacity of > 300 l (excl. containers fitted with mechanical or thermal equipment and containers specifically constructed or equipped ', '7309 00 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(567, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for liquids, lined or heat-insulated and of a capacity of > 300 l (excl. containers fitted with mechanical or thermal equipment and containers specifically constructed or equipped for one o', '7309 00 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(568, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for liquids, of a capacity of > 100.000 l (excl. containers lined or heat-insulated or fitted with mechanical or thermal equipment and containers specifically constructed or equipped for on', '7309 00 51', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(569, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for liquids, of a capacity of <= 100.000 l but > 300 l (excl. containers lined or heat-insulated or fitted with mechanical or thermal equipment and containers specifically constructed or eq', '7309 00 59', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(570, 'Reservoirs, tanks, vats and similar containers, of iron or steel, for solids, of a capacity of > 300 l (excl. containers lined or heat-insulated or fitted with mechanical or thermal equipment and containers specifically constructed or equipped for one or ', '7309 00 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(571, 'Tanks, casks, drums, cans, boxes and similar containers, of iron or steel, for any material \"other than compressed or liquefied gas\", of a capacity of <= 300 l, not fitted with mechanical or thermal equipment, whether or not lined or heat-insulated, n.e.s', '7310', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(572, 'Tanks, casks, drums, cans, boxes and similar containers, of iron or steel, for any material, of a capacity of >= 50 l but <= 300 l, n.e.s. (excl. containers for compressed or liquefied gas, or containers fitted with mechanical or thermal equipment)', '7310 10 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(573, 'Cans of iron or steel, of a capacity of < 50 l, which are to be closed by soldering or crimping (excl. containers for compressed or liquefied gas)', '7310 21', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(574, 'Cans of iron or steel, of a capacity of < 50 l, which are to be closed by soldering or crimping, of a kind used for preserving food', '7310 21 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(575, 'Cans of iron or steel, of a capacity of < 50 l, which are to be closed by soldering or crimping, of a kind used for preserving drink', '7310 21 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(576, 'Cans of iron or steel, of a capacity of < 50 l, which are to be closed by soldering or crimping, of a wall thickness of < 0,5 mm (excl. cans for compressed or liquefied gas, and cans of a kind used for preserving food and drink)', '7310 21 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(577, 'Cans of iron or steel, of a capacity of < 50 l, which are to be closed by soldering or crimping, of a wall thickness of >= 0,5 mm (excl. cans for compressed or liquefied gas, and cans of a kind used for preserving food and drink)', '7310 21 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(578, 'Tanks, casks, drums, cans, boxes and similar containers, of iron or steel, for any material, of a capacity of < 50 l, n.e.s. (excl. containers for compressed or liquefied gas, or containers fitted with mechanical or thermal equipment, and cans which are t', '7310 29', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(579, 'Tanks, casks, drums, cans, boxes and similar containers, of iron or steel, for any material, of a capacity of < 50 l and of a wall thickness of < 0,5 mm, n.e.s. (excl. containers for compressed or liquefied gas, or containers fitted with mechanical or the', '7310 29 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(580, 'Tanks, casks, drums, cans, boxes and similar containers, of iron or steel, for any material, of a capacity of < 50 l and of a wall thickness of >= 0,5 mm, n.e.s. (excl. containers for compressed or liquefied gas, or containers fitted with mechanical or th', '7310 29 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(581, 'Containers of iron or steel, for compressed or liquefied gas (excl. containers specifically constructed or equipped for one or more types of transport)', '7311 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(582, 'Containers of iron or steel, seamless, for compressed or liquefied gas, for a pressure >= 165 bar, of a capacity < 20 l (excl. containers specifically constructed or equipped for one or more types of transport)', '7311 00 11', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(583, 'Containers of iron or steel, seamless, for compressed or liquefied gas, for a pressure >= 165 bar, of a capacity >= 20 l to <= 50 l (excl. containers specifically constructed or equipped for one or more types of transport)', '7311 00 13', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(584, 'Containers of iron or steel, seamless, for compressed or liquefied gas, for a pressure >= 165 bar, of a capacity > 50 l (excl. containers specifically constructed or equipped for one or more types of transport)', '7311 00 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(585, 'Containers of iron or steel, seamless, for compressed or liquefied gas, for a pressure < 165 bar (excl. containers specifically constructed or equipped for one or more types of transport)', '7311 00 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(586, 'Containers of iron or steel, seamless, for compressed or liquefied gas, of a capacity of < 1.000 l (excl. seamless containers and containers specifically constructed or equipped for one or more types of transport)', '7311 00 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(587, 'Containers of iron or steel, seamless, for compressed or liquefied gas, of a capacity of >= 1.000 l (excl. seamless containers and containers specifically constructed or equipped for one or more types of transport)', '7311 00 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(588, 'Screws, bolts, nuts, coach screws, screw hooks, rivets, cotters, cotter pins, washers, incl. spring washers, and similar articles, of iron or steel (excl. lag screws, stoppers, plugs and the like, threaded)', '7318', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(589, 'Coach screws of iron or steel', '7318 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(590, 'Wood screws of iron or steel (excl. coach screws)', '7318 12', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(591, 'Wood screws of stainless steel (excl. coach screws)', '7318 12 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(592, 'Wood screws of iron or steel other than stainless (excl. coach screws)', '7318 12 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(593, 'Screw hooks and screw rings, of iron or steel', '7318 13 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(594, 'Self-tapping screws, of iron or steel (excl. wood screws)', '7318 14', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(595, 'Self-tapping screws, of stainless steel (excl. wood screws)', '7318 14 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(596, 'Spaced-thread screws of iron or steel other than stainless', '7318 14 91', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(597, 'Self-tapping screws of iron or steel other than stainless (excl. spaced-thread screws and wood screws)', '7318 14 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(598, 'Threaded screws and bolts, of iron or steel, whether or not with their nuts and washers (excl. coach screws and other wood screws, screw hooks and screw rings, self-tapping screws, lag screws, stoppers, plugs and the like, threaded)', '7318 15', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(599, 'Screws and bolts, of iron or steel \"whether or not with their nuts and washers\", for fixing railway track construction material (excl. coach screws)', '7318 15 20', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(600, 'Screws and bolts, of stainless steel \"whether or not with their nuts and washers\", without heads (excl. screws and bolts for fixing railway track construction material)', '7318 15 35', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(601, 'Screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\", without heads, with a tensile strength of < 800 MPa (excl. screws and bolts for fixing railway track construction material)', '7318 15 42', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(602, 'Screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\", without heads, with a tensile strength of >= 800 MPa (excl. screws and bolts for fixing railway track construction material)', '7318 15 48', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(603, 'Screws and bolts, of stainless steel \"whether or not with their nuts and washers\", with slotted or cross-recessed heads (excl. wood screws and self-tapping screws)', '7318 15 52', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(604, 'Screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\", with slotted or cross-recessed heads (excl. wood screws and self-tapping screws)', '7318 15 58', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(605, 'Hexagonal-socket head screws and bolts, of stainless steel \"whether or not with their nuts and washers\" (excl. wood screws, self-tapping screws and screws and bolts for fixing railway track construction material)', '7318 15 62', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(606, 'Hexagonal-socket head screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\" (excl. wood screws, self-tapping screws and screws and bolts for fixing railway track construction material)', '7318 15 68', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(607, 'Hexagon screws and bolts, of stainless steel \"whether or not with their nuts and washers\" (excl. with socket head, wood screws, self-tapping screws and screws and bolts for fixing railway track construction material)', '7318 15 75', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(608, 'Hexagon screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\", with a tensile strength of < 800 MPa (excl. with socket head, wood screws, self-tapping screws and screws and bolts for fixing railway track cons', '7318 15 82', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(609, 'Hexagon screws and bolts, of iron or steel other than stainless \"whether or not with their nuts and washers\", with a tensile strength of => 800 MPa (excl. with socket head, wood screws, self-tapping screws and screws and bolts for fixing railway track con', '7318 15 88', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(610, 'Screws and bolts, of iron or steel \"whether or not with their nuts and washers\", with heads (excl. with slotted, cross-recessed or hexagonal head; wood screws, self-tapping screws and screws and bolts for fixing railway track construction material, screw ', '7318 15 95', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(611, 'Nuts of iron or steel', '7318 16', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(612, 'Blind rivet nuts of stainless steel', '7318 16 31', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(613, 'Nuts of stainless steel (excl. blind rivet nuts)', '7318 16 39', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(614, 'Blind rivet nuts of iron or steel other than stainless', '7318 16 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(615, 'Self-locking nuts of iron or steel other than stainless', '7318 16 60', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(616, 'Nuts of iron or steel other than stainless, with an inside diameter <= 12 mm (excl. blind rivet nuts and self-locking nuts)', '7318 16 92', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(617, 'Nuts of iron or steel other than stainless, with an inside diameter > 12 mm (excl. blind rivet nuts and self-locking nuts)', '7318 16 99', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(618, 'Threaded articles, of iron or steel, n.e.s.', '7318 19 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(619, 'Spring washers and other lock washers, of iron or steel', '7318 21 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(620, 'Washers of iron or steel (excl. spring washers and other lock washers)', '7318 22 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(621, 'Rivets of iron or steel (excl. tubular and bifurcated rivets for particular uses)', '7318 23 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(622, 'Cotters and cotter pins, of iron or steel', '7318 24 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(623, 'Non-threaded articles, of iron or steel', '7318 29 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(624, 'Articles of iron or steel, n.e.s. (excl. cast articles)', '7326', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(625, 'Grinding balls and similar articles for mills, of iron or steel, forged or stamped, but not further worked', '7326 11 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(626, 'Articles of iron or steel, forged or stamped, but not further worked, n.e.s. (excl. grinding balls and similar articles for mills)', '7326 19', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(627, 'Articles of iron or steel, open-die forged, but not further worked, n.e.s. (excl. grinding balls and similar articles for mills)', '7326 19 10', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(628, 'Articles of iron or steel, closed-die forged or stamped, but not further worked, n.e.s. (excl. grinding balls and similar articles for mills)', '7326 19 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(629, 'Articles of iron or steel wire, n.e.s.', '7326 20 00', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(630, 'Articles of iron or steel, n.e.s. (excl. cast articles or articles of iron or steel wire)', '7326 90', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(631, 'Ladders and steps, of iron or steel', '7326 90 30', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(632, 'Pallets and similar platforms for handling goods, of iron or steel', '7326 90 40', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(633, 'Reels for cables, piping and the like, of iron or steel', '7326 90 50', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(634, 'Ventilators, non-mechanical, guttering, hooks and like articles used in the building industry, n.e.s., of iron or steel', '7326 90 60', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(635, 'Articles of iron or steel, open-die forged, n.e.s.', '7326 90 92', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(636, 'Articles of iron or steel, closed-die forged, n.e.s.', '7326 90 94', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(637, 'Sintered articles of iron or steel, n.e.s.', '7326 90 96', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(638, 'Articles of iron or steel, n.e.s.', '7326 90 98', 7, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(639, 'Iron and non-alloy steel in ingots or other primary forms (excl. remelting scrap ingots, products obtained by continuous casting and iron of heading 7203)', '7206', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(640, 'Ingots, of iron and non-alloy steel (excl. remelted scrap ingots, continuous cast products, iron of heading 7203)', '7206 10 00', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(641, 'Iron and non-alloy steel, in puddled bars or other primary forms (excl. ingots, remelted scrap ingots, continuous cast products, iron of heading 7203)', '7206 90 00', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(642, 'Semi-finished products of iron or non-alloy steel', '7207', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(643, 'Semi-finished products of iron or non-alloy steel containing, by weight, < 0,25% of carbon, of square or rectangular cross-section, the width measuring < twice the thickness', '7207 11', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(644, 'Semi-finished products, of non-alloy free-cutting steel, containing by weight < 0,25% carbon, of square or rectangular cross-section, the width < twice the thickness, rolled or obtained by continuous casting', '7207 11 11', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(645, 'Semi-finished products, of iron or non-alloy steel, containing by weight < 0,25% carbon, of square or rectangular cross-section, the width < twice the thickness of <= 130 mm, rolled or obtained by continuous casting (excl. free-cutting steel)', '7207 11 14', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38');
INSERT INTO `cn_codes` (`cn_id`, `name`, `cn_code`, `goods_category_id`, `created_at`, `updated_at`) VALUES
(646, 'Semi-finished products, of iron or non-alloy steel, containing by weight < 0,25% carbon, of square or rectangular cross-section, the width < twice the thickness of > 130 mm, rolled or obtained by continuous casting (excl. free-cutting steel)', '7207 11 16', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(647, 'Semi-finished products of iron or non-alloy steel, containing by weight < 0,25% carbon, of rectangular cross-section, the width < twice the thickness, forged', '7207 11 90', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(648, 'Semi-finished products of iron or non-alloy steel containing, by weight, < 0,25% of carbon, of rectangular \"other than square\" cross-section, the width measuring >= twice the thickness', '7207 12', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(649, 'Semi-finished products of iron or non-alloy steel, containing by weight < 0,25 of carbon, of rectangular \"other than square\" cross-section, the width measuring >= twice the thickness, rolled or obtained by continuous casting', '7207 12 10', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(650, 'Semi-finished products of iron or non-alloy steel, containing by weight < 0,25% carbon, of rectangular \"other than square\" cross-section, the width >= twice the thickness, forged', '7207 12 90', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(651, 'Semi-finished products of iron or non-alloy steel containing, by weight, < 0,25% of carbon, of circular cross-section, or of a cross-section other than square or rectangular', '7207 19', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(652, 'Semi-finished products, of iron or non-alloy steel, containing by weight < 0,25% carbon, of circular or polygonal cross-section, rolled or obtained by continuous casting', '7207 19 12', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(653, 'Semi-finished products of iron or non-alloy steel, containing by weight < 0,25% carbon, of circular or polygonal cross-section, forged', '7207 19 19', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(654, 'Semi-finished products of iron or non-alloy steel, containing by weight < 0,25% carbon (excl. semi-products, of square, rectangular, circular or polygonal cross-section)', '7207 19 80', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(655, 'Semi-finished products of iron or non-alloy steel containing, by weight, >= 0,25% of carbon', '7207 20', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(656, 'Semi-finished products, of non-alloy free-cutting steel, containing by weight >= 0,25% carbon, of square or rectangular cross-section, the width < twice the thickness, rolled or obtained by continuous casting', '7207 20 11', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(657, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25% but < 0,6% carbon, of square or rectangular cross-section, the width < twice the thickness, rolled or obtained by continuous casting (excl. free-cutting steel)', '7207 20 15', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(658, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,6% carbon, of square or rectangular cross-section, the width < twice the thickness, rolled or obtained by continuous casting (excl. free-cutting steel)', '7207 20 17', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(659, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25% carbon, of square or rectangular cross-section, the width < twice the thickness, forged', '7207 20 19', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(660, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25 of carbon, of rectangular \"other than square\" cross-section, the width measuring >= twice the thickness, rolled or obtained by continuous casting', '7207 20 32', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(661, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25% carbon, of rectangular \"other than square\" cross-section and the width >= twice the thickness, forged', '7207 20 39', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(662, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25% carbon, of circular or polygonal cross-section, rolled or obtained by continuous casting', '7207 20 52', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(663, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,6% carbon, of circular or polygonal cross-section, forged', '7207 20 59', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(664, 'Semi-finished products of iron or non-alloy steel, containing by weight >= 0,25% carbon (excl. those of square, rectangular, circular or polygonal cross-section)', '7207 20 80', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(665, 'Stainless steel in ingots or other primary forms (excl. remelting scrap ingots and products obtained by continuous casting); semi-finished products of stainless steel', '7218', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(666, 'Steel, stainless, in ingots and other primary forms (excl. waste and scrap in ingot form, and products obtained by continuous casting)', '7218 10 00', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(667, 'Semi-finished products of stainless steel, of rectangular \"other than square\" cross-section', '7218 91', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(668, 'Semi-finished products of stainless steel, of rectangular \"other than square\" cross-section, containing by weight >= 2,5% nickel', '7218 91 10', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(669, 'Semi-finished products of stainless steel, of rectangular \"other than square\" cross-section, containing by weight < 2,5 nickel', '7218 91 80', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(670, 'Semi-finished products of stainless steel (excl. of rectangular [other than square] cross-section)', '7218 99', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(671, 'Semi-finished products of stainless steel, of square cross-section, rolled or obtained by continuous casting', '7218 99 11', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(672, 'Semi-finished products of stainless steel, of square cross-section, forged', '7218 99 19', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(673, 'Semi-finished products of stainless steel, of circular cross-section or of cross-section other than square or rectangular, rolled or obtained by continuous casting', '7218 99 20', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(674, 'Semi-finished products of stainless steel, forged (excl. products of square or rectangular cross-section)', '7218 99 80', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(675, 'Steel, alloy, other than stainless, in ingots or other primary forms, semi-finished products of alloy steel other than stainless (excl. waste and scrap in ingot form, and products obtained by continuous casting)', '7224', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(676, 'Steel, alloy, other than stainless, in ingots or other primary forms (excl. waste and scrap in ingot form, and products obtained by continuous casting)', '7224 10', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(677, 'Ingots and other primary forms, of tool steel', '7224 10 10', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(678, 'Steel, alloy, other than stainless, in ingots or other primary forms (excl. of tool steel, waste and scrap in ingot form and products obtained by continuous casting)', '7224 10 90', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(679, 'Semi-finished products of alloy steel other than stainless', '7224 90', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(680, 'Semi-finished products of tool steel', '7224 90 02', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(681, 'Semi-finished products of high-speed steel, of square or rectangular cross-section, hot-rolled or obtained by continuous casting the width measuring < twice the thickness', '7224 90 03', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(682, 'Semi-finished products of steel containing by weight <= 0,7% of carbon, 0,5% to 1,2% of manganese, 0,6% to 2,3% of silicon, or of steel containing by weight >= 0,0008% of boron with any other element < the minimum content referred to in Note 1 f to chapte', '7224 90 05', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(683, 'Semi-finished products of alloy steel other than stainless steel, of square or rectangular cross-section, hot-rolled or obtained by continuous casting, the width measuring < twice the thickness (excl. of tool steel, high-speed steel and articles of subhea', '7224 90 07', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(684, 'Semi-finished products of alloy steel other than stainless steel, of square or rectangular cross-section, hot-rolled or obtained by continuous casting, the width measuring >= twice the thickness (excl. of tool steel)', '7224 90 14', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(685, 'Semi-finished products of alloy steel other than stainless steel, of square or rectangular cross-section, forged (excl. of tool steel)', '7224 90 18', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(686, 'Semi-finished products of steel containing by weight 0,9% to 1,15% carbon, 0,5% to 2% of chromium and, if present, <= 0,5% of molybdenum, cut into shapes other than square or rectangular, hot-rolled or obtained by continuous casting', '7224 90 31', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(687, 'Semi-finished products of alloy steel, other than stainless steel, cut into shapes other than square or rectangular, hot-rolled or obtained by continuous casting (excl. of tool steel and products containing by weight 0,9% to 1,15% of carbon, 0,5% to 2% of', '7224 90 38', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(688, 'Semi-finished products of alloy steel, other than stainless steel, forged (excl. of tool steel and products of square or rectangular, circular or polygamol cross-section)', '7224 90 90', 8, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(689, 'Ferrous products obtained by direct reduction of iron ore and other spongy ferrous products, in lumps, pellets or similar forms; iron having a minimum purity by weight of 99,94%, in lumps, pellets or similar forms', '7203', 9, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(690, 'Ferrous products obtained by direct reduction of iron ore, in lumps, pellets or similar forms', '7203 10 00', 9, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(691, 'Spongy ferrous products, obtained from molten pig iron by atomisation, iron of a purity of >= 99,94%, in lumps, pellets or similar forms', '7203 90 00', 9, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(692, 'Pig iron and spiegeleisen, in pigs, blocks or other primary forms', '7201', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(693, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing, by weight, <= 0,5% of phosphorous', '7201 10', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(694, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing by weight <= 0,5% phosphorus, >= 0,4% manganese and <= 1% silicon', '7201 10 11', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(695, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing by weight <= 0,5% phosphorus, >= 0,4% manganese and > 1% silicon', '7201 10 19', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(696, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing by weight <= 0,5% phosphorus, and >= 0,1% but < 0,4% manganese', '7201 10 30', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(697, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing by weight <= 0,5% phosphorus, and <= 0,1% manganese', '7201 10 90', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(698, 'Non-alloy pig iron in pigs, blocks or other primary forms, containing by weight >= 0,5% phosphorus', '7201 20 00', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(699, 'Alloy pig iron and spiegeleisen, in pigs, blocks or other primary forms', '7201 50', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(700, 'Alloy pig iron in pigs, blocks or other primary forms, containing by weight >= 0,3% but <= 1% titanium and >= 0,5% but <= 1% vanadium', '7201 50 10', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(701, 'Alloy pig iron and spiegeleisen, in pigs, blocks or other primary forms (excl. alloy iron containing, by weight, >= 0,3% but <= 1% titanium and >= 0,5% but <= 1% vanadium)', '7201 50 90', 10, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(702, 'Ferro-manganese, containing by weight > 2% of carbon', '7202 11', 11, '2025-06-19 11:02:38', '2025-06-19 11:02:38'),
(703, 'Ferro-manganese, containing by weight > 2% carbon, with a granulometry <= 5 mm and a manganese content by weight > 65%', '7202 11 20', 12, '2025-06-19 11:02:38', '2025-06-19 11:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `abbreviation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `abbreviation`) VALUES
(1, 'Andorra', 'AD'),
(2, 'United Arab Emirates', 'AE'),
(3, 'Afghanistan', 'AF'),
(4, 'Antigua and Barbuda', 'AG'),
(5, 'Anguilla', 'AI'),
(6, 'Albania', 'AL'),
(7, 'Armenia', 'AM'),
(8, 'Netherlands Antilles', 'AN'),
(9, 'Angola', 'AO'),
(10, 'Aruban Florin', 'AQ'),
(11, 'Argentina', 'AR'),
(12, 'American Samoa', 'AS'),
(13, 'Austria', 'AT'),
(14, 'Australia', 'AU'),
(15, 'Aruba', 'AW'),
(16, 'ÅLAND ISLANDS', 'AX'),
(17, 'Azerbaijan', 'AZ'),
(18, 'Bosnia and Herzegovina', 'BA'),
(19, 'Barbados', 'BB'),
(20, 'Bangladesh', 'BD'),
(21, 'Belgium', 'BE'),
(22, 'Burkina Faso', 'BF'),
(23, 'Bulgaria', 'BG'),
(24, 'Bahrain', 'BH'),
(25, 'Burundi', 'BI'),
(26, 'Benin', 'BJ'),
(27, 'Saint Barthélemy', 'BL'),
(28, 'Bermuda', 'BM'),
(29, 'Brunei Darussalam', 'BN'),
(30, 'Bolivia, Plurinational State of', 'BO'),
(31, 'Bonaire, Sint Eustatius and Saba', 'BQ'),
(32, 'Brazil', 'BR'),
(33, 'Bahamas', 'BS'),
(34, 'Bhutan', 'BT'),
(35, 'Bouvet Island', 'BV'),
(36, 'Botswana', 'BW'),
(37, 'Belarus', 'BY'),
(38, 'Belize', 'BZ'),
(39, 'Canada', 'CA'),
(40, 'Cocos Islands (or Keeling Islands)', 'CC'),
(41, 'Congo, Democratic Republic of', 'CD'),
(42, 'Central African Republic', 'CF'),
(43, 'Congo', 'CG'),
(44, 'Switzerland', 'CH'),
(45, 'Côte d\'Ivoire', 'CI'),
(46, 'Cook Islands', 'CK'),
(47, 'Chile', 'CL'),
(48, 'Cameroon', 'CM'),
(49, 'China', 'CN'),
(50, 'Colombia', 'CO'),
(51, 'Costa Rica', 'CR'),
(52, 'Cuba', 'CU'),
(53, 'Cape Verde', 'CV'),
(54, 'Curaçao', 'CW'),
(55, 'Christmas Island', 'CX'),
(56, 'Cyprus', 'CY'),
(57, 'Czechia', 'CZ'),
(58, 'Germany', 'DE'),
(59, 'Djibouti', 'DJ'),
(60, 'Denmark', 'DK'),
(61, 'Dominica', 'DM'),
(62, 'Dominican Republic', 'DO'),
(63, 'Algeria', 'DZ'),
(64, 'Ecuador', 'EC'),
(65, 'Estonia', 'EE'),
(66, 'Egypt', 'EG'),
(67, 'Western Sahara', 'EH'),
(68, 'Eritrea', 'ER'),
(69, 'Spain', 'ES'),
(70, 'Ethiopia', 'ET'),
(71, 'European Community', 'EU'),
(72, 'Finland', 'FI'),
(73, 'Fiji', 'FJ'),
(74, 'Falkland Islands', 'FK'),
(75, 'Micronesia, Federated States of', 'FM'),
(76, 'Faroe Islands', 'FO'),
(77, 'France', 'FR'),
(78, 'Gabon', 'GA'),
(79, 'United Kingdom', 'GB'),
(80, 'Grenada', 'GD'),
(81, 'Georgia', 'GE'),
(82, 'French Guyana', 'GF'),
(83, 'Guernsey', 'GG'),
(84, 'Ghana', 'GH'),
(85, 'Gibraltar', 'GI'),
(86, 'Greenland', 'GL'),
(87, 'Gambia', 'GM'),
(88, 'Guinea', 'GN'),
(89, 'Guadeloupe', 'GP'),
(90, 'Equatorial Guinea', 'GQ'),
(91, 'Greece', 'GR'),
(92, 'South Georgia and South Sandwich', 'GS'),
(93, 'Guatemala', 'GT'),
(94, 'Guam', 'GU'),
(95, 'Guinea-Bissau', 'GW'),
(96, 'Guyana', 'GY'),
(97, 'Hong Kong', 'HK'),
(98, 'Heard Island and McDonald Islands', 'HM'),
(99, 'Honduras', 'HN'),
(100, 'Croatia', 'HR'),
(101, 'Haiti', 'HT'),
(102, 'Hungary', 'HU'),
(103, 'Indonesia', 'ID'),
(104, 'Ireland', 'IE'),
(105, 'Israel', 'IL'),
(106, 'Isle of Man', 'IM'),
(107, 'India', 'IN'),
(108, 'British Indian Ocean Territory', 'IO'),
(109, 'Iraq', 'IQ'),
(110, 'Iran, Islamic Republic of', 'IR'),
(111, 'Iceland', 'IS'),
(112, 'Italy', 'IT'),
(113, 'Jersey', 'JE'),
(114, 'Jamaica', 'JM'),
(115, 'Jordan', 'JO'),
(116, 'Japan', 'JP'),
(117, 'Kenya', 'KE'),
(118, 'Kyrgyz, Republic', 'KG'),
(119, 'Cambodia', 'KH'),
(120, 'Kiribati', 'KI'),
(121, 'Comoros', 'KM'),
(122, 'St Kitts and Nevis', 'KN'),
(123, 'Korea, Democratic People’s Republ', 'KP'),
(124, 'Korea, Republic of', 'KR'),
(125, 'Kuwait', 'KW'),
(126, 'Cayman Islands', 'KY'),
(127, 'Kazakhstan', 'KZ'),
(128, 'Lao People’s Democratic Republic', 'LA'),
(129, 'Lebanon', 'LB'),
(130, 'St Lucia', 'LC'),
(131, 'Liechtenstein', 'LI'),
(132, 'Sri Lanka', 'LK'),
(133, 'Liberia', 'LR'),
(134, 'Lesotho', 'LS'),
(135, 'Lithuania', 'LT'),
(136, 'Luxembourg', 'LU'),
(137, 'Latvia', 'LV'),
(138, 'Libya', 'LY'),
(139, 'Morocco', 'MA'),
(140, 'Monaco', 'MC'),
(141, 'Moldova, Republic of', 'MD'),
(142, 'Montenegro', 'ME'),
(143, 'Saint Martin (French part)', 'MF'),
(144, 'Madagascar', 'MG'),
(145, 'Marshall Islands', 'MH'),
(146, 'North Macedonia', 'MK'),
(147, 'Mali', 'ML'),
(148, 'Myanmar', 'MM'),
(149, 'Mongolia', 'MN'),
(150, 'Macao', 'MO'),
(151, 'Northern Mariana Islands', 'MP'),
(152, 'Martinique', 'MQ'),
(153, 'Mauritania', 'MR'),
(154, 'Montserrat', 'MS'),
(155, 'Malta', 'MT'),
(156, 'Mauritius', 'MU'),
(157, 'Maldives', 'MV'),
(158, 'Malawi', 'MW'),
(159, 'Mexico', 'MX'),
(160, 'Malaysia', 'MY'),
(161, 'Mozambique', 'MZ'),
(162, 'Namibia', 'NA'),
(163, 'New Caledonia', 'NC'),
(164, 'Niger', 'NE'),
(165, 'Norfolk Island', 'NF'),
(166, 'Nigeria', 'NG'),
(167, 'Nicaragua', 'NI'),
(168, 'Netherlands', 'NL'),
(169, 'Norway', 'NO'),
(170, 'Nepal', 'NP'),
(171, 'Nauru', 'NR'),
(172, 'Niue', 'NU'),
(173, 'New Zealand', 'NZ'),
(174, 'Oman', 'OM'),
(175, 'Panama', 'PA'),
(176, 'Peru', 'PE'),
(177, 'French Polynesia', 'PF'),
(178, 'Papua New Guinea', 'PG'),
(179, 'Philippines', 'PH'),
(180, 'Pakistan', 'PK'),
(181, 'Poland', 'PL'),
(182, 'St Pierre and Miquelon', 'PM'),
(183, 'Pitcairn', 'PN'),
(184, 'Puerto Rico', 'PR'),
(185, 'Occupied Palestinian Territory', 'PS'),
(186, 'Portugal', 'PT'),
(187, 'Palau', 'PW'),
(188, 'Paraguay', 'PY'),
(189, 'Qatar', 'QA'),
(190, 'High seas', 'QP'),
(191, 'Réunion', 'RE'),
(192, 'Romania', 'RO'),
(193, 'Serbia', 'RS'),
(194, 'Russian Federation', 'RU'),
(195, 'Rwanda', 'RW'),
(196, 'Saudi Arabia', 'SA'),
(197, 'Solomon Islands', 'SB'),
(198, 'Seychelles', 'SC'),
(199, 'Sudan', 'SD'),
(200, 'Sweden', 'SE'),
(201, 'Singapore', 'SG'),
(202, 'Saint Helena, Ascension and Tristan', 'SH'),
(203, 'Slovenia', 'SI'),
(204, 'Svalbard and Jan Mayen Islands', 'SJ'),
(205, 'Slovakia', 'SK'),
(206, 'Sierra Leone', 'SL'),
(207, 'San Marino', 'SM'),
(208, 'Senegal', 'SN'),
(209, 'Somalia', 'SO'),
(210, 'Suriname', 'SR'),
(211, 'South Sudan', 'SS'),
(212, 'Sao Tome and Principe', 'ST'),
(213, 'El Salvador', 'SV'),
(214, 'Sint Maarten (Dutch part)', 'SX'),
(215, 'Syrian Arab Republic', 'SY'),
(216, 'Swaziland', 'SZ'),
(217, 'Turks and Caicos Islands', 'TC'),
(218, 'Chad', 'TD'),
(219, 'French Southern Territories', 'TF'),
(220, 'Togo', 'TG'),
(221, 'Thailand', 'TH'),
(222, 'Tajikistan', 'TJ'),
(223, 'Tokelau', 'TK'),
(224, 'Timor-Leste', 'TL'),
(225, 'Turkmenistan', 'TM'),
(226, 'Tunisia', 'TN'),
(227, 'Tonga', 'TO'),
(228, 'East Timor', 'TP'),
(229, 'Türkiye', 'TR'),
(230, 'Trinidad and Tobago', 'TT'),
(231, 'Tuvalu', 'TV'),
(232, 'Taiwan', 'TW'),
(233, 'Tanzania, United Republic of', 'TZ'),
(234, 'Ukraine', 'UA'),
(235, 'Uganda', 'UG'),
(236, 'United States Minor Outlying Island', 'UM'),
(237, 'United States', 'US'),
(238, 'Uruguay', 'UY'),
(239, 'Uzbekistan', 'UZ'),
(240, 'Vatican City', 'VA'),
(241, 'St Vincent', 'VC'),
(242, 'Venezuela', 'VE'),
(243, 'British Virgin Islands', 'VG'),
(244, 'US Virgin Islands', 'VI'),
(245, 'Vietnam', 'VN'),
(246, 'Vanuatu', 'VU'),
(247, 'Wallis and Futuna Islands', 'WF'),
(248, 'Samoa', 'WS'),
(249, 'American Oceania', 'XA'),
(250, 'Ceuta', 'XC'),
(251, 'United Kingdom (Northern Ireland)', 'XI'),
(252, 'Kosovo', 'XK'),
(253, 'Melilla', 'XL'),
(255, 'Australian Oceania', 'XO'),
(256, 'West Bank and Gaza Strip', 'XP'),
(257, 'Polar regions', 'XR'),
(259, 'New Zealand Oceania', 'XZ'),
(260, 'Yemen', 'YE'),
(261, 'Mayotte', 'YT'),
(262, 'Federal Republic of Yugoslavia', 'YU'),
(263, 'South Africa', 'ZA'),
(264, 'Zambia', 'ZM'),
(265, 'Zaire', 'ZR'),
(266, 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `c_emission_energies`
--

CREATE TABLE `c_emission_energies` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `manual_total_indirect_emissions` float DEFAULT NULL,
  `generatl_info_on_data_quality` varchar(255) DEFAULT NULL,
  `justification_for_use_default_values` varchar(255) DEFAULT NULL,
  `info_qty_assurance` varchar(255) DEFAULT NULL,
  `manual_fuel_balance` float DEFAULT NULL,
  `manual_GHG_emissions_balance` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `c_emission_energies`
--

INSERT INTO `c_emission_energies` (`id`, `report_id`, `manual_total_indirect_emissions`, `generatl_info_on_data_quality`, `justification_for_use_default_values`, `info_qty_assurance`, `manual_fuel_balance`, `manual_GHG_emissions_balance`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '10', '10', '10', NULL, NULL, NULL, NULL),
(2, 1, NULL, '50', '50', '10', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `d_processes`
--

CREATE TABLE `d_processes` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `route_1` varchar(255) DEFAULT NULL,
  `route_1_amounts` float DEFAULT NULL,
  `route_2` varchar(255) DEFAULT NULL,
  `route_2_amounts` float DEFAULT NULL,
  `route_3` varchar(255) DEFAULT NULL,
  `route_3_amounts` float DEFAULT NULL,
  `route_4` varchar(255) DEFAULT NULL,
  `route_4_amounts` float DEFAULT NULL,
  `route_5` varchar(255) DEFAULT NULL,
  `route_5_amounts` float DEFAULT NULL,
  `route_6` varchar(255) DEFAULT NULL,
  `route_6_amounts` float DEFAULT NULL,
  `total_consumed_within_installation` float DEFAULT NULL,
  `consumed_in_others_amounts` float DEFAULT NULL,
  `condumed_non_cbam_goods_amounts` float DEFAULT NULL,
  `has_heat` tinyint(1) DEFAULT NULL,
  `has_waste_gases` tinyint(1) DEFAULT NULL,
  `direct_emissions` float DEFAULT NULL,
  `imported_heat_value` float DEFAULT NULL,
  `exported_heat_value` float DEFAULT NULL,
  `ef_imported_heat` float DEFAULT NULL,
  `ef_exported_heat` float DEFAULT NULL,
  `electricity_consumption_value` float DEFAULT NULL,
  `ef_electricity` float DEFAULT NULL,
  `source_of_ef_electricity` varchar(255) DEFAULT NULL,
  `exported_electricity_value` float DEFAULT NULL,
  `ef_exported_electricity` float DEFAULT NULL,
  `total_production_amounts` float NOT NULL,
  `produced_for_market_amount` float NOT NULL,
  `imported_wgases_amount` float NOT NULL,
  `ef_imported_wgases` float NOT NULL,
  `exported_wgases_amount` float NOT NULL,
  `ef_exported_wgases` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ef_units`
--

CREATE TABLE `ef_units` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ef_units`
--

INSERT INTO `ef_units` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'tCO2/TJ', '2025-06-19 11:09:47', '2025-06-19 11:09:47'),
(2, 'tCO2/t ', '2025-06-19 11:09:47', '2025-06-19 11:09:47'),
(3, 'tCO2/1000Nm3', '2025-06-19 11:09:47', '2025-06-19 11:09:47');

-- --------------------------------------------------------

--
-- Table structure for table `emission_methods`
--

CREATE TABLE `emission_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `emission_methods`
--

INSERT INTO `emission_methods` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Combustion', '2025-06-19 11:10:35', '2025-06-19 11:10:35'),
(2, 'Process Emission', '2025-06-19 11:10:35', '2025-06-19 11:10:35'),
(3, 'Mass Balance', '2025-06-19 11:10:35', '2025-06-19 11:10:35');

-- --------------------------------------------------------

--
-- Table structure for table `e_precursors`
--

CREATE TABLE `e_precursors` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `route_1` varchar(255) DEFAULT NULL,
  `route_1_amounts` float DEFAULT NULL,
  `route_2` varchar(255) DEFAULT NULL,
  `route_2_amounts` float DEFAULT NULL,
  `route_3` varchar(255) DEFAULT NULL,
  `route_3_amounts` float DEFAULT NULL,
  `route_4` varchar(255) DEFAULT NULL,
  `route_4_amounts` float DEFAULT NULL,
  `route_5` varchar(255) DEFAULT NULL,
  `route_5_amounts` float DEFAULT NULL,
  `total_consumed_within_installation` float DEFAULT NULL,
  `consumed_in_production_amounts` float DEFAULT NULL,
  `consumed_non_cbam_goods_amounts` float DEFAULT NULL,
  `total_consumed_within_installation_amounts` float DEFAULT NULL,
  `embedded_direct_emissions_value` float DEFAULT NULL,
  `source_embedded_direct_emissions` varchar(255) DEFAULT NULL,
  `embedded_indirection_emissions_value` float DEFAULT NULL,
  `source_embedded_indirect_emissions` varchar(255) DEFAULT NULL,
  `justification_for_use_default_values` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gen_info_data_qlys`
--

CREATE TABLE `gen_info_data_qlys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gen_info_data_qlys`
--

INSERT INTO `gen_info_data_qlys` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Mostly measurements & analyses', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(2, 'Mostly measurements & national standard factors for e.g. the emission factor', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(3, 'Mostly measurements & sector-specific standard factors for e.g. the emission factor', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(4, 'Mostly measurements & international standard factors for e.g. the emission factor', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(5, 'Mostly default values provided by the European Commission', '2025-06-19 11:07:08', '2025-06-19 11:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `goods_categories`
--

CREATE TABLE `goods_categories` (
  `goods_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `routes` varchar(255) DEFAULT NULL,
  `relevant_precursors` varchar(255) DEFAULT NULL,
  `industry_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `goods_categories`
--

INSERT INTO `goods_categories` (`goods_id`, `name`, `routes`, `relevant_precursors`, `industry_type_id`) VALUES
(1, 'Cement  ', 'All production route', 'Cement clinker,Calcined clays', 1),
(2, 'Cement clinker', 'All production route', NULL, 1),
(3, 'Calcined clays', 'All production route', NULL, 1),
(4, 'Aluminous cement', 'All production route', NULL, 1),
(5, 'Aluminium products', 'All production route', 'Unwrought aluminium', 2),
(6, 'Unwrought aluminium', 'Primary (electrolytic) smelting,Secondary melting (recycling),Other production routes,Unknown production routes', NULL, 2),
(7, 'Iron or steel products', 'All production route', 'Crude steel,Direct reduced iron,Pig iron,Alloys (FeMn, FeCr, FeNi),Sintered Ore,Hygrogen', 3),
(8, 'Crude steel', 'Basic oxygen steelmaking,Electric arc furnace,Other production routes,Unknown production routes', 'Direct reduced iron,Pig iron,Alloys (FeMn, FeCr, FeNi),Sintered Ore,Hygrogen', 3),
(9, 'Direct reduced iron', 'Blast furnace route,Smelting reduction,Other production routes,Unknown production routes', 'Hygrogen', 3),
(10, 'Pig iron', 'All production route', 'Alloys (FeMn, FeCr, FeNi),Sintered Ore', 3),
(11, 'Alloys (FeMn, FeCr, FeNi)', 'All production route', 'Sintered Ore', 3),
(12, 'Sintered Ore', 'All production route', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `industry_types`
--

CREATE TABLE `industry_types` (
  `industry_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `industry_types`
--

INSERT INTO `industry_types` (`industry_id`, `name`) VALUES
(1, 'Cement'),
(2, 'Aluminium'),
(3, 'Iron and steel');

-- --------------------------------------------------------

--
-- Table structure for table `info_qty_assurances`
--

CREATE TABLE `info_qty_assurances` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `info_qty_assurances`
--

INSERT INTO `info_qty_assurances` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Third-party verification', '2025-06-19 11:05:48', '2025-06-19 11:05:48'),
(2, 'Internal audits', '2025-06-19 11:05:48', '2025-06-19 11:05:48'),
(3, 'Four eyes principle', '2025-06-19 11:05:48', '2025-06-19 11:05:48'),
(4, 'None', '2025-06-19 11:05:48', '2025-06-19 11:05:48');

-- --------------------------------------------------------

--
-- Table structure for table `installations`
--

CREATE TABLE `installations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_specific` varchar(255) DEFAULT NULL,
  `eco_activity` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `post_code` varchar(50) DEFAULT NULL,
  `po_box` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `author_represent_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `installations`
--

INSERT INTO `installations` (`id`, `name`, `name_specific`, `eco_activity`, `address`, `city`, `country_id`, `post_code`, `po_box`, `latitude`, `longitude`, `author_represent_id`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'A Cement Co., Ltd.					', NULL, 'Cement Production', NULL, 'Saraburi', 221, '18000', '', '14.5285', '100.9103', 1, NULL, NULL, NULL, NULL),
(2, 'ABC Co., Ltd.', NULL, 'Cement Production', NULL, 'Saraburi', 221, '18000', '', '14.5285', '100.9103', 1, 'test@gmail.com', NULL, NULL, NULL),
(3, 'พรนภา ปัญญาดี', 'พรนภา ปัญญาดี', 'บ้าน', '28', 'เมืองเชียงใหม่', 221, '50000', '1111', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', NULL, NULL),
(4, 'เด่', 'เด้', 'เด้', 'เ้', 'เด้', 221, '50000', '1111', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', NULL, NULL),
(5, 'mflv', 'test', 'test', 'test', 'เมืองเชียงใหม่', 221, '50000', '1111', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', NULL, NULL),
(6, 'พรนภา ปัญญาดี', 'พรนภา ปัญญาดี', 'fg', '28', 'เมืองเชียงใหม่', 221, '50000', 'g', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', '2025-06-20 21:54:00', '2025-06-20 21:54:00'),
(9, 'Pornnapa Panyadee', 'Pornnapa Panyadee', 'asrftgdfg', '239, Huay Kaew Road', 'Muang Chiang Mai', 221, '50200', '0001', '18.7857919', '99.0359251', NULL, 'pornnapa200@gmail.com', '053850310', '2025-06-20 22:14:00', '2025-06-20 22:14:00'),
(10, 'พรนภา ปัญญาดี', 'พรนภา ปัญญาดี', 'test', '28', 'เมืองเชียงใหม่', 221, '50000', '1111', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', '2025-06-20 23:42:44', '2025-06-20 23:42:44'),
(12, 'พรนภา ปัญญาดี', 'พรนภา ปัญญาดี', 'test', '28', 'เมืองเชียงใหม่', 10, '50000', '1111', '18.84373', '98.97956', NULL, 'pornnapa200@gmail.com', '0830057417', '2025-06-21 00:01:16', '2025-06-21 00:01:16'),
(16, 'Pornnapa Panyadee', 'Pornnapa Panyadee', 'asrftgdfg', '239, Huay Kaew Road', 'Muang Chiang Mai', 221, '50200', '111', '18.7857919', '99.0359251', NULL, 'pornnapa200@gmail.com', '0830057417', '2025-06-21 00:20:05', '2025-06-21 00:20:05');

-- --------------------------------------------------------

--
-- Table structure for table `just_for_use_data_values`
--

CREATE TABLE `just_for_use_data_values` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `just_for_use_data_values`
--

INSERT INTO `just_for_use_data_values` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Unreasonable costs for more accurate monitoring', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(2, 'Data gaps', '2025-06-19 11:07:08', '2025-06-19 11:07:08'),
(3, 'Other', '2025-06-19 11:07:08', '2025-06-19 11:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `installation_id` int(11) DEFAULT NULL,
  `reporting_period_start` date DEFAULT NULL,
  `reporting_period_end` date DEFAULT NULL,
  `verifier_id` int(11) DEFAULT NULL,
  `industry_type_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `cn_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `installation_id`, `reporting_period_start`, `reporting_period_end`, `verifier_id`, `industry_type_id`, `goods_id`, `cn_id`, `created_at`, `updated_at`, `company_id`) VALUES
(1, 1, '2025-06-23', '2025-06-24', 1, 1, 1, 1, '2025-06-17 21:35:59', '2025-06-17 21:35:59', 1),
(3, 1, '2024-12-31', '2025-12-30', 1, 1, 1, 3, '2025-06-19 03:00:00', '2025-06-19 03:00:00', 1),
(30, 6, NULL, NULL, 3, 1, 2, 4, '2025-06-20 21:48:48', '2025-06-20 21:48:48', 1),
(31, 9, NULL, NULL, 4, 2, 6, 81, '2025-06-20 22:12:40', '2025-06-20 22:12:40', 1),
(33, 10, NULL, NULL, NULL, 1, 2, 4, '2025-06-20 23:42:29', '2025-06-20 23:42:29', 1),
(35, 12, NULL, NULL, NULL, 2, 6, 81, '2025-06-21 00:00:52', '2025-06-21 00:00:52', 1),
(37, 16, '2025-06-20', '2025-06-20', 5, 2, 5, 12, '2025-06-21 00:19:24', '2025-06-21 00:19:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `src_ef_electricitys`
--

CREATE TABLE `src_ef_electricitys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `src_ef_electricitys`
--

INSERT INTO `src_ef_electricitys` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'D.4(a)', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(2, 'D.4(b)', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(3, 'D.4.1', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(4, 'D.4.2', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(5, 'D.4.3.1', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(6, 'D.4.3.2', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22'),
(7, 'Mix', NULL, '2025-06-19 11:13:22', '2025-06-19 11:13:22');

-- --------------------------------------------------------

--
-- Table structure for table `src_electricity_comsuptions`
--

CREATE TABLE `src_electricity_comsuptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `src_electricity_comsuptions`
--

INSERT INTO `src_electricity_comsuptions` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Measured', '2025-06-19 11:04:19', '2025-06-19 11:04:19'),
(2, 'Default', '2025-06-19 11:04:19', '2025-06-19 11:04:19'),
(3, 'Unknown', '2025-06-19 11:04:19', '2025-06-19 11:04:19');

-- --------------------------------------------------------

--
-- Table structure for table `verifiers`
--

CREATE TABLE `verifiers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `post_code` varchar(50) DEFAULT NULL,
  `authorized_rep_id` int(11) DEFAULT NULL,
  `accreditation_state` varchar(255) DEFAULT NULL,
  `accreditation_national_body` varchar(255) DEFAULT NULL,
  `registration_no` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `verifiers`
--

INSERT INTO `verifiers` (`id`, `name`, `address`, `city`, `country_id`, `post_code`, `authorized_rep_id`, `accreditation_state`, `accreditation_national_body`, `registration_no`, `created_at`, `updated_at`) VALUES
(1, 'มานี ใจดี', NULL, 'Chiang Mai', 221, '50000', 1, NULL, NULL, NULL, NULL, NULL),
(3, 'test', '28', 'เมืองเชียงใหม่', 221, '50000', 3, 'Armenia', 'sdfgdsffddg', 'dfgfdgfdg', '2025-06-20 21:54:32', '2025-06-20 21:54:32'),
(4, 'sdfsdf', 'sdfsdf', 'Muang Chiang Mai', 221, '50200', 4, NULL, 'sdf', 'sddd', '2025-06-20 22:15:13', '2025-06-20 22:15:13'),
(5, 'sdfsdf', 'sdfsdf', 'Muang Chiang Mai', 221, '50200', 5, NULL, 'sdf', 'sddd', '2025-06-21 00:21:00', '2025-06-21 00:21:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ad_units`
--
ALTER TABLE `ad_units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authorised_representatives`
--
ALTER TABLE `authorised_representatives`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b_emission_installations`
--
ALTER TABLE `b_emission_installations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `cn_codes`
--
ALTER TABLE `cn_codes`
  ADD PRIMARY KEY (`cn_id`),
  ADD KEY `goods_category_id` (`goods_category_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `c_emission_energies`
--
ALTER TABLE `c_emission_energies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `d_processes`
--
ALTER TABLE `d_processes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `ef_units`
--
ALTER TABLE `ef_units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emission_methods`
--
ALTER TABLE `emission_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `e_precursors`
--
ALTER TABLE `e_precursors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `gen_info_data_qlys`
--
ALTER TABLE `gen_info_data_qlys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods_categories`
--
ALTER TABLE `goods_categories`
  ADD PRIMARY KEY (`goods_id`),
  ADD KEY `industry_type_id` (`industry_type_id`);

--
-- Indexes for table `industry_types`
--
ALTER TABLE `industry_types`
  ADD PRIMARY KEY (`industry_id`);

--
-- Indexes for table `info_qty_assurances`
--
ALTER TABLE `info_qty_assurances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `installations`
--
ALTER TABLE `installations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `author_represent_id` (`author_represent_id`);

--
-- Indexes for table `just_for_use_data_values`
--
ALTER TABLE `just_for_use_data_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `installation_id` (`installation_id`),
  ADD KEY `verifier_id` (`verifier_id`),
  ADD KEY `industry_type_id` (`industry_type_id`),
  ADD KEY `goods_id` (`goods_id`),
  ADD KEY `un_id` (`cn_id`);

--
-- Indexes for table `src_ef_electricitys`
--
ALTER TABLE `src_ef_electricitys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `src_electricity_comsuptions`
--
ALTER TABLE `src_electricity_comsuptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verifiers`
--
ALTER TABLE `verifiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `authorized_rep_id` (`authorized_rep_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authorised_representatives`
--
ALTER TABLE `authorised_representatives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `b_emission_installations`
--
ALTER TABLE `b_emission_installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_emission_energies`
--
ALTER TABLE `c_emission_energies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `d_processes`
--
ALTER TABLE `d_processes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `e_precursors`
--
ALTER TABLE `e_precursors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `goods_categories`
--
ALTER TABLE `goods_categories`
  MODIFY `goods_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `industry_types`
--
ALTER TABLE `industry_types`
  MODIFY `industry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `installations`
--
ALTER TABLE `installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `src_electricity_comsuptions`
--
ALTER TABLE `src_electricity_comsuptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `verifiers`
--
ALTER TABLE `verifiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `b_emission_installations`
--
ALTER TABLE `b_emission_installations`
  ADD CONSTRAINT `b_emission_installations_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `cn_codes`
--
ALTER TABLE `cn_codes`
  ADD CONSTRAINT `cn_codes_ibfk_1` FOREIGN KEY (`goods_category_id`) REFERENCES `goods_categories` (`goods_id`);

--
-- Constraints for table `c_emission_energies`
--
ALTER TABLE `c_emission_energies`
  ADD CONSTRAINT `c_emission_energies_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`);

--
-- Constraints for table `d_processes`
--
ALTER TABLE `d_processes`
  ADD CONSTRAINT `d_processes_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`);

--
-- Constraints for table `e_precursors`
--
ALTER TABLE `e_precursors`
  ADD CONSTRAINT `e_precursors_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`);

--
-- Constraints for table `goods_categories`
--
ALTER TABLE `goods_categories`
  ADD CONSTRAINT `goods_categories_ibfk_1` FOREIGN KEY (`industry_type_id`) REFERENCES `industry_types` (`industry_id`);

--
-- Constraints for table `installations`
--
ALTER TABLE `installations`
  ADD CONSTRAINT `installations_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `installations_ibfk_2` FOREIGN KEY (`author_represent_id`) REFERENCES `authorised_representatives` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`installation_id`) REFERENCES `installations` (`id`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`verifier_id`) REFERENCES `verifiers` (`id`),
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`industry_type_id`) REFERENCES `industry_types` (`industry_id`);

--
-- Constraints for table `verifiers`
--
ALTER TABLE `verifiers`
  ADD CONSTRAINT `verifiers_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `verifiers_ibfk_2` FOREIGN KEY (`authorized_rep_id`) REFERENCES `authorised_representatives` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
