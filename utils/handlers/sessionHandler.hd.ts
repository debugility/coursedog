import type { Page } from "@playwright/test";
import dotenv from "dotenv";
import { HomePage } from "../../pages/home.pg";
import { LoginPage } from "../../pages/login.pg";

const dotenvResult = dotenv.config();
const env = dotenvResult.parsed ?? {};

export class SessionHandler {
	private static readonly strDefaultPassword = env.DEFAULT_PASSWORD;

	static async appVisit(page: Page): Promise<void> {
		const baseUrl = env.BASE_URL;
		const normalizedBaseUrl = baseUrl.endsWith("/")
			? baseUrl.slice(0, Math.max(baseUrl.length - 1, 0))
			: baseUrl;
		await page.goto(`${normalizedBaseUrl}/auth_ecommerce.html`);
	}

	static async appLogin(
		page: Page,
		userEmail: string,
		options?: { password?: string },
	): Promise<void> {
		const setOptions = typeof options == "undefined" ? {} : options;
		const newPassword = this.setPassword(setOptions.password);

		await this.appVisit(page);
		await LoginPage.inpEmail(page).doType(userEmail, { clearFirst: true });
		await LoginPage.inpPassword(page).doType(newPassword, { clearFirst: true });
		await LoginPage.btnSubmitLogin(page).doClick();
		await HomePage.lblShoppingCartHeader(page).beVisible();
	}

	private static setPassword(password?: string): string {
		if (password === undefined || password === "") {
			return this.strDefaultPassword;
		}
		return password;
	}

	static async appLogout(page: Page): Promise<void> {
		await LoginPage.lnkLogOut(page).doClick();
		await LoginPage.btnSubmitLogin(page).beVisible();
	}
}
