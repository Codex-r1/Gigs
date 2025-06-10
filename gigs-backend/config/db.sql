CREATE TABLE Users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('applicant', 'employer', 'admin') NOT NULL
);

CREATE TABLE Jobs (
  jobId INT AUTO_INCREMENT PRIMARY KEY,
  employerId INT NOT NULL, -- references Users(userId)
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  salary DECIMAL(10,2),
  jobType ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
  category VARCHAR(100),
  postedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employerId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE Applications (
  applicationId INT AUTO_INCREMENT PRIMARY KEY,
  jobId INT NOT NULL,
  applicantId INT NOT NULL, -- references Users(userId)
  status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
  appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (jobId) REFERENCES Jobs(jobId) ON DELETE CASCADE,
  FOREIGN KEY (applicantId) REFERENCES Users(userId) ON DELETE CASCADE
);

