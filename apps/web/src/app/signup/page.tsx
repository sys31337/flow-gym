'use client';

import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import { useCreateAccount } from '@api/useAuthentication';
import SignupSchema from '@validators/signup';
import showAlert from '@functions/showAlert';

const SignUp = () => {
  const router = useRouter();
  const { mutateAsync: createAccount } = useCreateAccount();
  const initialValues = {
    fullname: '',
    email: '',
    password: '',
    confirm: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await createAccount(values);
      showAlert({ text: 'You account was created successfully', icon: 'success' });
      router.push('/signin');
    } catch (error) {
      showAlert({ text: 'Error', icon: 'error' });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          FlowBitGym
        </h1>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <div className="mt-2">
                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                <Field name="fullname" className={`form-control ${errors.fullname && touched.fullname ? 'invalid-input' : null}`} />
                {errors.fullname && touched.fullname ? (
                  <p className="text-red-600 text-xs">{errors.fullname}</p>
                ) : null}
              </div>
              <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <Field name="email" className={`form-control ${errors.email && touched.email ? 'invalid-input' : null}`} />
                {errors.email && touched.email ? (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                ) : null}
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <Field name="password" className={`form-control ${errors.password && touched.password ? 'invalid-input' : null}`} />
                {errors.password && touched.password ? (
                  <p className="text-red-600 text-xs">{errors.password}</p>
                ) : null}
              </div>
              <div className="mt-2">
                <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
                <Field name="confirm" className={`form-control ${errors.confirm && touched.confirm ? 'invalid-input' : null}`} />
                {errors.confirm && touched.confirm ? (
                  <p className="text-red-600 text-xs">{errors.confirm}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <button type="submit" className="btn-primary" disabled={!isValid}> Sign up </button>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">or</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link href="/signin" as="/signin" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            login to your account
          </Link>
        </p>
      </div>
    </div >
  );
};

export default SignUp;
