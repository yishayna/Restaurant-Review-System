import React from 'react';
import './Profiles.scss';
import {connect} from 'react-redux';
import ProfilesActions from './actions'
import  '@material-ui/icons';
import 'typeface-roboto';
import {useStyles} from './index';
import {withStyles} from '@material-ui/core/styles';

import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    FormControl,
    LinearProgress,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Box,
   
  } from '@material-ui/core';

  
class Profiles extends React.Component {

    componentDidMount() {
        console.log("did mount of Profiles")
        this.props.getAllUsers();
    }
    onChange =  event => {this.props.onChangeValue(event.target.name, event.target.value)}

    renderTableData() {
    const {users}  = this.props;
    console.log(users)
    return users.map((user) => {
        const {_id, username, location } = user //destructuring
        return (
            <tr key={_id}>
            <td>{username}</td>
            <td>{location.location}</td>
            </tr>
        )
    })
    }


    renderTable() {
        const {users} = this.props;
        if(users){
        return(
        <div>
        <h1 id='title'>Profiles </h1>
        <table id='profiles'>
        <tbody>
            <tr>
                <th > username </th>
                <th > location </th>          
            </tr>
            {this.renderTableData()}
        </tbody>
        </table>
        </div>
        )
        }
        else{
            return (
                <Typography component="h1" variant="h1">
                No Users System!  
                </Typography>
            )
        }
    }   

render() {
    console.log("render");
    console.log(this.props.users);
        return (
            <Box>
                <Card>
                    <Container component="main" maxWidth="md" >
                        <CssBaseline />
                        { this.renderTable()}
                    </Container>
                </Card>
            </Box>
        );
    }
    }

// AVOID .toJS() in mapStateToProps
const mapStateToProps = (state) => {
    console.log("users im map to props")
    console.log(state['Profiles'].get('users'))
    return {
        users:              state['Profiles'].get('users'),
        completed:          state['Profiles'].get('completed'),
        error:              state['Profiles'].get('error'),
    }
};
  
const mapDispatchToProps = (dispatch) => {
    console.log("Profiles dispach");
    return {
        onChangeValue: (name, value) => dispatch(ProfilesActions.changeValue(name, value)),
        getAllUsers: () => dispatch(ProfilesActions.getAllUsers()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Profiles));
