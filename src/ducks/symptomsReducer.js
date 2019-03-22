const initialState = {
  id: 0,
  cId: 0,
  symptoms: [],
  conditions: []
};

const UPDATE_SYMPTOMS = "UPDATE_SYMPTOMS";
const CLEAR_SYMPTOMS = "CLEAR_SYMPTOMS";
const UPDATE_CONDITIONS = 'UPDATE_CONDITIONS';
const CLEAR_CONDITIONS = 'CLEAR_CONDITIONS';

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

export function updateConditions(conditions) {
  return {
    type: UPDATE_CONDITIONS,
    payload: conditions
  };
}

export function clearConditions() {
  return {
    type: CLEAR_CONDITIONS
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SYMPTOMS:
      const symptoms = payload;
      return { ...state, symptoms }; // returning initialState to FE component
    case CLEAR_SYMPTOMS:
      return { ...state, id: 0, symptoms: "" };
      case UPDATE_CONDITIONS:
      const conditions = payload;
      return {...state, conditions};
      case CLEAR_CONDITIONS:
      return {...state, cId: 0, conditions: ''};
    default:
      return state;
  }
}
