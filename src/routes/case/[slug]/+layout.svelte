<script lang="ts">
	import { t } from "svelte-i18n";
</script>

<nav class="navbar bg-base-200">
	<a class="btn btn-ghost text-xl" href="../">{$t("case-tracking-dashboard")}</a>
</nav>

<slot />
