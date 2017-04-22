import { reset } from 'redux-form';
import { TOGGLE_MODAL } from './types';

export const toggleModal = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MODAL,
    })
    dispatch(reset('addForm'));
  }
}