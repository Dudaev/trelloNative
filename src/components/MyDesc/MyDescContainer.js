import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyDesc from './MyDesc';
import {setColumns, setColumnsThunk, removeList} from '../../redux/actions';

class MyDescContainer extends React.Component {
    componentDidMount() {
        this.props.setColumnsThunk(this.props.state.authorReducer.token);
        //берёт токен из редакса и делает запрос на апи
    }

    render() {
        return (
            <MyDesc
                // columns={this.props.state.columnsReducer}
                navigation={this.props.navigation}
                removeList={this.props.removeList}
            />
        );
    }
}

// const MyDescContainer = props => {
//     useEffect(() => {
//         props.setColumnsThunk(props.state.authorReducer.token);
//     });
//     return (
//       <MyDesc
//         columns={props.state.columnsReducer}
//         navigation={props.navigation}
//         removeList={props.removeList}
//       />
//     );
// }

MyDescContainer.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
  getColumns: PropTypes.func,
  removeList: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { setColumns, removeList, setColumnsThunk })(MyDescContainer);
