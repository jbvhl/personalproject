const initialState = {
  id: 0,
  location: "",
  symptoms: []
};

const UPDATE_SYMPTOMS = "UPDATE_SYMPTOMS";
const CLEAR_SYMPTOMS = "CLEAR_SYMPTOMS";

export function updateSymptoms(symptoms) {
  return {
    type: UPDATE_SYMPTOMS,
    payload: symptoms
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
      const symptoms = payload;
      return { ...state, symptoms }; // returning initialState to FE component
    case CLEAR_SYMPTOMS:
      return { ...state, id: 0, location: "", symptoms: "" };
    default:
      return state;
  }
}
