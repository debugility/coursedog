import type { Page } from "@playwright/test";
import { ElementWrapper } from "../utils/wrappers/elementWrapper.wr";

export class LoginPage {

	// Locators
	static frmLogin(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("form", { has: page.locator("#submitLoginBtn") }));
	}

	static inpEmail(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#email"));
	}

	static inpPassword(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#password"));
	}

	static btnSubmitLogin(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#submitLoginBtn"));
	}

	static lblLoginSectionHeader(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("heading", { name: "Login - Shop" }));
	}

	static lblShippingDetailsHeader(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("heading", { name: "SHOPPING CART" }));
	}

	static rowFirstShippingDetail(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator(".shipping_address").first());
	}

	static lnkLogOut(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("link", { name: "Log Out" }));
	}

	static lblBadCredentials(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByText("Bad credentials! Please try again!", { exact: false }));
	}

	static lblCredentialsHint(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByText("Please use credentials Email: admin@admin.com", { exact: false }));
	}

	static btnSubmitOrder(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#submitOrderBtn"));
	}

	// Actions
	static async goto(page: Page): Promise<void> {
		await page.goto("/auth_ecommerce.html");
	}

}
