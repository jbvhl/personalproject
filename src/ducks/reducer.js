const initialState = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
}

const UPDATE_PATIENT = 'UPDATE_PATIENT';
const CLEAR_PATIENT = 'CLEAR_PATIENT';

export function updatePatient(patient) {
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
            const {id, first_name, last_name, email} = payload; // pulling from sql
            console.log(payload)
            return {...state, id, firstName: first_name, lastName: last_name, email};
        case CLEAR_PATIENT: 
            return {...state, id: 0, firstName: '', lastName: '', email: ''}
        default:
        return state;

    }
}