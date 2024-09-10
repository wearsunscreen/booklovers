<script>
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import messagesStore from '$lib/stores/messages.store';
	import { mailResetPasswordEmail } from '$lib/firebase/auth.client';
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	async function sendResetPassword(event) {
		event.preventDefault();
		try {
			const form = new FormData(event.target);
			const email = form.get('email');
			if (!email) {
				messagesStore.showError('Email is required');
				return;
			}
			mailResetPasswordEmail(email);
			messagesStore.showSuccess('Reset link sent');
			goto('/'); // Redirect to home page
		} catch (error) {
            if (error.code === 'auth/user-not-found') {
                messagesStore.showError('User not found');
                return;
            }
			console.error(error);
			messagesStore.showError();
		}
	}
</script>

<div class="row">
	<div class="column"><h1>Forgot Password</h1></div>
</div>

<AuthForm on:submit={sendResetPassword} btnName="Send Reset Link" showPassword={false} />
<hr />
<svelte:head>
	<title>Book Lovers - ForgotPassword</title>
</svelte:head>
