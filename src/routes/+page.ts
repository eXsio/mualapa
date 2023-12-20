import {initializeFirebase} from "$lib/firebase.client";
import { browser } from '$app/environment';

export async function load(): Promise<void> {
    if (browser) {
        initializeFirebase();
    }
}