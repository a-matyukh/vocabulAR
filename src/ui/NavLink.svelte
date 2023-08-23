<a {href} class:current={$page.url.pathname === href}>{text}</a>

<style>
a {
    padding: 15px;
}
.current {
    color: orange;
    background-color: #f5f5f5;
}
</style>
<script>
export let href, text
import { page } from '$app/stores'
</script>