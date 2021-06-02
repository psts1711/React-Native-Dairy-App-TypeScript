import * as React from 'react';
import {View, TextInput, Text, SafeAreaView, StyleSheet, Button, Dimensions, Platform, ScrollView} from 'react-native';
import Container from "./src/components/Container";
import CustomButton from "./src/components/CustomButton";
import {PrimaryTheme} from "./src/styles/Themes";
import {Formik} from 'formik';
import {Validators} from "./src/utils/validators";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange , removeOrientationListener} from 'react-native-responsive-screen';
import {Utils} from "./src/utils/Utils";
import If from "./src/components/If";
import {lComponentStyle, pComponentStyle, Typography} from "./src/styles/Global";
import CustomText from "./src/components/CustomText";
import Icons from "react-native-vector-icons/Ionicons"
interface State {
form:{
    emailTextInput: string,
    passwordTextInput: string
};
orientation: string;
}

interface Props {}


export class App extends React.Component<Props, State>{
    private passwordInputRef;
    constructor(props){
        super(props);
        this.state={
            form:{
                emailTextInput: '',
                passwordTextInput: '',
            },
            orientation: 'potrait'
        };
    }

    componentDidMount(): void {
        listenOrientationChange(this);
    }
    componentWillUnmount(): void {
        removeOrientationListener();
    }

    /*  updateTextInput = (val, type)=>{
         // console.log(val)
         // this.setState({emailTextInput:val})
         // this.setState({passwordTextInput:val})
          switch (type) {
              case InputType.Email:{
                  this.setState({form:{...this.state.form, emailTextInput:val}});
                  break;
              }
              case InputType.Password:{
                  this.setState({form:{...this.state.form, passwordTextInput:val}});
                  break;
              }
          }
      };*/

  /*  handleLogin = ()=>{
        console.log('login')
    }*/


    render(){
     //   const pStyle = potraitStyle();
      //  const lStyle = landScapeStyle();

        return (
           // <Container containerStyle={{alignItems:'center', backgroundColor:'red'}}>

           // <TextInput onChangeText={(val)=>this.updateTextInput(val,InputType.Password)}
                 //      style={{width:300, borderWidth:1, marginBottom:10}}
                    //   placeholder={'Password'} value={this.state.passwordTextInput}/>

           <Container containerStyle={{/*alignItems:'center'*/}}>

               <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center'}} style={{flex:1}}>

                   <Icons name={'lock-closed-outline'} size={50}></Icons>


                   <CustomText style={ [Typography.title, {letterSpacing:2, marginBottom: hp('3%')}] /*pComponentStyle.pageTitle*/ }>Login</CustomText>

                   <Formik
                       initialValues={this.state.form}
                       validateOnMount={true}
                       validateOnChange={true}
                       onSubmit={()=>{console.log('on submit')}}
                       validationSchema={Validators.loginValidator}>

                       {(props)=>{
                           // console.log(props)
                           return (
                               <View style={{alignItems:'center'}}>
                                   <TextInput onSubmitEditing={()=>this.passwordInputRef.focus()}
                                              returnKeyType={'next'}
                                              onChangeText={props.handleChange('emailTextInput')}
                                              onBlur={()=>props.setFieldTouched('emailTextInput')}
                                       // onChangeText={(val)=>this.updateTextInput(val,InputType.Email)}
                                       //potraitStyle.textInput
                                              style={Utils.dynamicStyles(pComponentStyle.textInput, lComponentStyle.textInput, this.state.orientation)}
                                              placeholder={'Email'}
                                       /* value={this.state.form.emailTextInput} */
                                              value={props.values.emailTextInput} />

                                   <If show={props.dirty && props.touched.emailTextInput}>
                                       <CustomText style={[Typography.error]}>{props.errors.emailTextInput}</CustomText>
                                   </If>


                                   {
                                       //props.dirty && props.touched.emailTextInput ?
                                       //  <Text style={pStyle.error}>
                                       //    {props.errors.emailTextInput}
                                       //</Text> : nul
                                   }


                                   <TextInput
                                       onSubmitEditing={()=>{
                                           if(props.isValid){
                                               console.log('is valid')
                                           }else{
                                               console.log('form is not valid')
                                           }
                                       }}
                                       ref={ref=>this.passwordInputRef = ref}
                                       returnKeyType={'go'}
                                       onChangeText={props.handleChange('passwordTextInput')}
                                       onBlur={()=>props.setFieldTouched('passwordTextInput')}
                                       //   onChangeText={(val)=>this.updateTextInput(val,InputType.Password)}
                                       //  style={potraitStyle.textInput}
                                       style={this.state.orientation==='potrait'?pComponentStyle.textInput : lComponentStyle.textInput}
                                       placeholder={'Password'}
                                       value={props.values.passwordTextInput}
                                       /* value={this.state.form.passwordTextInput}*/ />

                                   <If show={props.dirty && props.touched.passwordTextInput}>
                                       <CustomText style={[Typography.error]}>{props.errors.passwordTextInput}</CustomText>
                                   </If>

                                   {
                                       //  props.dirty && props.touched.passwordTextInput
                                       //? <Text style={pStyle.error}>
                                       //  {props.errors.passwordTextInput}</Text>  : null
                                   }

                                   <CustomButton useIcon={true} iconName={'arrow-forward-circle-outline'}
                                                 iconSize={32} iconColor={'white'}
                                                 disabled={!props.isValid} onPress={()=>{
                                       if(props.isValid){
                                           //  console.log('is valid')
                                           return props.handleSubmit();
                                       }else{
                                           // console.log('form is not valid', props.errors)
                                       }
                                   }} title={'Login'} />

                               </View>
                           )
                       }}
                   </Formik>


                   {/*<Button title={'Login'} onPress={this.handleLogin} />*/}


               </ScrollView>

           </Container>

        )
    }
}

const potraitStyle = () => {
   return StyleSheet.create({

    })
}

const landScapeStyle = () => {
    return StyleSheet.create({

    })
}