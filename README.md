# Focus:ON

## Added Feature Extension

1. Login page with authentification/authorization.
2. Added Profile page.
3. Added Welcome page.
4. Added NavBar.


## Additional Setup
1. Run `npm jsonwebtoken` to server side.
2. Run `npm bcrypt` to server side.



## General info

### Focus:ON is a productivity app that helps to focus on daily tasks. The app has two views:

1. An overview page where the user can see how many pomodoro sessions and tasks she completed on a given day.
2. A current day view where the user can define tasks for the day and set a pomodoro tracker.


## Technologies

1. React.js
2. Node.js
3. Express.js
4. MySQL
5. Chakra UI

## Setup

1. Install MySQL
2. Clone repository
3. Configure .env file for your database instance
4. Run `npm install`
5. Run `npm run migrate`
6. Run `npm start` to start backend server
7. Open new terminal and cd into client
8. Run `npm install`
9. Run `npm start` to start React app

## Scope of functionalities

### Overview view (/)

1. User can add a new day if the current day is not already in the database.
2. User can see number of completed tasks, number of completed pomodoro sessions and whether the given day was a success or not (that is when the user has completed every task that was set for the day).
3. With either a click on the card or a click on the button "Yes! Plan new day!" the view changes to the current day view.

### Current day view (/focus)

1. If there are already tasks for the day, the user can see the tasks and a decription of the tasks. He can also mark tasks as done and delete tasks.
2. The user can set new to-do's.
3. Pomodoro tracker with buttons for start, timeout/continue and reset and a noise for when the tracker is started or the user is done with the pomodoro session.
4. User can see how many sessions she already completed.

## Future features

1. Customize length of pomodoro sessions
2. Set short and long breaks in between pomodoro sessions
3. Embed music (for example spotify or youtube api)
4. Long term planning (set tasks for future days)
5. Add information about productivity in general
6. Show statistics (like number of pomodoro sessions per week)
7. Authentification

## User flow

![userflow](/figures/userflow.png)

## Component structure

![component structure](/figures/components.png)

## Database design

![database design](/figures/database.png)

## API routes

1. Days

- GET / (get all days)
- GET /:id (get certain day and related data)
- POST / (add new day)

2. Pomodoro

- GET /:day (get sessions for a given day)
- POST / (add new session)

3. Tasks

- GET / (get all tasks)
- GET /:day (get tasks for a given day)
- POST / (insert new task)
- DELETE /:id (delete task)
- PATCH /:id (update task and set completed to true)

### This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.
