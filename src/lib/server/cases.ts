import type { Case } from "$lib/types";
import { glob } from "glob";
import YAML from "js-yaml";
import fs from "node:fs";

export async function load(): Promise<Case[]> {
	const files = await glob("cases/**/*.{yml,yaml}");
	const cases = files.map((file) => {
		const content = fs.readFileSync(file, "utf-8");
		const data = YAML.load(content) as Case;
		data.slug = file
			.replace(/^cases\//, "")
			.replace(/\.(yml|yaml)$/, "")
			.replace(/\//, "-");
		return data;
	});
	cases.sort(
		(a, b) =>
			b.status.localeCompare(a.status) || b.events[0].date.localeCompare(a.events[0].date),
	);
	return cases;
}
