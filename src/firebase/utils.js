import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider =  new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


// Guardo el usuario en la db
export const handleUserProfile = async (userAuth, additionalData) => {
    // Checkeo si es un usuario real
    if (!userAuth) return;

    // Checkeo si el usuario esta en la coleccion
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`); // Returnea una referencia
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            })

        } catch (err) {
            console.log(err);
        }
    }
    return userRef;
}