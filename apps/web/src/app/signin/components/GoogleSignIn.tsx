import React from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '@config/firebase';
import showAlert from '@shared/functions/showAlert';
import { useAuth } from '@providers/AuthProvider';
import { useAuthenticateWithProvider } from '@api/useAuthentication';

const GoogleSignIn = () => {
  const { mutateAsync: authWithProvider } = useAuthenticateWithProvider();
  const { dispatch } = useAuth();
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const { user: { displayName, email, photoURL: avatar, uid: firebaseId }, providerId } = response;
      const payload = {
        displayName, email, avatar, firebaseId, providerId,
      };
      await authWithProvider(payload);
      dispatch({ type: 'SET_IS_LOGGED', payload: true });
      dispatch({ type: 'USER', payload: response.user });
      router.replace('/');
    } catch (error) {
      showAlert({ text: 'Error', icon: 'error' });
    }
  };

  return (
    <button
      aria-label="Sign in with Google"
      type="button"
      className="btn-google"
      onClick={() => handleSignInWithGoogle()}
    >
      <div className="flex items-center bg-white w-9 h-9 rounded-l">
        <FcGoogle />
      </div>
      <span className="text-sm text-google-text-gray tracking-wider">Continue with Google</span>
    </button>
  );
};

export default GoogleSignIn;
