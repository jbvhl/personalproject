module.exports = {
    getDiagnosis: (req, res) => {
    let { symptoms } = req.body 
    let body = { 
        sex: gender, 
        age, 
        symptoms: symptoms.map(symptom => { 
            id = symptom.id, 
            choice_id = 'present'
        })
    }

    axios.post('https://api.infermedica.com/v2/symptoms', body).then(response => {
        res.send(response)
        })
    }
}