create table patient (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    gender varchar,
    age integer,
    height float,
    weight float,
    email varchar,
    password varchar
)

create table symptom (
    id serial primary key,
    location varchar,
    severity varchar,
    start varchar,
    occurance varchar,
    symptom varchar
)