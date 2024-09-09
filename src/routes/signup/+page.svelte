<script>
	/** @type {import('./$types').PageData} */
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
</script>

<div class="row">
	<div class="col">
		<h1>Sign Up</h1>
	</div>
</div>
<hr />
<AuthForm btnName="Sign Up!" />
<hr />
<LoginWithGoogle />
<svelte:head>
	<title>Book Lovers - Sign Up</title>
</svelte:head>