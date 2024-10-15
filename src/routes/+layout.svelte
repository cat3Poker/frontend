<script>
    import "../styles/global.css"
    import "../styles/navbar.css"
    import "../styles/menubar.css"
        import { Toaster } from 'svelte-sonner'
    import { navigating } from '$app/stores';
    // import Loader from "$lib/loader.svelte";

    let previous;
	let start;
	let end;

	$: if ($navigating) {
		start = Date.now();
		end = null;
		previous = $navigating;
	} else {
		end = Date.now();
	}
</script>


<div>
    <Toaster position="bottom-left" expand={true} richColors  />
    <slot></slot>
    <!-- {#if previous && end}
        <div style="height: 100vh;">
            <Loader />
        </div>
       
        <p>navigated from {previous.from.url.pathname} to {previous.to.url.pathname} in <strong>{end - start}ms</strong></p>
    {/if} -->
</div>