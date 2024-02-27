<script lang="ts">
	import type { Case } from "$lib/types";
	import { strip_last_punctuation } from "$lib/utils";
	import SvelteMarkdown from "svelte-markdown";
	import pangu from "pangu";
	import TextRenderer from "$lib/components/TextRenderer.svelte";
	import { t } from "svelte-i18n";

	export let data: { case: Case };
</script>

<svelte:head>
	<title>{pangu.spacing(data.case.name)}</title>
	<meta name="description" content={pangu.spacing(data.case.description)} />
	<meta property="og:title" content={pangu.spacing(data.case.name)} />
	<meta property="og:type" content="article" />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="h-full w-full overflow-auto">
	<div class="p-4 lg:p-8">
		<h1 class="mb-4 text-4xl font-bold">{pangu.spacing(data.case.name)}</h1>
		<p>
			{pangu.spacing(data.case.description)}
		</p>
		<p>
			{$t("officer")}：{data.case.officer}
		</p>
	</div>
	<ul class="timeline timeline-vertical timeline-snap-icon p-4 max-md:timeline-compact lg:p-8">
		{#each data.case.events as evt, i}
			<li>
				{#if i !== 0}
					<hr />
				{/if}
				<div class="timeline-middle">
					<div class="h-2 w-2 rounded-full bg-primary"></div>
				</div>
				<div
					class="mb-10"
					class:timeline-start={i % 2 === 0}
					class:timeline-end={i % 2 === 1}
					class:md:text-end={i % 2 === 0}
				>
					<time class="font-mono italic">{new Date(evt.date).toLocaleDateString()}</time>
					<div class="text-lg font-black">{evt.title}</div>
					<div class="prose overflow-auto">
						<SvelteMarkdown
							source={strip_last_punctuation(evt.content)}
							renderers={{ text: TextRenderer }}
						/>
					</div>
				</div>
				{#if i !== data.case.events.length - 1}
					<hr />
				{/if}
			</li>
		{/each}
	</ul>
	<div class="h-8 w-full"></div>
</div>
