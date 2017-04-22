import { connect } from 'react-redux';
import { fetchData, deleteBuzzword, addBuzzword, toggleModal } from '../actions/index';
import App from '../app';

export default connect(
 state => ({
  buzzwords: state.buzzwords,
  dataLoaded: state.dataLoaded,
  modalOpen: state.modalOpen,
 }),
{ fetchData, deleteBuzzword, addBuzzword, toggleModal })(App)