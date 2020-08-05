// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import MyDesc from './MyDesc';
// import {setColumns, setColumnsThunk, removeList, removeListThunk} from '../../redux/actions';
//
// class MyDescContainer extends React.Component {
//     componentDidMount() {
//         this.props.setColumnsThunk(this.props.state.authorReducer.token);
//     }
//
//     render() {
//         return (
//             <MyDesc
//                 navigation={this.props.navigation}
//                 removeList={this.props.removeListThunk}
//             />
//         );
//     }
// }
//
// // const MyDescContainer = props => {
// //     useEffect(() => {
// //         props.setColumnsThunk(props.state.authorReducer.token);
// //     });
// //     return (
// //       <MyDesc
// //         columns={props.state.columnsReducer}
// //         navigation={props.navigation}
// //         removeList={props.removeList}
// //       />
// //     );
// // }
//
// MyDescContainer.propTypes = {
//   state: PropTypes.object,
//   navigation: PropTypes.object,
//   getColumns: PropTypes.func,
//   removeList: PropTypes.func,
// };
//
// const mapStateToProps = state => ({
//   state,
// });
// export default connect(mapStateToProps, { setColumns, removeList, setColumnsThunk, removeListThunk })(MyDescContainer);
