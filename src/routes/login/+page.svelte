<script lang="ts">
    import {auth} from '$lib/firebase.client';
    import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
    import {goto} from '$app/navigation';
    import {SignedIn, SignedOut} from "sveltefire";

    let email: string = '';
    let password: string = '';

    async function loginWithMail() {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                goto('/');
            })
            .catch((error) => {
                return error;
            });
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                goto('/');
            })
            .catch((error) => {
                return error;
            });
    }
</script>

<SignedOut>
<div class="login-form">
  <h1>Login</h1>
  <form on:submit={loginWithMail}>
    <input bind:value={email} type="text" placeholder="Email"/>
    <input bind:value={password} type="password" placeholder="Password"/>
    <button type="submit">Login</button>
  </form>

  <div>or</div>

  <button on:click={loginWithGoogle}>Login with Google</button>
  <div>Don't you have an account? <a href="/register"> Register</a></div>
</div>
</SignedOut>

<SignedIn>
  {goto('/')}
</SignedIn>