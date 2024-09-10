<script>
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageData} */
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
    import { registerWithEmailAndPassword } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';
    import { afterLogin } from '$lib/helpers/route.helper';
	import { page } from '$app/stores';

    async function register(e) {
        try {
            const form = new FormData(e.target);
            const email = form.get('email');
            const password = form.get('password');  
            if (!email || !password) {
                messagesStore.showError('Email and password are required');
                return;
            }

            if (password.length < 6) {
                messagesStore.showError('Password must be at least 6 characters');
                return;
            }

            const user = await registerWithEmailAndPassword(email, password);
            messagesStore.showSuccess('Account created successfully');
			await afterLogin($page.url, user.uid);
            console.log(user);
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                messagesStore.showError('Email already in use');
                await goto('/login');
            }
            console.log(e.code);
            messagesStore.showError(e.message);
        }
    }
</script>

<div class="row">
	<div class="col">
		<h1>Sign Up</h1>
	</div>
</div>
<hr />
<AuthForm btnName="Sign Up!" on:submit={register}/>
<hr />
<LoginWithGoogle />
<svelte:head>
	<title>Book Lovers - Sign Up</title>
</svelte:head>