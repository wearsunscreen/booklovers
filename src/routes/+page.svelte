<script>
	export let data;
	import { onMount } from 'svelte';
	import { getAuth } from 'firebase/auth';

	onMount(async () => {
		const token = await getAuth().currentUser?.getIdToken(true);
		console.log(token, 'jwt');
	});
</script>

<h1>Welcome to BookLovers</h1>

<h2>Number of users: {data.count}</h2>
