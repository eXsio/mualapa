import type {FirebaseApp} from 'firebase/app';
import {initializeApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import {getAuth} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';
import {browser} from '$app/environment';
import {env} from "$env/dynamic/public";
import type {User} from "@firebase/auth";
import {getFirestore} from "firebase/firestore";

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

export let firestore: Firestore;

const firebaseConfig = {
    apiKey: env.PUBLIC_API_KEY,
    authDomain: env.PUBLIC_AUTH_DOMAIN,
    projectId: env.PUBLIC_PROJECT_ID,
    storageBucket: env.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
    appId: env.PUBLIC_APP_ID
};

export const initializeFirebase = () => {
    // if (!browser) {
    //     throw new Error("Can't use the Firebase client on the server.");
    // }
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
    }
};

export function loggedIn(): boolean {
    console.log(auth);
    console.log(auth.currentUser !== null);
    return auth.currentUser !== null;
}

export function getUser(): User | null {
    return auth.currentUser;
}
