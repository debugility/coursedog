import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/home.pg";
import { LoginPage } from "../../pages/login.pg";
import {
	getInvalidEmail,
	getInvalidEmailFormat,
	getInvalidPassword,
} from "../../utils/helpers/faker.hp";

test.describe("Regression | Login", () => {
	test.beforeEach(async ({ page }) => {
		await LoginPage.goto(page);
	});

	test("Login : Persistence : should render the login section with correct defaults", async ({ page }) => {
		// Verify
        await expect(page).toHaveURL(/auth_ecommerce/);
		await expect(page).toHaveTitle(/QA Practice/);
        await LoginPage.lblLoginSectionHeader(page).beVisible();
		await LoginPage.inpEmail(page).beVisible();
		await LoginPage.inpPassword(page).beVisible();
		await LoginPage.btnSubmitLogin(page).beVisible();

		await LoginPage.frmLogin(page).beVisible();
		await LoginPage.lblCredentialsHint(page).containText("admin@admin.com");
		await LoginPage.lblCredentialsHint(page).containText("admin123");

		await LoginPage.inpEmail(page).haveAttribute("type", "email");
		await LoginPage.inpPassword(page).haveAttribute("type", "password");
		await LoginPage.inpEmail(page).haveAttribute("placeholder", /Enter email/i);
		await LoginPage.inpPassword(page).haveAttribute("placeholder", /Enter Password/i);
		await LoginPage.btnSubmitLogin(page).beEnabled();
		await LoginPage.inpEmail(page).haveValue("");
		await LoginPage.inpPassword(page).haveValue("");
	});

	test("Login : Functional : should reject random invalid credentials and keep user on login section", async ({ page,}) => {
		// Setup
        const invalidEmail = await getInvalidEmail();
		const invalidPassword = await getInvalidPassword(14);

        // Exercise
		await LoginPage.inpEmail(page).doType(invalidEmail, { clearFirst: true });
		await LoginPage.inpPassword(page).doType(invalidPassword, { clearFirst: true });
		await LoginPage.btnSubmitLogin(page).doClick();

        // Verify
		await LoginPage.lblBadCredentials(page).beVisible();
		await LoginPage.lblBadCredentials(page).containText(/Bad credentials! Please try again!/i);
		await LoginPage.lblLoginSectionHeader(page).beVisible();
		await LoginPage.inpEmail(page).beVisible();
		await LoginPage.inpPassword(page).beVisible();
		await LoginPage.inpEmail(page).haveValue(invalidEmail);
		await LoginPage.inpPassword(page).haveValue(invalidPassword);
		await LoginPage.lblShippingDetailsHeader(page).beHidden();
	});

	test("Login : Functional : should enforce email format validation before submit", async ({ page }) => {
		// Setup
		const invalidEmailFormat = await getInvalidEmailFormat(10);
		const anyPassword = await getInvalidPassword(12);

        // Exercise
		await LoginPage.inpEmail(page).doType(invalidEmailFormat, { clearFirst: true });
		await LoginPage.inpPassword(page).doType(anyPassword, { clearFirst: true });
		await LoginPage.btnSubmitLogin(page).doClick();

        // Verify
		const emailValidityMessage = await LoginPage.inpEmail(page)
			.getLocator()
			.evaluate((input) => (input as { validationMessage?: string }).validationMessage ?? "");
            expect(emailValidityMessage.length).toBeGreaterThan(0);

		const isEmailValid = await LoginPage.inpEmail(page)
			.getLocator()
			.evaluate((input) =>
				(input as { checkValidity?: () => boolean }).checkValidity?.() ?? false,
			);
        expect(isEmailValid).toBe(false);

		await LoginPage.lblLoginSectionHeader(page).beVisible();
		await LoginPage.lblShippingDetailsHeader(page).beHidden();
	});

	test("Login : Functional : should allow login with valid credentials and reveal checkout section", async ({ page }) => {
		// Exercise
		await LoginPage.inpEmail(page).doType("admin@admin.com", { clearFirst: true });
		await LoginPage.inpPassword(page).doType("admin123", { clearFirst: true });
		await LoginPage.btnSubmitLogin(page).doClick();

        // Verify
		await LoginPage.lnkLogOut(page).beVisible();
        await LoginPage.inpEmail(page).beHidden();
        await LoginPage.inpPassword(page).beHidden();
        await LoginPage.btnSubmitLogin(page).beHidden();
		await HomePage.lblShoppingCartHeader(page).beVisible();
		await HomePage.divShopItems(page).toHaveCount(10);
		await HomePage.btnProceedToCheckout(page).beVisible();
	});
});
