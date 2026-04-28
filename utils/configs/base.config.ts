export async function getFaker() {
	const fakerModule = await import("@faker-js/faker");
	return fakerModule.faker;
}
