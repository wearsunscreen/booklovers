<script>
	/** @type {import('./$types').LayoutData} */
	export let data;
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Nav from '$lib/components/Nav.svelte';
	import messageStore from '$lib/stores/messages.store';
	import '$lib/firebase/firebase-client'
	import { onMount } from 'svelte';
	import { sendJWTToken } from '$lib/firebase/auth.client';
	let timerId;

	async function sendServerToken() {
		try {
			await sendJWTToken();
		} catch(e) {
			clearInterval(timerId);
			messageStore.show('error', 'Error sending token to server');
			console.error('error', e);
		}
	}

	onMount(async () => {
		try {
			await sendServerToken();
			timerId = setInterval(async () => {
				await sendServerToken();
			}, 1000 * 60 * 10);
		} catch (error) {
			console.error('error', error);
		}
		return () => {
			clearInterval(timerId);
		}	
	});

	function closeMessage() {
        console.log('closeMessage');
		messageStore.hide();
	}
</script>

<Nav />
<main class="container">
	{#if $messageStore.show}
		<div class="row mt-3">
			<div class="col">
				<div
					class:alert-danger={$messageStore.type === 'error'}
					class:alert-success={$messageStore.type === 'success'}
					class="alert alert-dismissible"
					role="alert"
				>
					<strong>{$messageStore.type == 'error' ? 'Error:' : 'Success'}</strong>
					{$messageStore.message}
					<button type="button" on:click={closeMessage} class="btn-close" aria-label="Close" />
				</div>
			</div>
		</div>
	{/if}

	<slot></slot>
</main>
