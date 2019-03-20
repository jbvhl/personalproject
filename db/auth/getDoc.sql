select *
from doctor
join patient
on patient.doctor_id = doctor.id
where doctor.id = ${id}