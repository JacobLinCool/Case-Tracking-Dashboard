import type { Case } from "$lib/types";
import Fuse from "fuse.js";

export class CaseManager {
	public fuse: Fuse<Case>;

	constructor(public cases: Case[]) {
		this.fuse = new Fuse(cases, {
			includeScore: true,
			keys: ["name", "description", "officer", "tags", "events.title", "events.description"],
		});
	}

	public search(query: string): Case[] {
		const results = this.fuse.search(query);
		console.log(results);
		return results.map((result) => result.item);
	}
}
