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

  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body,
      { session } = req,
      db = req.app.get("db");
    let takenEmail = await db.auth.checkEmail({ email });
    takenEmail = +takenEmail[0].count;

    if (takenEmail !== 0) {
      return res.sendStatus(409);
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt),
      patient = await db.auth.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hash
      });

    patient = patient[0];

    session.patient = patient;

    res.status(200).send(session.patient);
  },

  login: async (req, res) => {
    const { email, password } = req.body,
      { session } = req,
      db = req.app.get("db");
    let patient = await db.auth.login({ email });
    patient = patient[0];

    if (!patient) {
      return res.sendStatus(404);
    }

    let authenticated = bcrypt.compareSync(password, patient.password);

    if (authenticated) {
      delete patient.password;
      session.patient = patient;
      res.status(200).send(session.patient);
    } else {
      res.sendStatus(401);
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
