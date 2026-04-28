import { test } from "@playwright/test";
import { HomePage } from "../../pages/home.pg";
import { LoginPage } from "../../pages/login.pg";
import { ShippingDetailsPage } from "../../pages/shippingDetails.pg";
import { SessionHandler } from "../../utils/handlers/sessionHandler.hd";
import {
	getFakeCity,
	getFakeCountry,
	getFakePhone,
	getFakeStreet,
} from "../../utils/helpers/faker.hp";

function parsePrice(text: string): number {
	return Number.parseFloat(text.replace("$", "").trim());
}

test.describe("E2E | Order flow", () => {
	test.beforeEach(async ({ page }) => {
		await SessionHandler.appLogin(page, "admin@admin.com");
	});

	test.afterEach(async ({ page }) => {
		if (await LoginPage.lnkLogOut(page).getLocator().isVisible().catch(() => false)) {
			await SessionHandler.appLogout(page);
		}
	});

	test("E2E | Order flow : should add items and submit order", async ({ page }) => {
		const fakePhone = await getFakePhone(10);
		const fakeStreet = await getFakeStreet();
		const fakeCity = await getFakeCity();
		const fakeCountry = await getFakeCountry();

        // Setup
		const cartItemsBefore = await HomePage.divCartItems(page).getLocator().count();
		const firstItemPrice = parsePrice(
			await HomePage.lblShopItemPriceByIndex(page, 0).getLocator().innerText(),
		);
		const secondItemPrice = parsePrice(
			await HomePage.lblShopItemPriceByIndex(page, 1).getLocator().innerText(),
		);
		const expectedTotalPrice = (firstItemPrice + secondItemPrice).toFixed(2);

        // Exercise
		await HomePage.btnAddToCartByIndex(page, 0).doClick();
		await HomePage.btnAddToCartByIndex(page, 1).doClick();
		await HomePage.divCartItems(page).toHaveCount(cartItemsBefore + 2);
		await HomePage.lblCartTotalPrice(page).haveText(`$${expectedTotalPrice}`);

		await HomePage.btnProceedToCheckout(page).doClick();
		await ShippingDetailsPage.btnSubmitOrder(page).beVisible();

		await ShippingDetailsPage.inpPhone(page).doType(fakePhone, { clearFirst: true });
		await ShippingDetailsPage.inpStreet(page).doType(fakeStreet, { clearFirst: true });
		await ShippingDetailsPage.inpCity(page).doType(fakeCity, { clearFirst: true });
		await ShippingDetailsPage.drpCountry(page).doSelectOptionByLabel(fakeCountry);
		await ShippingDetailsPage.btnSubmitOrder(page).doClick();

        // Verify
		await LoginPage.lnkLogOut(page).beVisible();
		await ShippingDetailsPage.lblOrderSuccess(page).beVisible();
		await ShippingDetailsPage.lblOrderSuccess(page).containText(`$${expectedTotalPrice}`);
		await ShippingDetailsPage.lblOrderSuccess(page).containText(
			`${fakeStreet}, ${fakeCity} - ${fakeCountry}.`,
		);
	});
});
