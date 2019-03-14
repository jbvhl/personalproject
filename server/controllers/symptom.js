module.exports = {
  updateSymp: async (req, res) => {
    const { location, seperateSymp } = req.body,
    db = req.app.get("db");

    let response =  await Promise.all(seperateSymp.map(symptom => {
      return db.diagnose.newSymp({
        patient_id: req.session.patient ? req.session.patient.id : null,
        location,
        symptom
      });
    }));
    console.log(response)
    res.status(200).send(response[0][0]);
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
