# QuizNight API

## Routes:

### ```/users```
 - GET ```/``` all users
 - GET ```/tokens``` all tokens
 - GET ```/tokens/:user_id``` get user token
 - POST ```/register``` register user
 - POST ```/login``` login user
 - DELETE ```/tokens/:user_id``` delete user

### ```/groups```
 - GET ```/``` all groups
 - GET ```/id/:id``` group by id
 - GET ```/name/:name``` group by name
 - GET ```/creatorId/:id``` group by author
 - POST ```/``` create group
 - POST ```/join``` enter group

### ```/quiz```
 - GET ```/``` all quizzes
 - GET ```/:id``` quiz by id
 - GET ```/group/:group_id``` quizzes by group_id
 - GET ```/creator/:creator_id``` quizzes by author_id
 - POST ```/``` create quiz
 - PATCH ```/:id``` update quiz attributes
 - DELETE ```/:id``` delete quiz

### ```/questions```
 - GET ```/``` all questions
 - GET ```/:id``` question by id
 - GET ```/quiz/:quiz_id``` questions by quiz_id
 - GET ```/category/:category``` questions by category
 - POST ```/``` create question
 - PATCH ```/:id``` update question attributes
 - DELETE ```/:id``` delete question

### ```/players```
 - GET ```/``` all players
 - GET ```/:id``` specific player
 - GET ```/quiz/:id``` player in quiz by id
 - POST ```/``` create player
 - DELETE ```/:id``` delete player

### ```/playeranswers```
 - GET ```/``` all answers
 - GET ```/:id``` specific answer
 - GET ```/users/:user_id``` all answers by user by user_id
 - GET ```/question/:question_id``` all answers of question by question_id
 - POST ```/```