const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {first_name, last_name, email, password} = req.body,
            {session} = req,
            db = req.app.get('db');
        let takenEmail = await db.auth.checkEmail({email});
        takenEmail =+takenEmail[0].count;

        if (takenEmail !== 0) {
            return res.sendStatus(409)
        };

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt),
            patient = await db.auth.register({first_name, last_name, email, password: hash}),
            patient = patient[0];

        session.patient = patient;

        res.status(200).send(session.patient)
    }
}