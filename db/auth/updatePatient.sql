update patient
set first_name = ${first_name}, last_name = ${last_name}, gender = ${gender}, age = ${age}, height = ${height}, weight = ${weight}, email = ${email}, password = ${password}
where id = ${id}

returning id, first_name, last_name, gender, age, height, weight, email