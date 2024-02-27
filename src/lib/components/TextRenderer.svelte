<script lang="ts">
	import pangu from "pangu";
	export let text: string;
	text = pangu.spacing(text);
	export let raw: string;
	raw;
</script>

{@html text}
