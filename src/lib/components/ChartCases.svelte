<script lang="ts">
	import Chart from "$lib/components/Chart.svelte";
	import type { EChartsOption } from "echarts";
	import type { Case } from "$lib/types";
	import { t } from "svelte-i18n";

	export let cases: Case[];

	let opened = $t("case-opened");
	let closed = $t("case-closed");

	function pie(cases: Case[]) {
		const opt: EChartsOption = {
			tooltip: {
				trigger: "item",
			},
			legend: {
				top: "5%",
				left: "center",
			},
			series: [
				{
					name: $t("case"),
					type: "pie",
					radius: ["40%", "70%"],
					avoidLabelOverlap: false,
					padAngle: 5,
					itemStyle: {
						borderRadius: 10,
					},
					data: Object.entries(
						cases.reduce(
							(acc, cur) => {
								if (cur.status === "open") {
									acc[opened]++;
								} else {
									acc[closed]++;
								}
								return acc;
							},
							{
								[opened]: 0,
								[closed]: 0,
							},
						),
					).map(([name, value]) => ({
						name,
						value,
					})),
				},
			],
		};
		return opt;
	}
</script>

<Chart option={pie(cases)} on:click />
