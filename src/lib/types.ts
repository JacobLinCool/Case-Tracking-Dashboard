export type CaseStatus = "open" | "closed";

export interface Case {
	name: string;
	slug: string;
	description: string;
	tags: string[];
	officer: string;
	events: Event[];
	status: CaseStatus;
}

export interface Event {
	date: string;
	title: string;
	content: string;
}
