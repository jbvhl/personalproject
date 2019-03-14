const initialState = {
  id: 0,
  location: "",
  symptoms: []
};

const UPDATE_SYMPTOMS = "UPDATE_SYMPTOMS";
const CLEAR_SYMPTOMS = "CLEAR_SYMPTOMS";

export function updateSymptoms(diagnose) {
  return {
    type: UPDATE_SYMPTOMS,
    payload: diagnose
  };
}

export function clearSymptoms() {
  return {
    type: CLEAR_SYMPTOMS
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SYMPTOMS:
      const { id, location, symptom } = payload;
      console.log('merrrrp', payload)
      console.log('oi', location)
      return { ...state, id, location, symptoms:symptom };
    case CLEAR_SYMPTOMS:
      return { ...state, id: 0, location: "", symptoms: "" };
    default:
      return state;
  }
}
