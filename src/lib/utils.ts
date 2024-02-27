export function strip_last_punctuation(s: string): string {
	return s.replace(/[。！？](\n\n|$)/g, "\n\n");
}
