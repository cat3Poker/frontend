<script>
    let isView = false
</script>


<div class="KJkjdkp">
    <div class="title-idp">User information</div>
    <div class="detailed-infor">Please fill in the following information to let us know about you. Thank you!</div>

    <div class="totally-infolded">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Nickname</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Enter Nickname" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Date of Birth</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" value="19/09/2000" autocomplete="off" placeholder="19/09/2000" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">First name</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Enter First namext" >
            </div>
        </div>
    
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Last name</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Enter Last name" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Country</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Country" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">ZIP/Postal Code</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="203300" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">City</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="City" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Address</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Address" >
            </div>
        </div>
    </div>

    <div class="buttons">
        <button class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big">
            <div class="button-inner">
                Save
            </div>
        </button>
    </div>
</div>

<style>
.KJkjdkp{
    background: #CBD7FF08;
    padding: 10px;
    margin: 20px;
    border-radius: 12px;
    height: 100%;
    overflow: scroll;
}
.KJkjdkp::-webkit-scrollbar{
    display: none;
}
.KJkjdkp{
      scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.title-idp{
    color: #fff;
}
.kDuLvp .input-control {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    background-color: #0F111A8C;
    height: 3.5rem;
    padding: 0px 1.25rem;
    opacity: 1;
}
.fnKcEH.button {
    color: rgb(245, 246, 247);
    box-shadow: rgba(29, 34, 37, 0.1) 0px 4px 8px 0px;
    background-color: #1E7929;
    /* background-image: conic-gradient(from 1turn, var(--primary-color), #be0ec7); */
}
.buttons{
    margin: 20px 0;
}
.totally-infolded{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 1rem 0.2375rem;
}
</style>