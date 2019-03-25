select patient.first_name, patient.last_name, age, gender, doctor.last_name
from patient
join doctor
on doctor.id = patient.doctor_id
where doctor_id = ${doctor_id}
