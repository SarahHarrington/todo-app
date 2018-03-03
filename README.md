# To Do Application

This to do list application allows users to add tasks to their list with due dates and times. Users can edit their taks, mark them as complete, and delete them.

[Live Demo](https://evening-garden-82910.herokuapp.com/)

## Built With
* HTML5
* CSS3
* jQuery
* Bootstrap
* Express
* Node.js
* PostgreSQL

## Prerequisites
* Node.js
* PostgreSQL

## Getting Started
1. Fork and clone this repo
2. Run NPM Install
3. Create a SQL database with the below table
```
CREATE TABLE "todos"( 
    "id" serial primary key,
    "todo" varchar(200),
    "date" timestamp without time zone,
    "complete" timestamp without time zone
    );
```

## Author
Sarah Harrington
