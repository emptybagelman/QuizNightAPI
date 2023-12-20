DROP TABLE IF EXISTS playeranswers;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS grouptokens;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS songs;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(50) UNIQUE,
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

CREATE TABLE members (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    total_score INT NOT NULL,
    nickname VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (nickname) REFERENCES users(nickname)
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
    member_id INT NOT NULL,
    quiz_id INT NOT NULL,
    local_score INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE playeranswers (
    id INT GENERATED ALWAYS AS IDENTITY,
    player_id INT NOT NULL,
    question_id INT NOT NULL,
    answer VARCHAR(100),
    correct BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (player_id) REFERENCES players(id)
);

CREATE TABLE songs (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL, 
    origin_url VARCHAR(500) NOT NULL, 
    capo INT NOT NULL,
    lines VARCHAR(500),
    chords VARCHAR(100),
    sidenotes VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO users (username, password, nickname)
VALUES 
    ('emptybagelman', 'password', 'boneur'),
    ('fuzionz', 'password', 'serg'),
    ('jx40w', 'password', 'joel');

INSERT INTO tokens (user_id, token)
VALUES 
    (1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    (2, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'),
    (3, 'cccccccccccccccccccccccccccccccccccc');

INSERT INTO groups (group_creator, group_name, password)
VALUES 
    ('emptybagelman', 'POO_SQUAD','bigbattypants');

INSERT INTO grouptokens (group_id, token)
VALUES
    (1, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');

INSERT INTO members (user_id, group_id, total_score, nickname)
VALUES
    (1, 1, 200, 'boneur'),
    (2, 1, 400, 'serg'),
    (3, 1, 200, 'joel');

INSERT INTO quizzes (group_id, creator_id, quiz_name)
VALUES 
    (1, 1, 'QuizNight 1'),
    (1, 2, 'Quiz 2'),
    (1, 2, 'Tester 3');

INSERT INTO questions (quiz_id, category, question, answer)
VALUES 
    (1, 'Guess_Who', 'Who cant say their Rs?', 'Bail'),
    (1, 'Music', 'Who is King Reggie?', 'Josh'),
    (1, 'Music', 'What does bbno$ means?', 'Baby no money'),
    (2, 'Penis', 'balls?', 'yes'),
    (2, 'LEGO', 'LEGO or LEGOs?', 'LEGO');

INSERT INTO players (member_id, quiz_id, local_score)
VALUES 
    (1, 1,20),
    (2, 1,10),
    (2, 1,0),
    (1, 2,0),
    (3, 2,20),
    (3, 3,0);

INSERT INTO playeranswers (player_id, question_id, answer, correct)
VALUES 
    (1, 1, 'Robert', False),
    (2, 2, 'reginald', False),
    (2, 2, 'josh', True);

INSERT INTO songs (name, origin_url, capo, lines, chords, sidenotes)
VALUES 
    ('temp', 'https://youtube.com', 0, '{0:"",1:"",2:"",3:"",4:"",5:""}', '[C,C,C,D]', 'tempsong');