import React from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => (
  <button
    aria-label="Sign in with Google"
    type="button"
    className="btn-google"
    onClick={() => signIn('google')}
  >
    <div className="flex items-center bg-white w-9 h-9 rounded-l">
      <FcGoogle />
    </div>
    <span className="text-sm text-google-text-gray tracking-wider">Continue with Google</span>
  </button>
);

export default GoogleSignIn;
