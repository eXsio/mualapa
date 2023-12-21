<script lang="ts">
    import '../app.pcss';
    import 'leaflet/dist/leaflet.css';;
    import {goto} from '$app/navigation';
    import {auth, firestore, initializeFirebase} from '$lib/firebase.client';
    import {FirebaseApp, SignedIn, SignedOut} from "sveltefire";
    import {ArrowLeftToBracketOutline} from 'flowbite-svelte-icons';
    import {browser} from '$app/environment';
    import {Spinner} from 'flowbite-svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,
        Dropdown,
        DropdownItem,
        DropdownHeader,
        DropdownDivider
    } from 'flowbite-svelte';
    import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

    let loaded: boolean = false;
    if (browser) {
        loaded = initializeFirebase();
    }

    async function loginWithGoogle() {
        await loginWith(new GoogleAuthProvider());
    }

    async function loginWith(provider) {
        await signInWithPopup(auth, provider)
            .then((result) => {

            })
            .catch((error) => {
                return error;
            });
    }

    import { page } from '$app/stores';
    $: activeUrl = $page.url.pathname;
</script>

{#if !loaded}
  <div class="loader">
    <Spinner size="12"></Spinner>
  </div>
{/if}

<FirebaseApp {auth} {firestore}>
  <Navbar>
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-3 main-color">MUALAppka</span>
    </NavBrand>

    <SignedIn let:user let:signOut>
      <div class="flex items-center md:order-2" >
        <Avatar id="avatar-menu" src="{user.photoURL ?? ''}" referrerPolicy="no-referrer"/>
        <NavHamburger class1="w-full md:flex md:w-auto md:order-1"/>
      </div>
      <Dropdown placement="bottom" triggeredBy="#avatar-menu" style="z-index: 1000">
        <DropdownHeader>
          <span class="block text-sm main-color" style="font-weight: bold">{user.displayName}</span>
        </DropdownHeader>
        <DropdownDivider/>
        <DropdownItem on:click={signOut}>
          <div style="display: flex;">
            <ArrowLeftToBracketOutline size="sm" class="mt-1"/>
            <span class="ml-3"> Wyloguj się</span></div>
        </DropdownItem>
      </Dropdown>
    </SignedIn>

    <SignedOut>
      <div class="flex items-center md:order-2 z-10">
        <Avatar id="avatar-menu"/>
        <NavHamburger class1="w-full md:flex md:w-auto md:order-1"/>
      </div>
      <Dropdown placement="bottom" triggeredBy="#avatar-menu"  style="z-index: 1000">
        <DropdownItem on:click={loginWithGoogle}>
          <div style="display: flex;">
            <Avatar size="xs" id="google-login" src="google.png"/>
            <span class="ml-3">Zaloguj się z Google</span></div>
        </DropdownItem>
      </Dropdown>
    </SignedOut>

    <NavUl {activeUrl}>
      <NavLi href="/" active={true}>Zobacz Miejsca</NavLi>
      <NavLi href="/about">Co tu się odpierMUALA?</NavLi>
    </NavUl>
  </Navbar>

  <div class="p-8" style="display: flex; flex-direction: column; flex-grow: 100; height: 100%">
    <slot auth="{auth}" firestore="{firestore}"/>
  </div>
</FirebaseApp>
