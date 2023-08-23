<main>
    <slot />
</main>
<footer>
    {#if $page.url.pathname !== "/quiz"}
        <Nav />
    {:else}
        <nav><a href="/discover">Back</a></nav>
    {/if}
</footer>

<style>
:global(body) {
    display: grid;
    grid-template-rows: 1fr 50px;
    height: 100vh;
}
main {
    position: relative;
    overflow: auto;
    background-color: #f5f5f5;
}
footer {
    background-color: #ccc;
}
nav {
    text-align: center;
    padding: 15px;
}
</style>
<script>
import './styles.css'
import { page } from '$app/stores'
import Nav from 'ui/Nav.svelte'
</script>