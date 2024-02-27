import type { Handle } from "@sveltejs/kit";
import { locale, waitLocale } from "svelte-i18n";

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get("accept-language")?.split(",")[0] || "zh-TW";
	await locale.set(lang);
	await waitLocale(lang);

	const result = await resolve(event);
	return result;
};
