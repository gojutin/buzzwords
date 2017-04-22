import { connect } from 'react-redux';
import { fetchData, deleteBuzzword, addBuzzword, toggleModal } from '../actions/index';
import App from '../app';

const mapStateToProps = (state) => ({
  buzzwords: state.buzzwords,
    dataLoaded: state.dataLoaded,
    modalOpen: state.modalOpen,
})

const mapDispatchToProps = {
  fetchData,
  deleteBuzzword,
  addBuzzword,
  toggleModal 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
