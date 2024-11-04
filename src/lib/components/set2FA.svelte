<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: url = $page.url.pathname
</script>
<div class="sc-hDzdEj eOFeqs">
    <div class="sc-lcdCCa iTVeFz">
        <div class="cont">Your 2FA currently is Disabled</div>
        <button on:click={()=>  goto(`${!url ? "/" : url === "/" ? "" : url}?modal=fa`)} class="sc-iqseJM sc-bqiRlB cBmlor eWZHfu button button-normal">
            <div class="button-inner">Enable 2FA</div>
        </button>
    </div>
</div>

<style>
.eOFeqs {
    position: relative;
    padding: 36px 0px;
    border-top: 1px solid rgba(128, 141, 152, 0.1);
}
.iTVeFz {
    margin: 0px auto;
    display: flex;
    flex: 0 0 auto;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background-color: #CBD7FF08;
    width: 27rem;
    border-radius: 6px;
    height: 3.5rem;
}
.iTVeFz .cont {
    display: flex;
    width: 13.5rem;
    padding: 0.625rem 0.625rem 0.625rem 2rem;
    line-height: 1.125rem;
    opacity: 0.8;
}
.iTVeFz button {
    width: 12.5rem;
    height: 100%;
    margin: 0px;
}
.eWZHfu.button {
    color: rgb(245, 246, 247);
    box-shadow: rgba(29, 34, 37, 0.1) 0px 4px 8px 0px;
    background-color: rgb(88, 26, 196);
    background-image: conic-gradient(from 1turn, rgb(88, 26, 196), rgb(119, 60, 253));
}

</style>