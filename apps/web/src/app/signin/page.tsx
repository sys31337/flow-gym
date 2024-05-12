'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useCreateAccount } from '@api/useAuthentication';
import showAlert from '@shared/functions/showAlert';
import GoogleSignIn from './components/GoogleSignIn';

const SignIn = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const { mutateAsync: cr } = useCreateAccount();

  const onClickB = () => {
    console.log(cr({ email: 'test', password: 'test' }));
  };

  const router = useRouter();
  const onSubmit = async (values: typeof initialValues) => {
    signIn('credentials', { ...values, redirect: false })
      .then((res) => {
        if (res?.ok) {
          router.push('/');
        } else {
          showAlert({ text: 'Credentials do not match!', icon: 'error' });
        }
      }).catch(() => {
        showAlert({ text: 'Credentials do not match!', icon: 'error' });
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          FlowBitGym
        </h1>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <Field name="email" className={'form-control'} />
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <Field name="password" className={'form-control'} />
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <button type="submit" className="btn-primary"> Sign in </button>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">or</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <GoogleSignIn />
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link href="/signup" as="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            Start a 14 day free trial
          </Link>
        </p>
        <button onClick={onClickB} className="btn-primary"> onClickB </button>
      </div>
    </div>
  );
};

export default SignIn;
