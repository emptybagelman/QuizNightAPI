DROP TABLE IF EXISTS playeranswers;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS grouptokens;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE tokens (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token char(36) UNIQUE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE groups (
    id INT GENERATED ALWAYS AS IDENTITY,
    group_creator VARCHAR(50) NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_creator) REFERENCES users(username)
);

CREATE TABLE grouptokens (
    id INT GENERATED ALWAYS AS IDENTITY,
    group_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE quizzes (
    id INT GENERATED ALWAYS AS IDENTITY,
    group_id INT NOT NULL,
    creator_id INT NOT NULL,
    quiz_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY,
    quiz_id INT NOT NULL,
    category VARCHAR(20) NOT NULL,
    question VARCHAR(100) NOT NULL,
    answer VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE players (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE playeranswers (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES players(id)
);

INSERT INTO users (username, password, nickname)
VALUES 
    ('emptybagelman', 'password', 'boneur');

INSERT INTO tokens (user_id, token)
VALUES 
    (1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

INSERT INTO groups (group_creator, group_name, password)
VALUES 
    ('emptybagelman', 'POO_SQUAD','bigbattypants');

INSERT INTO grouptokens (group_id, token)
VALUES
    (1, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');

INSERT INTO quizzes (group_id, creator_id, quiz_name)
VALUES 
    (1, 1, 'QuizNight 1');

INSERT INTO questions (quiz_id, category, question, answer)
VALUES 
    (1, 'Guess_Who', 'Who cant say their Rs?', 'Bail');

INSERT INTO players (user_id, quiz_id, nickname)
VALUES 
    (1, 1, 'boneur');

INSERT INTO playeranswers (user_id, question_id, answer)
VALUES 
    (1, 1, 'Robert');