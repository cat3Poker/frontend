<script>
    let isView = false
</script>


<div class="KJkjdkp">
    <div class="title-idp">Change Password</div>
    <div class="sc-ezbkAF kDuLvp input ">
        <div class="input-label">Old password</div>
        <div class="input-control" >
             <!-- svelte-ignore a11y-positive-tabindex -->
            <input type="password" tabindex="1" autocomplete="off" placeholder="Password" >
        </div>
    </div>

    <div class="sc-ezbkAF kDuLvp input ">
        <div class="input-label">New password</div>
        <div class="input-control" >
             <!-- svelte-ignore a11y-positive-tabindex -->
            <input type="password" tabindex="1" autocomplete="off" placeholder="Password" >
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg on:click={()=> isView =! isView} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#{!isView ? "icon_View" : "icon_Hide"}"></use>
                </svg>
        </div>
    </div>

    <div class="OieuiKhs">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon icon-help"><use xlink:href="#icon_Help"></use></svg>
        Re-login will be required after changing the password.
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
    padding: 20px;
    margin: 20px;
    border-radius: 12px;
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
.OieuiKhs{
    padding: 10px 0;
    font-size: 12px;
    display: flex;
    margin: 10px 0;
}
.OieuiKhs svg{
    margin-top: 4px;
    margin-right: 5px;
}
</style>