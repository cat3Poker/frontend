<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let theme
    export let from

    const handleCloseModal = (()=>{
        if(from === "nested"){
            if(browser){
                document.body.style.overflow = null
            }
            goto($page.url.pathname)
        }else{
            goto("/")
        }
    })

</script>


<button on:click={()=> handleCloseModal()} class="sc-ieecCq fLASqZ close-icon dialog-close">
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" style="fill: {theme ? "black" : "#ffff"};" class="sc-gsDKAQ hxODWG icon">
        <use xlink:href="#icon_Close"></use>
    </svg>
</button>