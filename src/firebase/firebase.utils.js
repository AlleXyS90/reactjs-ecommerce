import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBWewI2N9ZZQOuf6B1PIDUv6n3kE1fzj0s",
    authDomain: "reactjs-ecommerce.firebaseapp.com",
    databaseURL: "https://reactjs-ecommerce.firebaseio.com",
    projectId: "reactjs-ecommerce",
    storageBucket: "reactjs-ecommerce.appspot.com",
    messagingSenderId: "794029479633",
    appId: "1:794029479633:web:4e8b9e7d86f4a681b2d7f0",
    measurementId: "G-BZRJ540H9V"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
