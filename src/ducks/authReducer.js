const initialState = {
  id: 0,
  dId: 0,
  firstName: "",
  dFirstName: "",
  lastName: "",
  dLastName: "",
  gender: "",
  age: 0,
  height: 0,
  weight: 0,
  email: "",
  dEmail: "",
  patients: []
};

const UPDATE_PATIENT = "UPDATE_PATIENT";
const CLEAR_PATIENT = "CLEAR_PATIENT";
const UPDATE_DOCTOR = "UPDATE_DOCTOR";
const CLEAR_DOCTOR = "CLEAR_DOCTOR";

export function updatePatient(patient) {
  return {
    type: UPDATE_PATIENT,
    payload: patient
  };
}

export function clearPatient() {
  return {
    type: CLEAR_PATIENT
  };
}

export function updateDoctor(doctor) {
  return {
    type: UPDATE_DOCTOR,
    payload: doctor
  };
}

export function clearDoctor() {
  return {
    type: CLEAR_DOCTOR
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PATIENT:
      const {
        id,
        first_name,
        last_name,
        gender,
        age,
        height,
        weight,
        email
      } = payload;
      // console.log('this is payload', payload)
      return {
        ...state,
        id,
        firstName: first_name,
        lastName: last_name,
        gender,
        age,
        height,
        weight,
        email
      };
    case CLEAR_PATIENT:
      return {
        ...state,
        id: 0,
        firstName: "",
        lastName: "",
        gender: "",
        age: 0,
        height: 0,
        weight: 0,
        email: ""
      };
    case UPDATE_DOCTOR:
      const {
        id: dId,
        first_name: dFirstName,
        last_name: dLastName,
        email: dEmail
      } = payload;
      // console.log('ooooy', payload)
      return {
        ...state,
        dId,
        dFirstName,
        dLastName,
        dEmail
      };
    case CLEAR_DOCTOR:
      return {
        ...state,
        dId: 0,
        dFirstName: "",
        dLastName: "",
        dEmail: ""
      };
    default:
      return state;
  }
}
