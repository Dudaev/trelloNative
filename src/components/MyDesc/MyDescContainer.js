import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyDesc from './MyDesc';
import { getColumns, removeList } from '../../redux/actions';

class MyDescContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`http://trello-purrweb.herokuapp.com/columns`, {
        headers: { Authorization: 'Bearer bdaa158a4b624d0bca108a027905a7c0d2f5bd6074806ec0bf5cb76ea4f2b7fd' },
      })
      .then(response => {
        this.props.getColumns(response.data);
      });
  }

  render() {
    return (
      <MyDesc
        columns={this.props.state.columnsReducer}
        navigation={this.props.navigation}
        removeList={this.props.removeList}
      />
    );
  }
}

MyDescContainer.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
  getColumns: PropTypes.func,
  removeList: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { getColumns, removeList })(MyDescContainer);
