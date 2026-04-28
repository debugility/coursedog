import type { Page } from "@playwright/test";
import { ElementWrapper } from "../utils/wrappers/elementWrapper.wr";

export class HomePage {
	static lblShoppingCartHeader(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("heading", { name: "SHOPPING CART" }));
	}

	static btnAddToCartByIndex(page: Page, index: number): ElementWrapper {
		return new ElementWrapper(page.getByRole("button", { name: "ADD TO CART" }).nth(index));
	}

	static divShopItems(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator(".shop-item"));
	}

	static lblShopItemPriceByIndex(page: Page, index: number): ElementWrapper {
		return new ElementWrapper(page.locator(".shop-item-price").nth(index));
	}

	static divCartItems(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator(".cart-item"));
	}

	static lblCartTotalPrice(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator(".cart-total-price"));
	}

	static btnProceedToCheckout(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("button", { name: "PROCEED TO CHECKOUT" }));
	}
}
