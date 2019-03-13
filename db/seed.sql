create table patient (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    gender varchar,
    age integer,
    height float,
    weight float,
    email varchar,
    password varchar,
    doctor_id integer
);

create table doctor (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    email varchar,
    password varchar,
)

-- create table symptom (
--     id serial primary key,
--     location varchar,
--     severity varchar,
--     start varchar,
--     occurance varchar,
--     symptom varchar
-- )

-- create table diagnosis (
--     id serial primary key,
--     name varchar,
--     symptoms text,
--     description text,
--     remedy_id integer
-- )

-- create table remedy (
--     id serial primary key,
--     description text
-- )