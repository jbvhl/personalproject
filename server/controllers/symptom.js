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
    for(let i=0; i<response.length; i++){
      response[i] = response[i][0]
    }
    // console.log(response)
    res.status(200).send(response);
  },

  getSymp: async (req, res) => {
    const {id} = req.session.patient,
    db = req.app.get('db');

    if (id) {
      let resp = await db.diagnose.getSymp({
        id
      })
      return res.status(200).send(resp);
    } else {
      return null;
    }
  },

  deleteSymp: async (req, res) => {
    const {symptom} = req.params,
    db = req.app.get('db');
    await db.diagnose.deleteSymp({
      symptom
    }).then(() => {
      res.sendStatus(200);
    });
  },

  editSymp: async (req, res) => {
    const {symptom} = req.body,
    {id} = req.params,
    db = req.app.get('db');
    // console.log('herpa merp', id, symptom)
    let resp = await db.diagnose.updateSymp({
      symptom,
      id
    })
    // console.log(resp);
    res.status(200).send(resp);
  } 
};
