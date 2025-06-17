-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2025 at 05:28 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `authorised_representatives`
--

CREATE TABLE `authorised_representatives` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `authorised_representatives`
--

INSERT INTO `authorised_representatives` (`id`, `name`, `email`, `phone`, `fax`) VALUES
(1, 'ทดสอบ ระบบ', 'test@gmail.com', '08712345678', '053855741');

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
  `biomass_content_percentage` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `b_emission_installations`
--

INSERT INTO `b_emission_installations` (`id`, `report_id`, `method`, `source_stream_name`, `activity_data`, `AD_Unit`, `net_calorific_value`, `ef`, `ef_unit`, `oxidation_factor_percentage`, `biomass_content_percentage`) VALUES
(1, 1, 'Combustion\r\n', 'Heavy fuel oil', 252000, 't', 45, 73, 'tCO2/TJ', 100, 0),
(2, 1, 'Process Emissions', 'Raw meal for clinker', 121000, 't', NULL, 0.09, 'tCO2/t', NULL, NULL);

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
(254, 'Montenegro', 'XM'),
(255, 'Australian Oceania', 'XO'),
(256, 'West Bank and Gaza Strip', 'XP'),
(257, 'Polar regions', 'XR'),
(258, 'Serbia', 'XS'),
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
  `info_qty_assurance` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `c_emission_energies`
--

INSERT INTO `c_emission_energies` (`id`, `report_id`, `manual_total_indirect_emissions`, `generatl_info_on_data_quality`, `justification_for_use_default_values`, `info_qty_assurance`) VALUES
(1, 1, NULL, '10', '10', '10');

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
  `ef_exported_electricity` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `consumed_non_cbam_goods_amounts` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goods_categories`
--

CREATE TABLE `goods_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `routes` varchar(255) DEFAULT NULL,
  `relevant_precursors` varchar(255) DEFAULT NULL,
  `industry_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `goods_categories`
--

INSERT INTO `goods_categories` (`id`, `name`, `routes`, `relevant_precursors`, `industry_type_id`) VALUES
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
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `industry_types`
--

INSERT INTO `industry_types` (`id`, `name`) VALUES
(1, 'Cement'),
(2, 'Aluminium'),
(3, 'Iron and steel');

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
  `author_represent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `installations`
--

INSERT INTO `installations` (`id`, `name`, `name_specific`, `eco_activity`, `address`, `city`, `country_id`, `post_code`, `po_box`, `latitude`, `longitude`, `author_represent_id`) VALUES
(1, 'A Cement Co., Ltd.					', NULL, 'Cement Production', NULL, 'Saraburi', 221, '18000', '', '14.5285', '100.9103', 1);

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
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `installation_id`, `reporting_period_start`, `reporting_period_end`, `verifier_id`, `industry_type_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-06-23', '2025-06-24', 1, 1, '2025-06-17 21:35:59', '2025-06-17 21:35:59');

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
  `registration_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `verifiers`
--

INSERT INTO `verifiers` (`id`, `name`, `address`, `city`, `country_id`, `post_code`, `authorized_rep_id`, `accreditation_state`, `accreditation_national_body`, `registration_no`) VALUES
(1, 'มานี ใจดี', NULL, 'Chiang Mai', 221, '50000', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `e_precursors`
--
ALTER TABLE `e_precursors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `goods_categories`
--
ALTER TABLE `goods_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `industry_type_id` (`industry_type_id`);

--
-- Indexes for table `industry_types`
--
ALTER TABLE `industry_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `installations`
--
ALTER TABLE `installations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `author_represent_id` (`author_represent_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `installation_id` (`installation_id`),
  ADD KEY `verifier_id` (`verifier_id`),
  ADD KEY `industry_type_id` (`industry_type_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `b_emission_installations`
--
ALTER TABLE `b_emission_installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_emission_energies`
--
ALTER TABLE `c_emission_energies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `industry_types`
--
ALTER TABLE `industry_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `installations`
--
ALTER TABLE `installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `verifiers`
--
ALTER TABLE `verifiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `goods_categories_ibfk_1` FOREIGN KEY (`industry_type_id`) REFERENCES `industry_types` (`id`);

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
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`industry_type_id`) REFERENCES `industry_types` (`id`);

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
