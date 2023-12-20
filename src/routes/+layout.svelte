<script lang="ts">
    import '../app.pcss';
    import {goto} from '$app/navigation';
    import {auth, firestore, initializeFirebase} from '$lib/firebase.client';
    import {FirebaseApp, SignedIn, SignedOut} from "sveltefire";
    import { Alert } from 'flowbite-svelte';
    import { browser } from '$app/environment';
    if (browser) {
        initializeFirebase();
    }
</script>

<FirebaseApp {auth} {firestore}>
  <div class="p-8">
    <SignedIn let:user let:signOut>
      <Alert color="green">
        <p>Howdy, {user.displayName}</p>
        <button on:click={signOut}>Sign Out</button>
      </Alert>
    </SignedIn>
    <SignedOut let:auth>
      <Alert>
        You are Signed Out!
      <button on:click={() => goto('/login')}>Sign In</button>
      </Alert>
    </SignedOut>
    <slot/>
  </div>
</FirebaseApp>
