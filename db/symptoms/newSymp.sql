insert into symptom (patient_id, location, symptom)
values (
    ${patient_id},
    ${location},
    ${symptom}
)

returning id, patient_id, location, symptom;