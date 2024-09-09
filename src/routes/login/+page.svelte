<script>
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
	import { loginWithEmailAndPassword } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';

	async function onLogin(e) {
		try {
			const form = new FormData(e.target);
			const email = form.get('email');
			const password = form.get('password');
			if (!email || !password) {
				messagesStore.showError('Email and password are required');
				return;
			}

			const user = await loginWithEmailAndPassword(email, password);
		} catch (error) {
			if (['auth/user-not-found', 'auth/wrong-password'].includes(error.code)) {
				messagesStore.showError('Invalid email or password');
				return;
			}
			console.log(error.code);
			messagesStore.showError(error.message);
		}
	}
</script>

<div class="row">
	<div class="col">
		<h1>Login</h1>
	</div>
</div>

<svelte:head>
	<title>Login</title>
</svelte:head>

<hr />
<AuthForm on:submit={onLogin} btnName="Login!" />
<hr />
<LoginWithGoogle />
<hr />
<div class="row">
	<div class="column">
		<a href="/forgot-password" class="btn btn-warning w-100">Forgot Password</a>
	</div>
</div>
