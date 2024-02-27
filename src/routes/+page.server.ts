import { load as cases } from "$lib/server/cases";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		cases: await cases(),
	};
};
