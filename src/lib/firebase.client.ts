import type {FirebaseApp} from 'firebase/app';
import {initializeApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';
import {browser} from '$app/environment';
import {env} from "$env/dynamic/public";
import type {FirebaseOptions} from "@firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

export let app: FirebaseApp;
export let auth: Auth;
export let firestore: Firestore;

const firebaseConfig: FirebaseOptions = {
    apiKey: env.PUBLIC_API_KEY,
    authDomain: env.PUBLIC_AUTH_DOMAIN,
    projectId: env.PUBLIC_PROJECT_ID,
    storageBucket: env.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
    appId: env.PUBLIC_APP_ID
};

export const initializeFirebase = (): boolean => {
    if (!browser) {
        throw new Error("Can't use the Firebase client on the server.");
    }
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
    }
    return true;
};
