update symptom
set symptom = ${symptom}
where id = ${id}

returning symptom, id