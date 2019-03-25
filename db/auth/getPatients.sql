select patient.first_name, patient.last_name, age, gender
from patient
join doctor
on doctor.id = patient.doctor_id
where doctor_id = ${doctor_id}
