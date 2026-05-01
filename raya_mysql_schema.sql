-- ============================================================
-- Raya Memory Database — MySQL Schema for InfinityFree
-- Import this file via phpMyAdmin > Import tab
-- Database: if0_41801256_raya
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- ── Users Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cookie_id` VARCHAR(128) NOT NULL UNIQUE,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_active_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Sessions Table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(128) NOT NULL,
  `session_id` VARCHAR(128) NOT NULL UNIQUE,
  `started_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `ended_at` DATETIME DEFAULT NULL,
  `msg_count` INT DEFAULT 0,
  `summary` TEXT DEFAULT NULL,
  INDEX `idx_sessions_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Messages Table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(128) NOT NULL,
  `role` VARCHAR(16) NOT NULL COMMENT 'user or assistant',
  `content` TEXT NOT NULL,
  `lang` VARCHAR(8) DEFAULT 'en',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_messages_session` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Learnings Table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `learnings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(128) NOT NULL,
  `type` VARCHAR(32) NOT NULL COMMENT 'correction, preference, fact, summary',
  `content` TEXT NOT NULL,
  `source_sid` VARCHAR(128) DEFAULT NULL,
  `weight` INT DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_learnings_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Preferences Table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `preferences` (
  `user_id` VARCHAR(128) NOT NULL,
  `key` VARCHAR(64) NOT NULL,
  `value` TEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Global Stats Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS `global_stats` (
  `key` VARCHAR(64) PRIMARY KEY,
  `value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Command Cache Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `command_cache` (
  `query` VARCHAR(512) PRIMARY KEY,
  `response` TEXT NOT NULL,
  `hit_count` INT DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Admin Rules Table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_rules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `rule` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Seed initial stats ───────────────────────────────────────
INSERT IGNORE INTO `global_stats` (`key`, `value`) VALUES ('unique_users', '0');
INSERT IGNORE INTO `global_stats` (`key`, `value`) VALUES ('total_visits', '0');

COMMIT;
