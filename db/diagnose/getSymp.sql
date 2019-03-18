select *
from symptom
join patient
on patient.id = symptom.patient_id
where patient_id = ${id}