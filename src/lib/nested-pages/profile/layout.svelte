<script>
    export let route
    import { goto } from "$app/navigation";
    import Basics from "./basics.svelte";
    import Personal from "./personal.svelte";
    import Security from "./security.svelte";
    import Upgrade from "./upgrade.svelte";


</script>

{#if route.tab === "basic" || !route.tab}
    <Basics />
{/if}
{#if route.tab === "security"}
    <Security />
{/if}
{#if route.tab === "personal"}
    <Personal />
{/if}

{#if route.tab === "upgrade"}
    <Upgrade />
{/if}


