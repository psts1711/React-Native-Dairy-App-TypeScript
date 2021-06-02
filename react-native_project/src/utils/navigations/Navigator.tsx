import {NavigationContainer} from '@react-navigation/native';
import {appStack, authStack} from './Routes';
import * as React from 'react';
import {connect} from 'react-redux'
import {RootReducerState} from "../../redux/reducers";
import {AsyncStorageService} from "../../services/AsyncStorage";
import {UserActions} from "../../redux/actions/UserActions";
import If from "../../components/If";
import {ActivityIndicator} from "react-native";

interface Props {
  loggedIn: boolean;
  updateUser: any;
}

interface State {
  isLoading: boolean
}

class Navigator extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  };

  async componentDidMount() {
   const user = await AsyncStorageService.getUser();
   if(user) {
     this.props.updateUser(user);
     this.setState({
       isLoading: false
     })
   }else {
     this.setState({
       isLoading: false
     })
   }
  }


  render(){
    return <NavigationContainer>
      <If show={this.state.isLoading}>
        <ActivityIndicator size="large" color="#00ff00" />
      </If>

      <If show={!this.state.isLoading}>
        {this.props.loggedIn ? appStack() : authStack()}
      </If>


    </NavigationContainer>;
  }

}

const mapStateToProps = (state:RootReducerState) =>({
  loggedIn: state.userReducer.loggedIn
});

const mapDispatchToProps = dispatch => ({
  updateUser: (user)=>dispatch(UserActions.UserUpdateAction(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

/*
export const Navigator = () => {
  return <NavigationContainer>{appStack()}</NavigationContainer>;
};
*/
