import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

const buzzwords = (state=[], action) => {
  switch(action.type) {
    case 'FETCH_DATA':
      return action.payload;
    default:
      return state;
  }
}

const dataLoaded = (state=false, action) => {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.payload;
    default:
      return state;
  }
}

const modalOpen = (state=false, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return !state;
    default:
      return state;
  }
}


export default combineReducers({
  form,
  buzzwords,
  dataLoaded,
  modalOpen,
});