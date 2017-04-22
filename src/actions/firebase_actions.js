import firebase from 'firebase';
import { FETCH_DATA, DATA_LOADED, TOGGLE_MODAL } from './types';

const db = firebase.database();

export const fetchData = () => {
  return dispatch => {
    db.ref('buzzwords').orderByChild("buzzword").on('value', snap => {
      let buzzwordsArray = [];
      snap.forEach(buzzword => {
        buzzwordsArray.push({
          id: buzzword.key,
          buzzword: buzzword.val().buzzword,
          definition: buzzword.val().definition,
        });
      });
        dispatch({
          type: FETCH_DATA,
          payload: buzzwordsArray,
      });
        dispatch({
          type: DATA_LOADED,
          payload: true,
      });
    })
  }
}

export const deleteBuzzword = (id, buzzword) => {
    return dispatch => {
      if (window.confirm(`Are you sure you want to delete ${buzzword}?`)) {
  return new Promise((resolve, reject) => {
      db.ref('buzzwords').child(id).remove().then(() => resolve());
    })
  }
  }
}

export const addBuzzword = ({buzzword, definition}) => {
  return dispatch => {
  if (!buzzword || !definition){
    return;
  }
    db.ref('buzzwords').push({
      buzzword,
      definition,
    }).then(() => {
      dispatch({
        type: TOGGLE_MODAL,
      });
    })
  }
}
