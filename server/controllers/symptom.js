module.exports = {
  updateSymp: async (req, res) => {
    const { location, seperateSymp } = req.body,
    db = req.app.get("db");

    await Promise.all(seperateSymp.map(symptom => {
      db.diagnose.newSymp({
        patient_id: req.session.patient ? req.session.patient.id : null,
        location,
        symptom
      });
    }));
    res.sendStatus(200);
  },

  getSymp: async (req, res) => {
    const {id} = req.session.patient,
    db = req.app.get('db');
    let resp = await db.diagnose.getSymp({
      id
    })
    res.status(200).send(resp);
  }
};
