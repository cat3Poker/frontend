<script>
    export let data
    import Footer from "$lib/components/footer.svelte";
    import Menubar from "$lib/components/menubar.svelte";
    import Navbar from "$lib/components/navbar.svelte";
    $: isCollabs = false

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
