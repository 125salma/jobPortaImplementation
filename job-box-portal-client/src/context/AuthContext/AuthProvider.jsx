import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    // const updateUserProfile = (name, photo) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: photo
    //     })

    // }
    //upload user name photo
    const updateUserProfile = (name, photo) => {
        console.log(name,photo)
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            }).then(() => {
                return auth.currentUser.reload(); // reload দিচ্ছি যাতে updated info পাওয়া যায়
            });
        }
    };

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            console.log(auth.currentUser)
            // Set a timeout to ensure the user profile is fully reloaded
            setTimeout(async () => {
                await currentUser.reload(); // Reload user profile to get updated data
                const refreshedUser = auth.currentUser;
                console.log(refreshedUser)

                console.log('Reloaded User Info:');
                console.log('name:', refreshedUser?.displayName);
                console.log('email:', refreshedUser?.email);
                console.log('photo:', refreshedUser?.photoURL);

                setUser(refreshedUser);

                // Send user data to backend
                const userData = {
                    email: refreshedUser?.email,
                    name: refreshedUser?.displayName || 'Anonymous',
                    photo: refreshedUser?.photoURL || 'default_photo_url',
                };

                axios.post('http://localhost:5000/jwt', userData, { withCredentials: true })
                    .then(res => {
                        console.log('login token', res.data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log('Error in sending user data', err);
                    });
            }, 1000); // 500ms delay to allow profile reload

        } else {
            // If the user is not logged in
            setUser(null);

            axios.post('http://localhost:5000/logOut', {}, { withCredentials: true })
                .then(res => {
                    console.log('logOut token', res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log('Error in logging out', err);
                });
        }
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
}, []);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);

    //         console.log('state captured', auth.currentUser);
    //         console.log('name:', currentUser?.displayName)
    //         console.log('email:', currentUser?.email);
    //         console.log('photo:', currentUser?.photoURL)

    //         if (currentUser?.email) {

    //             // const user = { email: currentUser.email };
    //             const user = {
    //                 email: currentUser.email,
    //                 name: currentUser.displayName,
    //                 photo: currentUser.photoURL,
    //             };
    //             console.log(user.name)
    //             axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
    //                 .then(res => {

    //                     console.log('login token', res.data);
    //                     setLoading(false);
    //                 })

    //         }
    //         else {
    //             axios.post('http://localhost:5000/logOut', {}, { withCredentials: true })
    //                 .then(res => {

    //                     console.log('logOut token', res.data);
    //                     setLoading(false)
    //                 })
    //         }

    //     })

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        singInWithGoogle,
        signOutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;