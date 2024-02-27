<script lang="ts">
	import type { CaseManager } from "$lib/cm";
	import { t } from "svelte-i18n";
	import pangu from "pangu";

	export let cm: CaseManager;

	export let query = "";
	export let opened = true;
	export let closed = true;

	$: cases = (query ? cm.search(query) : cm.cases).filter(
		(c) => (opened && c.status === "open") || (closed && c.status === "closed"),
	);
</script>

<div class="h-full w-full p-4 lg:p-8">
	<h1 class="mb-4 text-4xl font-bold uppercase lg:mb-8">
		{$t("all-cases")}
	</h1>
	<div class="mb-4 flex w-full gap-4 max-lg:flex-col">
		<input
			type="search"
			class="input input-bordered input-primary"
			placeholder={$t("search")}
			bind:value={query}
		/>

		<div class="flex gap-4">
			<div class="flex items-center">
				<input type="checkbox" class="checkbox-primary checkbox" bind:checked={opened} />
				<label for="opened" class="ml-2">{$t("case-opened")}</label>
			</div>
			<div class="flex items-center">
				<input type="checkbox" class="checkbox-secondary checkbox" bind:checked={closed} />
				<label for="closed" class="ml-2">{$t("case-closed")}</label>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each cases as c}
			<a href="./case/{c.slug}">
				<div
					class="card card-bordered card-compact shadow transition-shadow hover:shadow-md"
				>
					{#if c.status === "open"}
						<span class="badge badge-primary">{$t("case-opened")}</span>
					{:else}
						<span class="badge badge-secondary">{$t("case-closed")}</span>
					{/if}
					<div class="card-body">
						<h2 class="card-title h-16">
							<div class="flex-1">{pangu.spacing(c.name)}</div>
							<div class="group flex flex-row-reverse gap-1">
								{#each c.tags as tag}
									<button
										class="badge badge-outline -ml-4 bg-base-100 transition-all group-hover:ml-0"
										on:click|preventDefault={() => (query = "=" + tag)}
									>
										{tag}
									</button>
								{/each}
							</div>
						</h2>
						<p class="h-20 overflow-auto">{pangu.spacing(c.description)}</p>
						<div class="card-actions">
							<p>{$t("officer")}：{c.officer}</p>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
