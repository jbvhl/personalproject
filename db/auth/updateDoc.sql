update doctor
set first_name = ${first_name}, last_name = ${last_name}, email = ${email}, password = ${password}
where id = ${id}

returning id, first_name, last_name, email