import type { Page } from "@playwright/test";
import { ElementWrapper } from "../utils/wrappers/elementWrapper.wr";

export class ShippingDetailsPage {
	static inpPhone(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#phone"));
	}

	static inpStreet(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("input[name='street']"));
	}

	static inpCity(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("input[name='city']"));
	}

	static drpCountry(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#countries_dropdown_menu"));
	}

	static btnSubmitOrder(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("#submitOrderBtn"));
	}

	static lblOrderSuccess(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByText("Congrats! Your order", { exact: false }));
	}
}
