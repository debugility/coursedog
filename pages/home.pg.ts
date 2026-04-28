import type { Page } from "@playwright/test";
import { ElementWrapper } from "../utils/wrappers/elementWrapper.wr";

export class HomePage {
	static lblShoppingCartHeader(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("heading", { name: "SHOPPING CART" }));
	}

	static divShopItems(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator(".shop-item"));
	}

	static btnProceedToCheckout(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("button", { name: "PROCEED TO CHECKOUT" }));
	}
}
