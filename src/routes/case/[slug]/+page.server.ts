import { load as cases } from "$lib/server/cases";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const c = (await cases()).find((c) => c.slug === params.slug);
	if (!c) {
		return error(404, "Case not found");
	}

	return { case: c };
};
