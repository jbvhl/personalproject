select count(*)
from patient
where email = ${email};
-----------------------------------
select count(*)
from doctor
where email = ${email};