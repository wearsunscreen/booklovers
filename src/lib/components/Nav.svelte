<script>
	import { page } from '$app/stores';
	import authStore from '$lib/stores/auth.store';
	import messagesStore from '$lib/stores/messages.store';
	import { logout } from '$lib/firebase/auth.client';
	import { goto } from '$app/navigation';
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
	async function signOut() {
		try {
			await logout();
			goto('/');
		} catch (e) {
			console.log(e)
			messagesStore.showError(e.message);
		}
	}
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Book Lover</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
			on:click={toggleMenu}
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class:show={isOpen} class="collapse navbar-collapse show" id="navbarNav">
			<ul class="navbar-nav">
				{#if $authStore.isLoggedIn}
				<li class="nav-item ">
					<a
						class:active={$page.url.pathname === '/'}
						class="nav-link"
						aria-current="page"
						href="/">Home</a
					>
				</li>
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/add'} class="nav-link" href="/add">Add Book</a>
				</li>
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/profile'} class="nav-link" href="/profile">Profile</a>
				</li>
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/about'} class="nav-link" href="/about">About</a>
				</li>
				<li class="nav-item">
					<span on:click={signOut} class:active={$page.url.pathname === '/logout'} class="nav-link">Logout</span>
				</li>
				{:else}
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/'} class="nav-link" aria-current="page" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/about'} class="nav-link" href="/about">About</a>
				</li>

				<li class="nav-item">
					<a class:active={$page.url.pathname === '/login'} class="nav-link" href="/login">Login</a>
				</li>
				<li class="nav-item">
					<a class:active={$page.url.pathname === '/signup'} class="nav-link" href="/signup">Sign Up</a>
				</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>