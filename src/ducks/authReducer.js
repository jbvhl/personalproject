const initialState = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    email: ''
}

const UPDATE_PATIENT = 'UPDATE_PATIENT';
const CLEAR_PATIENT = 'CLEAR_PATIENT';

export function updatePatient(patient) {
    console.log(patient)
    return {
        type: UPDATE_PATIENT,
        payload: patient
    }
}

export function clearPatient() {
    return {
        type: CLEAR_PATIENT
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_PATIENT: 
            const {id, first_name, last_name, gender, age, height, weight, email} = payload; // pulling from sql
            console.log(payload)
            return {...state, id, firstName: first_name, lastName: last_name, gender, age, height, weight, email};
        case CLEAR_PATIENT: 
            return {...state, id: 0, firstName: '', lastName: '', gender: '', age: 0, height: 0, weight: 0, email: ''}
        default:
        return state;

    }
}