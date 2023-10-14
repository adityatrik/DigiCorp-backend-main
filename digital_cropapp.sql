-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Okt 2023 pada 16.30
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digital_cropapp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `batuan`
--

CREATE TABLE `batuan` (
  `ID` int(11) NOT NULL,
  `batuan` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `batuan`
--

INSERT INTO `batuan` (`ID`, `batuan`, `color`) VALUES
(1, 'Batuan Beku', 'Blue'),
(2, 'Batuan Metamorph', 'Green');

-- --------------------------------------------------------

--
-- Struktur dari tabel `comment`
--

CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `PostID` int(100) DEFAULT NULL,
  `UserID` int(100) DEFAULT NULL,
  `Comment` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `comment`
--

INSERT INTO `comment` (`ID`, `PostID`, `UserID`, `Comment`) VALUES
(1, 3, 2, 'wah keren');

-- --------------------------------------------------------

--
-- Struktur dari tabel `follow`
--

CREATE TABLE `follow` (
  `ID` int(11) NOT NULL,
  `UserID` int(100) DEFAULT NULL,
  `FollowUserId` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `follow`
--

INSERT INTO `follow` (`ID`, `UserID`, `FollowUserId`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `follower`
--

CREATE TABLE `follower` (
  `ID` int(11) NOT NULL,
  `UserID` int(100) DEFAULT NULL,
  `FollowerUserId` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `follower`
--

INSERT INTO `follower` (`ID`, `UserID`, `FollowerUserId`) VALUES
(1, 3, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `likepost`
--

CREATE TABLE `likepost` (
  `ID` int(11) NOT NULL,
  `PostID` int(100) DEFAULT NULL,
  `UserID` int(100) DEFAULT NULL,
  `iSlike` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `likepost`
--

INSERT INTO `likepost` (`ID`, `PostID`, `UserID`, `iSlike`) VALUES
(1, 3, 2, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `loguser`
--

CREATE TABLE `loguser` (
  `Id` int(11) NOT NULL,
  `AdminID` int(50) DEFAULT NULL,
  `Activity` varchar(50) DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `loguser`
--

INSERT INTO `loguser` (`Id`, `AdminID`, `Activity`, `Timestamp`) VALUES
(1, 1, 'melakukan login', '2023-10-10 14:23:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notification`
--

CREATE TABLE `notification` (
  `ID` int(11) NOT NULL,
  `UserID` int(100) DEFAULT NULL,
  `Msg` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `notification`
--

INSERT INTO `notification` (`ID`, `UserID`, `Msg`) VALUES
(1, 2, 'cek');

-- --------------------------------------------------------

--
-- Struktur dari tabel `photopost`
--

CREATE TABLE `photopost` (
  `ID` int(11) NOT NULL,
  `PostID` int(100) DEFAULT NULL,
  `Image` varchar(100) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `photopost`
--

INSERT INTO `photopost` (`ID`, `PostID`, `Image`, `description`) VALUES
(1, 3, '64ad807714d9999c70f0e563_Gawr_20Gura.jpeg', 'ini adalah batu');

-- --------------------------------------------------------

--
-- Struktur dari tabel `post`
--

CREATE TABLE `post` (
  `Id` int(11) NOT NULL,
  `UserID` int(100) DEFAULT NULL,
  `Coordinate` varchar(100) DEFAULT NULL,
  `azimuth` varchar(155) NOT NULL,
  `Batuan` varchar(50) DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `description_id` int(12) DEFAULT NULL,
  `Date` timestamp NULL DEFAULT current_timestamp(),
  `StrikeDip` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `post`
--

INSERT INTO `post` (`Id`, `UserID`, `Coordinate`, `azimuth`, `Batuan`, `Title`, `description_id`, `Date`, `StrikeDip`) VALUES
(3, 2, '-7.7505668, 110.4114703', '100', 'batuan beku', 'Batuan Baru', NULL, '2023-10-10 14:18:50', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `reporteduser`
--

CREATE TABLE `reporteduser` (
  `ID` int(11) NOT NULL,
  `UserID` int(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `reporteduser`
--

INSERT INTO `reporteduser` (`ID`, `UserID`, `reason`, `timestamp`) VALUES
(1, 2, 'spam', '2023-10-10 14:08:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `terrain_data`
--

CREATE TABLE `terrain_data` (
  `ID` int(11) NOT NULL,
  `Name` int(100) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Data`))
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Bio` varchar(50) DEFAULT NULL,
  `Institution` varchar(50) DEFAULT NULL,
  `Img` varchar(50) DEFAULT NULL,
  `Status` int(1) DEFAULT NULL,
  `Link` varchar(255) NOT NULL,
  `Role` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`Id`, `Email`, `Password`, `FirstName`, `LastName`, `Bio`, `Institution`, `Img`, `Status`, `Link`, `Role`, `token`) VALUES
(2, 'rivalganteng@gmail.com', '$2b$10$3y4FgcY4/hNwMyCA0vzqeeNpZZV6mi3ywqD97mQErt./vTh/EdRlW', 'Rival', 'Ganteng', 'Web Developer', 'gatau', NULL, 1, '-', 0, NULL),
(3, 'rivalimut@gmail.com', '$2b$10$wb8uXFtrvkBoIBP6pWSvWe6hmaTjdF7ea9Al2BSS4oPwTdrlVOIy2', 'Rival', 'Imut', 'Web Developer', 'gatau', NULL, 1, '-', 0, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `useradmin`
--

CREATE TABLE `useradmin` (
  `Id` int(11) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Akses` enum('root','admin') DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `useradmin`
--

INSERT INTO `useradmin` (`Id`, `Email`, `Password`, `Name`, `Akses`, `token`) VALUES
(1, 'rival@gmail.com', '$2b$10$bOJTFXQATroq/AtBVk6s0udqdQMj95i3Y195ikHtX2CmAH106NbMO', 'Rival', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwiaWF0IjoxNjk2OTQwNTM3LCJleHAiOjE2OTY5NDQxMzd9.YG4wCB2RKkJedXRAKGer4by1RwMy9xyC-h4iCss9Q3U');

-- --------------------------------------------------------

--
-- Struktur dari tabel `visitor`
--

CREATE TABLE `visitor` (
  `ID` int(11) NOT NULL,
  `Month` varchar(50) DEFAULT NULL,
  `Year` year(4) DEFAULT NULL,
  `Count` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `visitor`
--

INSERT INTO `visitor` (`ID`, `Month`, `Year`, `Count`) VALUES
(1, 'oktober', 2023, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `batuan`
--
ALTER TABLE `batuan`
  ADD PRIMARY KEY (`ID`);

--
-- Indeks untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_comment_postID` (`PostID`),
  ADD KEY `fk_comment_userID` (`UserID`);

--
-- Indeks untuk tabel `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_follow_userID` (`UserID`);

--
-- Indeks untuk tabel `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_follower_userID` (`UserID`);

--
-- Indeks untuk tabel `likepost`
--
ALTER TABLE `likepost`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_likepost_userID` (`UserID`),
  ADD KEY `fk_likepost_postID` (`PostID`);

--
-- Indeks untuk tabel `loguser`
--
ALTER TABLE `loguser`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_logUser_AdminId` (`AdminID`);

--
-- Indeks untuk tabel `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_notification_userID` (`UserID`);

--
-- Indeks untuk tabel `photopost`
--
ALTER TABLE `photopost`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_photo_postID` (`PostID`);

--
-- Indeks untuk tabel `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_post_userID` (`UserID`);

--
-- Indeks untuk tabel `reporteduser`
--
ALTER TABLE `reporteduser`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_report_userID` (`UserID`);

--
-- Indeks untuk tabel `terrain_data`
--
ALTER TABLE `terrain_data`
  ADD PRIMARY KEY (`ID`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indeks untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  ADD PRIMARY KEY (`Id`);

--
-- Indeks untuk tabel `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `batuan`
--
ALTER TABLE `batuan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `follow`
--
ALTER TABLE `follow`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `follower`
--
ALTER TABLE `follower`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `likepost`
--
ALTER TABLE `likepost`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `loguser`
--
ALTER TABLE `loguser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `notification`
--
ALTER TABLE `notification`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `photopost`
--
ALTER TABLE `photopost`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `post`
--
ALTER TABLE `post`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `reporteduser`
--
ALTER TABLE `reporteduser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `terrain_data`
--
ALTER TABLE `terrain_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `visitor`
--
ALTER TABLE `visitor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_postID` FOREIGN KEY (`PostID`) REFERENCES `post` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comment_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `fk_follow_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `fk_follower_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `likepost`
--
ALTER TABLE `likepost`
  ADD CONSTRAINT `fk_likepost_postID` FOREIGN KEY (`PostID`) REFERENCES `post` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likepost_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `loguser`
--
ALTER TABLE `loguser`
  ADD CONSTRAINT `fk_logUser_AdminId` FOREIGN KEY (`AdminID`) REFERENCES `useradmin` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_notification_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `photopost`
--
ALTER TABLE `photopost`
  ADD CONSTRAINT `fk_photo_postID` FOREIGN KEY (`PostID`) REFERENCES `post` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `reporteduser`
--
ALTER TABLE `reporteduser`
  ADD CONSTRAINT `fk_report_userID` FOREIGN KEY (`UserID`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
