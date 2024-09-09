<script>
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="row">
    <div class="column"><h1>Forgot Password</h1></div>
</div>

<AuthForm btnName="Send Reset Link" showPassword={false} />
    <hr />
<svelte:head>
	<title>Book Lovers - ForgotPassword</title>
</svelte:head>