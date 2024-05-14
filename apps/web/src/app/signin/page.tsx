'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useLoginWithEmailAndPassword } from '@api/useAuthentication';
import { useAuth } from '@providers/AuthProvider';
import Loading from '@components/Loading';
import { errors } from '@config/firebase';
import GoogleSignIn from './components/GoogleSignIn';

const initialValues = {
  email: '',
  password: '',
};
const SignIn = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: { user }, dispatch, loading: authLoading } = useAuth();
  const { mutateAsync: signinWithEmailAndPassword, isPending } = useLoginWithEmailAndPassword();

  const onSubmit = async (values: typeof initialValues) => {
    const { email, password } = values;
    try {
      setError('');
      const login = await signinWithEmailAndPassword({ email, password });
      dispatch({ type: 'USER', payload: login });
    } catch (err) {
      const e = err as FirebaseError;
      setError(errors[e?.code || 'auth/internal-error'] || '');
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading, router]);

  return (loading || authLoading) ? <Loading /> : (
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
        {!!error && (
          <div className="border-red-400 bg-red-100 p-4 mt-5 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <BsExclamationCircleFill fill='red' />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
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
                <button type="submit" className="btn-primary" disabled={isPending}> Sign in </button>
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
      </div>
    </div>
  );
};

export default SignIn;
