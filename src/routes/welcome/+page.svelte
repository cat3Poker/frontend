<script>
    import { goto } from "$app/navigation";
    const img = new URL('$lib/images/8ea3fdf49d12611dcb55fd40afa5ee21-removebg-preview.png', import.meta.url).href
    const logo1 = new URL('$lib/images/Group 2.png', import.meta.url).href
    const logo2 = new URL('$lib/images/Poker.png', import.meta.url).href
    const logo3 = new URL('$lib/images/325db78f9c605ee4f7bfe1ae96e5d460.png', import.meta.url).href


</script>
<div class="home-app">
    <div class="home-container over-flow">
        <div class="content">
            <div class="content-spp">
                <div class="text-content">
                    Welcome to
                </div>
                <div class="logo-contents">
                    <div class="logos">
                        <img class="logo1" src="{logo1}" alt="">
                        <img src="{logo2}" alt="">
                    </div>
                    <div class="sdkIIn-img">
                        <img src="{logo3}" alt="">
                    </div>
                </div>
                <button on:click={()=> goto("/login")} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-normal sc-iqVWFU fGPfpD">
                    <div class="button-inner">
                        <span>Continue</span>
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon"><use xlink:href="#icon_Arrow"></use></svg>
                    </div>
                </button>
            </div>
        </div>
        <div class="img-container">
            <img src="{img}" alt="">
        </div>
    </div>
</div>


<style>
    .home-app{
        position: relative;
        background: radial-gradient(50% 50% at 50% 50%, #72FFAA 0%, #FFB9F0 100%);
        width: 100%;
        height: 100vh;
    }
   .home-app .over-flow{
        position: fixed;
        background: linear-gradient(90deg, #BCFF6F 27.3%, rgba(255, 185, 240, 0) 100%);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 12;
        display: flex;
   }
   .img-container{
        width: 50%;
   }
   .home-app .content{
        width: 50%;
        justify-content: center;
   }

   .home-app .img-container img{
        width: 100%;
        height: 100vh;
   }
   .content-spp{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
   }
   .fGPfpD {
        width: 12.25rem;
        font-family: Michroma;
        margin: 20px;
    }
   .text-content{
        font-family: Michroma;
        font-size: 30px;
        font-weight: 400;
        line-height: 68.25px;
        color: #000000;
   }
   .logos{
        display: flex;
        flex-direction: column;
        padding: 0;
        justify-content: center;
        align-items: center;
   }
   .logos .logo1{
        width: 30%;
        margin-left: 40px;
   }
   .logos img{
        width: 40%;
        margin-left: 10px;
   }
   .sdkIIn-img{
    margin-top: 40px;
   }
   .sdkIIn-img img{
        width: 280px;
   }
   .logo-contents{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
   }
   .hxODWG {
        fill: rgb(255, 255, 255);
        width: 12px;
    }
    .button span{
        font-size: 15px;
        padding: 0 10px;
    }
</style>    