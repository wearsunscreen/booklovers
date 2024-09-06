<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messagesStore from '$lib/stores/messages.store';

	async function loginGoogle() {
		try {
			const user = await loginWithGoogle();
			console.log(user);
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
