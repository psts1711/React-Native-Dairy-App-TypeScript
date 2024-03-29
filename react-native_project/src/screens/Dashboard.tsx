import * as React from 'react';
import Container from '../components/Container';
import DiaryList from '../components/DiaryList';
import CustomText from '../components/CustomText';
import If from '../components/If';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FloatingAction} from 'react-native-floating-action';
import Icon from '../components/Icon';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {DiaryItem} from '../models/DiaryItem';
import {ScreenNames} from '../utils/navigations/Routes';
import {connect} from 'react-redux';
import {RootReducerState} from '../redux/reducers';
import {Repositry} from '../services/Repositry';
import {ActivityIndicator} from "react-native";
import Error from "../components/Error";
import CustomButton from "../components/CustomButton";
import {AuthRepositry} from "../services/AuthRepositry";

interface Props {
  route: any;
  navigation: any;
  diaryItems: DiaryItem[];
  onDelete: any;
  getDiaryItems: any;
  diaryItemsLoading: boolean;
  diaryItemsLoaded: boolean;
  onLogout: any
}

interface State {
  selectedItem: DiaryItem;
  error: boolean;
    refreshing: boolean;
}

enum ActionTypes {
  VIEW,
  'Edit',
  'Delete',
  'Cancel',
}
class Dashboard extends React.Component<Props, State> {
  private actionSheetRef: any;

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      error: false,
      refreshing: false
    };
  }
 async componentDidMount() {
   await this.fetchData();
  }

 async fetchData(force = false) {
    try {
          await this.props.getDiaryItems(
          {
            loading: this.props.diaryItemsLoading,
            loaded: this.props.diaryItemsLoaded,
          },
          force,
      );
    }catch (e) {
      this.setState({
        error: true,
          refreshing: false
      })
    }

  }

  onRefresh = async () =>{
      this.setState({
          refreshing: true
      });
      await this.fetchData(true);
      this.setState({
          refreshing: false
      });
  };

  actions = [
    {
      text: 'Add',
      name: 'add',
      icon: <Icon name={'add'} />,
      position: 1,
    },
  ];

  handleActionButton = index => {
    switch (index) {
      case ActionTypes.Cancel: {
        this.setState({selectedItem: null});
        break;
      }
      case ActionTypes.Edit: {
        this.onAddOrUpdate();
        break;
      }
      case ActionTypes.VIEW: {
        this.onView();
        break;
      }
      case ActionTypes.Delete: {
        this.onDelete();
      }
    }
  };
  onError=async ()=>{
    this.setState({
      error: false
    });
   await this.fetchData(true);
  };

  onAddOrUpdate() {
    this.props.navigation.navigate(ScreenNames.EDIT_ADD_DIARY_ITEM, {
      diaryItem: this.state.selectedItem,
    });
    this.setState({selectedItem: null});
  }

  onDelete() {
    this.props.onDelete(this.state.selectedItem.id);
    this.setState({selectedItem: null});
  }

  onView() {
    this.props.navigation.navigate(ScreenNames.VIEW_DIARY_ITEM, {
      diaryItem: this.state.selectedItem,
    });
    this.setState({selectedItem: null});
  }

    onLogout=()=>{
      this.props.onLogout
  };

  render() {
    return (
      <Container
        containerStyles={{
          justifyContent: 'flex-start',
        }}>

        <If show={this.props.diaryItemsLoading}>
          <ActivityIndicator size={'large'}/>
        </If>

        <If show={this.state.error}>
          <Error onPress={this.onError}/>
        </If>

        <If show={!!this.props.diaryItems.length}>
          <DiaryList onRefresh={this.onRefresh()} refreshing={this.state.refreshing}
            onPress={val => {
              this.setState({selectedItem: val});
              this.actionSheetRef.show();
            }}
            diaryItems={this.props.diaryItems}
          />
          <CustomButton onPress={this.onLogout} title={'Logout'} />
        </If>
        <If show={!this.props.diaryItems.length && this.props.diaryItemsLoaded}>
          <CustomText style={{width: wp('95%'), textAlign: 'center'}}>
            Currently, No Item is added. Please start adding Items
          </CustomText>
        </If>
        <FloatingAction
          actions={this.actions}
          onPressItem={name => {
            this.onAddOrUpdate();
          }}
        />
        <ActionSheet
          ref={ref => (this.actionSheetRef = ref)}
          title={
            <CustomText style={{color: '#000', fontSize: 18}}>
              Which one do you like?
            </CustomText>
          }
          options={['View', 'Edit', 'Delete', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={2}
          onPress={this.handleActionButton}
        />
      </Container>
    );
  }
}
const mapStateToProps = (state: RootReducerState) => {
  return {
    diaryItems: state.diaryReducer.diaryItems,
    diaryItemsLoading: state.diaryReducer.loading,
    diaryItemsLoaded: state.diaryReducer.loaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(Repositry.deleteDiaryItem(id)),
    getDiaryItems: (status, force) => dispatch(Repositry.getDiaryItems(status, force)),
    onLogout: ()=>dispatch(AuthRepositry.logout())

  };

};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
