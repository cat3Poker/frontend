<script>
    import { app } from "$lib/store/activities.js";
    import { onMount } from "svelte";
    let UpgradeList = []
    onMount(()=>{
        UpgradeList = $app.upgrade ? $app.upgrade : []
    })
</script>


<div class="LjeoOsjl">
    <div class="Jksjehio">Ugrade your avatar to earn more in games reward shares You can also loose your rank if you are inactive for awhile</div>
    <div class="KkJhkjoen">
        {#each UpgradeList as e}
            <div class="img-container">
                <div class="Ljheo">Cat³ {(e.level)}</div>
                <img src="{e.image}" alt="">
                <div class="Kjjkeuns {e.status ? "active" : ""}">{e.status ? "Active" : "1 SOL"}</div>  
            </div>
        {/each}
    </div>
</div>

<style>
    .LjeoOsjl{
        padding: 5px 10px;
        margin: 10px;
    }
    .Jksjehio{
        padding: 0px 20px;
        color: #00FF86;
        font-size: 11px;
    }
    .KkJhkjoen{
        width: 100%;
        background: #CBD7FF08;  
        padding: 10px;
        border-radius: 12px;
        margin: 10px 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: dense;
        gap: 1.5rem 1rem;
        height: 62%;
        overflow: scroll;
    }
    .KkJhkjoen::-webkit-scrollbar{
        display: none;
    }
    .KkJhkjoen{
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
    }
    .img-container{
        position: relative;
        display: flex;
        justify-self: center;
        align-self: center;
        width: 110px;
        height: 110px;
        border-radius: 12px;
        background-color: #CBD7FF08;
    }
    .img-container img{
        width:100%;
        height: 100%;
        border-radius: 12px;
    }
    .Kjjkeuns{
        position: absolute;
        color: white;
        background: #FC4117;
        bottom: -10px;
        left: 25%;
        padding: 2px 5px;
        font-size: 10px;
    }
    .Kjjkeuns.active{
        background: green;
    }
    .Ljheo{
        color: #ffff;
        position: absolute;
        left: -31px;
        top: 50px;
        font-size: 10px;
        transform: rotate(90deg);
    }
</style>