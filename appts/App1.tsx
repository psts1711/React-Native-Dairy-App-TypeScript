import * as React from 'react';
import {View, TextInput, Text, SafeAreaView, StyleSheet, Button, Dimensions} from 'react-native';
import Container from "./src/components/Container";
import CustomButton from "./src/components/CustomButton";
import {PrimaryTheme} from "./src/styles/Themes";
import {Formik} from 'formik';
import {Validators} from "./src/utils/validators";

interface State {
form:{
    emailTextInput: string,
    passwordTextInput: string
};
orientation: string;

}

interface Props {
    
}

enum InputType {
    Email = 'email',
    Password = 'password'
}

export class App extends React.Component<Props, State>{
    private passwordInputRef;
    constructor(props){
        super(props);
        this.state={
            form:{
                emailTextInput: '',
                passwordTextInput: '',
            },
            orientation:'potrait'
        };
    }

    componentDidMount(): void {
        Dimensions.addEventListener('change',(data)=>{
            const isPotrait = data.window.height > data.window.width
            this.setState({orientation: isPotrait ? 'potrait' : 'landscape'})
        })
    }

    componentWillUnmount(): void {
        Dimensions.removeEventListener('change', ()=>{

        })
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

    handleLogin = ()=>{
        console.log('login')
    }


    render(){
        const {height, width} = Dimensions.get('window');

        return (
           // <Container containerStyle={{alignItems:'center', backgroundColor:'red'}}>

           // <TextInput onChangeText={(val)=>this.updateTextInput(val,InputType.Password)}
                 //      style={{width:300, borderWidth:1, marginBottom:10}}
                    //   placeholder={'Password'} value={this.state.passwordTextInput}/>

           <Container containerStyle={{alignItems:'center'}}>

               <Text style={potraitStyle.pageTitle}>Login</Text>

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
                                          style={this.state.orientation === 'potrait' ? potraitStyle.textInput : landScapeStyle.textInput}
                                          placeholder={'Email'}
                                         /* value={this.state.form.emailTextInput} */
                                          value={props.values.emailTextInput} />

                               {props.dirty && props.touched.emailTextInput ? <Text style={potraitStyle.error}>{props.errors.emailTextInput}</Text> : null}


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
                                            style={this.state.orientation === 'potrait' ? potraitStyle.textInput : landScapeStyle.textInput}
                                          placeholder={'Password'}
                                          value={props.values.passwordTextInput}
                                         /* value={this.state.form.passwordTextInput}*/ />

                               {props.dirty && props.touched.passwordTextInput ? <Text style={potraitStyle.error}>{props.errors.passwordTextInput}</Text>  : null}

                               <CustomButton disabled={!props.isValid} onPress={()=>{
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
           </Container>

        )
    }
}

const potraitStyle = StyleSheet.create({
     textInput:{
         width:300,
         borderWidth:1,
         marginBottom:10
     },
    pageTitle:{
        fontSize: 36,
        marginBottom: 10,
        letterSpacing: 2,
        fontFamily: 'mulim',
        color: PrimaryTheme.$TEXT_COLOR_900
    },
    error:{
         color: 'red',
        marginBottom: 10
    }
})

const landScapeStyle = StyleSheet.create({
    textInput:{
        ...potraitStyle.textInput, width: 500
    }
})