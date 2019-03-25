insert into patient (first_name, last_name, gender, age, height, weight, email, password, doctor_id)
values (
    ${first_name}, 
    ${last_name},
    ${gender},
    ${age},
    ${height},
    ${weight}, 
    ${email}, 
    ${password},
    1
)

returning id, first_name, last_name, gender, age, height, weight, email;

