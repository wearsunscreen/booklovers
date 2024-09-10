<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';
	import { page } from '$app/stores';
	import { afterLogin } from '$lib/helpers/route.helper';

	async function loginGoogle() {
		try {
			const user = await loginWithGoogle();
			console.log(user);
			await afterLogin($page.url, user.uid);
		} catch (e) {
			if (e.code === 'auth/popup-closed-by-user') {
				return;
			}
			console.log(e);
			messagesStore.showError(e.message);
		}
	}
</script>

<div class="row">
	<div class="col">
		<button on:click={loginGoogle} class="btn-primary w-100">Login with Google</button>
	</div>
</div>
