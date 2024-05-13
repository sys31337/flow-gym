import { checkUserExistance } from '@shared/functions/user';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required').test(
    'Unique Email',
    'Email already in use',
    (email) => new Promise((resolve, _reject) => {
      checkUserExistance(email)
        .then((message) => {
          if (message === 'EMAIL_NOT_IN_USE') resolve(true);
          if (message === 'EMAIL_IN_USE') resolve(false);
        })
        .catch((error) => {
          if (error.response.status === 409) {
            resolve(false);
          }
        });
    }),
  ),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirm: Yup.string().oneOf([Yup.ref('password'), ''], "Passwords don't match").required(),
});

export default SignupSchema;
