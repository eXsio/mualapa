<script lang="ts">
    import {goto} from '$app/navigation';
    import {auth, firestore} from '$lib/firebase.client';
    import {FirebaseApp, SignedIn, SignedOut} from "sveltefire";
</script>

<FirebaseApp {auth} {firestore}>
  <div>
    <SignedIn let:user let:signOut>
      <p>Howdy, {user.displayName}</p>
      <button on:click={signOut}>Sign Out</button>
    </SignedIn>
    <SignedOut let:auth>
      <button on:click={() => goto('/login')}>Sign In</button>
    </SignedOut>
    <slot/>
  </div>
</FirebaseApp>
