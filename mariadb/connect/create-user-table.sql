DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) UNIQUE NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users ( username, password, email) VALUES 
('alice','password123', 'alice@example.com'),
 ('bob','securepass', 'bob@example.com'),
 ('charlie','mypassword', 'charlie@example.com'),
 ('diana', '1234abcd', 'diana@example.com'),
 ('eve', 'passw0rd!', 'eve@example.com')
 ;