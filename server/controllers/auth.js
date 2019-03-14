const bcrypt = require("bcryptjs");

module.exports = {
  getPatient: (req, res) => {
    const { patient } = req.session;
    if (patient) {
      res.status(200).send(patient);
    } else {
      res.sendStatus(401);
    }
  },

  getDoctor: (req, res) => {
    const { doctor } = req.session;
    if (doctor) {
      res.status(200).send(doctor);
    } else {
      res.sendStatus(401);
    }
  },

  register: async (req, res) => {
    const {
        firstName,
        lastName,
        gender,
        age,
        height,
        weight,
        email,
        password
      } = req.body,
      { session } = req,
      db = req.app.get("db");
    let takenEmail = await db.auth.checkEmail({ email });
    takenEmail = +takenEmail[0].count;

    if (takenEmail !== 0) {
      return res.sendStatus(401);
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt),
      patient = await db.auth.register({
        first_name: firstName,
        last_name: lastName,
        gender,
        age,
        height,
        weight,
        email,
        password: hash
      });

      console.log('asdf', patient)

    patient = patient[0];

    session.patient = patient;

    res.status(200).send(session.patient);
  },

  docRegister: async (req, res) => {
    const { firstName, lastName, email, password } = req.body,
      { session } = req,
      db = req.app.get("db");
    let takenEmail = await db.auth.checkDocEmail({ email });
    takenEmail = +takenEmail[0].count;

    if (takenEmail !== 0) {
      return res.sendStatus(401);
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt),
      doctor = await db.auth.docReg({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hash
      });

    doctor = doctor[0];

    session.doctor = doctor;

    res.status(200).send(session.doctor);
  },

  login: async (req, res) => {
    const { email, password } = req.body,
      { session } = req,
      db = req.app.get("db");
    let patient = await db.auth.login({ email });
    let doctor = await db.auth.docLogin({ email });
    patient = patient[0];
    doctor = doctor[0];

    if (!patient && !doctor) {
      return res.sendStatus(401);
    } else if (patient) {
      let authPatient = bcrypt.compareSync(password, patient.password);
      if (authPatient) {
        delete patient.password;
        session.patient = patient;
        return res.status(200).send({ patient: session.patient });
      } else {
        return res.sendStatus(401);
      }
    } else {
      let authDoctor = bcrypt.compareSync(password, doctor.password);
      if (authDoctor) {
        delete doctor.password;
        session.doctor = doctor;
        return res.status(200).send({ doctor: session.doctor });
      } else {
        return res.sendStatus(401);
      }
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
