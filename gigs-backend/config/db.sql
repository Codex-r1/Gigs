CREATE TABLE Users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('applicant', 'employer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Jobs (
  jobId INT AUTO_INCREMENT PRIMARY KEY,
  employerId INT NOT NULL, -- references Users(userId)
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  salary DECIMAL(10,2),
  status ENUM('open', 'closed', 'draft') DEFAULT 'open',
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

CREATE TABLE Ratings (
  ratingId INT AUTO_INCREMENT PRIMARY KEY,
  employerId INT NOT NULL,  -- references Users(userId)
  applicantId INT NOT NULL, -- references Users(userId)
  score INT NOT NULL CHECK (score IN (1,2,3,4,5)),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employerId) REFERENCES Users(userId) ON DELETE CASCADE,
  FOREIGN KEY (applicantId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE Profile (
  profileId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  bio TEXT NOT NULL CHECK (LENGTH(TRIM(bio)) > 0),
  skills TEXT NOT NULL CHECK (LENGTH(TRIM(skills)) > 0),
  location VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE Bookmarks (
  bookmarkId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  jobId INT NOT NULL,
  bookmarkedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign keys
  CONSTRAINT fk_user_bookmark FOREIGN KEY (userId)
    REFERENCES Users(userId)
    ON DELETE CASCADE,

  CONSTRAINT fk_job_bookmark FOREIGN KEY (jobId)
    REFERENCES Jobs(jobId)
    ON DELETE CASCADE,

  -- Prevent duplicate bookmarks
  UNIQUE KEY unique_user_job (userId, jobId)
);

