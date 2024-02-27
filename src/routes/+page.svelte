<script lang="ts">
	import { t } from "svelte-i18n";
	import { CaseManager } from "$lib/cm";
	import type { Case } from "$lib/types";
	import CaseTable from "$lib/components/CaseTable.svelte";
	import ChartCases from "$lib/components/ChartCases.svelte";
	import ChartTags from "$lib/components/ChartTags.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	export let data: { cases: Case[] };

	const cm = new CaseManager(data.cases);

	let table: HTMLDivElement;
	let mounted = false;
	let query = "";
	let opened = true;
	let closed = true;
	$: {
		if (mounted) {
			const url = new URL($page.url);
			if (query) {
				url.searchParams.set("q", query);
			} else {
				url.searchParams.delete("q");
			}
			goto(url.toString(), { replaceState: true, keepFocus: true });
		}
	}

	onMount(() => {
		const q = $page.url.searchParams.get("q");
		if (q) {
			query = q;
			requestAnimationFrame(() =>
				table.scrollIntoView({ behavior: "smooth", block: "start" }),
			);
		}
		mounted = true;
	});
</script>

<svelte:head>
	<title>{$t("case-tracking-dashboard")}</title>
	<meta name="description" content={$t("welcome")} />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="h-full w-full overflow-auto">
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content w-full flex-col lg:flex-row">
			<div class="h-96 max-w-xl max-lg:w-full lg:flex-1">
				<ChartCases
					cases={cm.cases}
					on:click={({ detail }) => {
						if (
							detail.data &&
							typeof detail.data === "object" &&
							"name" in detail.data
						) {
							if (detail.data.name === $t("case-opened")) {
								opened = true;
								closed = false;
								table.scrollIntoView({ behavior: "smooth", block: "start" });
							} else if (detail.data.name === $t("case-closed")) {
								opened = false;
								closed = true;
								table.scrollIntoView({ behavior: "smooth", block: "start" });
							}
						}
					}}
				/>
			</div>

			<div>
				<h1 class="text-2xl font-bold lg:text-4xl">{$t("case-tracking-dashboard")}</h1>
				<p class="py-6">{$t("welcome")}</p>
			</div>
		</div>
	</div>

	<div class="hero min-h-screen" bind:this={table}>
		<CaseTable {cm} bind:query bind:opened bind:closed />
	</div>

	<div class="hero min-h-screen bg-base-200 p-4 lg:p-8">
		<div class="aspect-video w-full max-w-5xl">
			<ChartTags
				cases={cm.cases}
				on:click={({ detail }) => {
					query = "=" + detail.name;
					requestAnimationFrame(() =>
						table.scrollIntoView({ behavior: "smooth", block: "start" }),
					);
				}}
			/>
		</div>
	</div>
</div>
