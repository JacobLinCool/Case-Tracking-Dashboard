<script lang="ts">
	import Chart from "$lib/components/Chart.svelte";
	import type { EChartsOption } from "echarts";
	import type { Case } from "$lib/types";
	import { t } from "svelte-i18n";

	export let cases: Case[];

	function bar(cases: Case[]) {
		const tags = cases.reduce(
			(acc, cur) => {
				cur.tags.forEach((tag) => {
					if (acc[tag]) {
						acc[tag]++;
					} else {
						acc[tag] = 1;
					}
				});
				return acc;
			},
			{} as Record<string, number>,
		);

		const data = Object.entries(tags).sort((a, b) => b[1] - a[1]);

		const opt: EChartsOption = {
			title: {
				text: $t("case-tags"),
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow",
				},
			},
			xAxis: {
				type: "category",
				data: data.map(([name]) => name),
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					data: data.map(([, value]) => value),
					type: "bar",
				},
			],
		};
		return opt;
	}
</script>

<Chart option={bar(cases)} on:click />
