import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import Cookies from "js-cookie";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Login with Email and Password
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser(userCredential.user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Register with Email and Password
  const registerWithEmail = async (
    email,
    password,
    { displayName, photoURL }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName, photoURL });
      const token = await userCredential.user.getIdToken();
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser(userCredential.user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      setUser(result.user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("token");
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdToken().then((token) => {
          Cookies.set("token", token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
          setUser(firebaseUser);
        });
      } else {
        Cookies.remove("token");
        setUser(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
    loading,
    loginWithEmail,
    loginWithGoogle,
    registerWithEmail,
    logout,
    token: Cookies.get("token"),
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#000"} loading={loading} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
