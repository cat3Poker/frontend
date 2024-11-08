<script>
    import { browser } from "$app/environment";
    export let data
      import { page } from "$app/stores"
    import Footer from "$lib/components/footer.svelte";
    import Menubar from "$lib/components/menubar.svelte";
    import Navbar from "$lib/components/navbar.svelte";
    import Nested_page from "$lib/nested-pages/layout.svelte";
    $: isCollabs = true
    $: queryString = ""
    $: params = ""
    $: tab = {}
    $: {
        queryString = $page.url.search
        params = new URLSearchParams(queryString);
        params.forEach((value, key) => {
            tab[key] = value;
        });
    }
    
</script>

<Navbar />

<div class="default-bg">
    <div class="page-container">
        <Menubar {isCollabs} on:change={()=> isCollabs =! isCollabs} route={data}/>
        <div class="default-width {isCollabs ? "collabs" : ""}">
            <slot></slot>
        </div>
        <Footer />
    </div>
</div>

{#if queryString}
    <Nested_page route={tab}/>
{/if}

