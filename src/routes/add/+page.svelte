<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import BookForm from '$lib/components/Books/BookForm.svelte';
	export let form;
</script>

<div class="row">
	<div class="column">
		<h1>Add Book</h1>
	</div>
</div>

{#if form && form.success}
	<h2>Successful Submit</h2>
{:else}
	<BookForm {form} />
{/if}

{#if form && form.error}
	<h2>Failed Submit</h2>
	<p>{form.error}</p>
{/if}

<svelte:head>
	<title>Book Lovers - Add Book</title>
</svelte:head>
