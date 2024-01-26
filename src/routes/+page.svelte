<script>
    import { counter } from '$lib/counter'
    import { weather } from '$lib/weather'
    import Test from '$lib/components/Test.svelte'
    import Weather from '$lib/components/Weather.svelte';
</script>
<h2>example page {$counter}</h2>

<button on:click={() => counter.increment()}>Up!</button> <button on:click={() => counter.reset() }>Restart!</button>

<!-- this allows the component to use the counter store without injecting it inside -->
<Test bind:store={$counter} />

<hr>

<Weather bind:store={$weather} />


