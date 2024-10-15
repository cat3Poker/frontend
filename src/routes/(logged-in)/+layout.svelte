<script>
    export let data
    import Footer from "$lib/components/footer.svelte";
    import Menubar from "$lib/components/menubar.svelte";
    import Navbar from "$lib/components/navbar.svelte";

</script>


<Navbar />

<div class="default-bg">
    <div class="page-container">
        <Menubar route={data}/>
        <div class="default-width">
            <slot></slot>
        </div>
        <Footer />
    </div>
</div>
