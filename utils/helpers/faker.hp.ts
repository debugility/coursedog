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

export async function getFakePhone(length = 10): Promise<string> {
	const faker = await getFakerInstance();
	return faker.string.numeric(length);
}

export async function getFakeStreet(): Promise<string> {
	const faker = await getFakerInstance();
	return faker.location.streetAddress();
}

export async function getFakeCity(): Promise<string> {
	const faker = await getFakerInstance();
	return faker.location.city();
}

export async function getFakeCountry(): Promise<string> {
	const faker = await getFakerInstance();
	return faker.helpers.arrayElement([
		"Australia",
		"Canada",
		"Germany",
		"India",
		"United Kingdom",
	]);
}
