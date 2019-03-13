insert into doctor (first_name, last_name, email, password)
values (
    ${first_name}, 
    ${last_name},
    ${email}, 
    ${password}
)

returning id, first_name, last_name, email