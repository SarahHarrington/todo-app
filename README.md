# todo-app

CREATE TABLE "todos"(
    
    "id" serial primary key,
    "todo" varchar(200),
    "date" timestamp without time zone,
    "complete" timestamp without time zone
    );
