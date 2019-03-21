import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import PatientReg from './components/Register/PatientReg'
import DoctorReg from './components/Register/DoctorReg'
import Patient from './components/Patient/Patient';
import Doctor from './components/Doctor/Doctor';
import PatientAcc from './components/Patient/PatientAcc';
import DoctorAcc from './components/Doctor/DoctorAcc';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register/home' component={Register} />
        <Route path='/register/patientreg' component={PatientReg}/>
        <Route path='/register/doctorreg' component={DoctorReg}/>
        <Route path='/patient/account' component={PatientAcc}/>
        <Route path='/doctor/account' component={DoctorAcc}/>
        <Route path='/patient' component={Patient}/>
        <Route path='/doctor' component={Doctor}/>
    </Switch>

)
