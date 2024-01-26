<script>
    /**
     * @type {import('$lib/weather').WeatherStore}
     */
    export let store
</script>

<h2>The weather forecast</h2>

{#if !store.loaded}
<p>Loading&hellip;</p>
{:else}
    {#if store.error != ''}
        <p>An error fetching data occurred: {store.error}</p>
    {:else}
<ul>
    {#each store.entries as e}
    <li>{e.time} - {e.temp}C</li>
    {/each}
</ul>
    {/if}
{/if}
