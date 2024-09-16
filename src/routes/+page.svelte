<script>
    export let data; // used by Number of users: {data.count}

    import { onMount } from 'svelte';
	import { getAuth } from 'firebase/auth';

    onMount(async () => {
        const auth = await getAuth()
        const user = auth.currentUser;
        if (user) {
            console.log('User is signed in');
            const token = await user.getIdToken();
            console.log(token, "jwt token");
        } else {
            console.log('No user is signed in');
        }
    });
</script>

<h1>Welcome to BookLovers</h1>

<h2>Number of users: {data.count}</h2>
