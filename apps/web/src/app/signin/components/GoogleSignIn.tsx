import React from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
  const onButtonClick = () => signIn('google');
  return (
    <button
      aria-label="Sign in with Google"
      type="button"
      className="flex items-center justify-center font-semibold bg-white border border-button-border-light rounded-md p-0.5 pr-3"
      onClick={onButtonClick}
    >
      <div className="flex items-center bg-white w-9 h-9 rounded-l">
        <FcGoogle />
      </div>
      <span className="text-sm text-google-text-gray tracking-wider">Sign in with Google</span>
    </button>
  );
};

export default GoogleSignIn;
