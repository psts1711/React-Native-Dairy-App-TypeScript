import * as yup from 'yup';

export class Validators {
    static loginValidator(){
return yup.object().shape({
    emailTextInput: yup.string().email("Not a valid e-mail").required('Email is Required'),
    passwordTextInput: yup.string().required('No Password Provided')
});
    }
}
