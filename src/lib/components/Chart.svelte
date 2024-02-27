<script lang="ts">
	import * as echarts from "echarts";
	import type { ECElementEvent, EChartsOption } from "echarts";
	import { createEventDispatcher } from "svelte";

	export let option: EChartsOption = {};

	const dispatch = createEventDispatcher<{
		click: ECElementEvent;
	}>();

	function render(node: HTMLDivElement) {
		const chart = echarts.init(node, null, { renderer: "svg" });
		chart.setOption(option);
		chart.on("click", (params) => {
			dispatch("click", params);
		});
	}
</script>

<div class="h-full w-full" use:render></div>
