async function getFakerInstance() {
	const { faker } = await import("@faker-js/faker");
	return faker;
}

export async function getInvalidEmail(): Promise<string> {
	const faker = await getFakerInstance();
	return faker.internet.email();
}

export async function getInvalidPassword(length = 14): Promise<string> {
	const faker = await getFakerInstance();
	return faker.internet.password({ length });
}

export async function getInvalidEmailFormat(length = 10): Promise<string> {
	const faker = await getFakerInstance();
	return faker.string.alphanumeric(length);
}
