<script>
    import { goto } from "$app/navigation";
    // import { app } from '$lib/store/screen.js';

    export let theme

    const handleCloseModal = (()=>{
        goto("/")
    })

</script>


<button on:click={()=> handleCloseModal()} class="sc-ieecCq fLASqZ close-icon dialog-close">
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" style="fill: {theme ? "black" : ""};" class="sc-gsDKAQ hxODWG icon">
        <use xlink:href="#icon_Close"></use>
    </svg>
</button>