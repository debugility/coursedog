import { expect, Locator, Page } from "@playwright/test";

export class ElementWrapper {
	private readonly playwrightLocator: Locator;

	constructor(locator: Locator) {
		this.playwrightLocator = locator;
	}

	async doClick(options?: {
		timeout?: number;
		force?: boolean;
		scrollIntoView?: boolean;
		position?: "top" | "center" | "bottom";
	}): Promise<void> {
		if (options?.scrollIntoView) {
			await this.playwrightLocator.scrollIntoViewIfNeeded({
				timeout: options?.timeout || 10000,
			});
		}

		const { position: positionOption, ...clickOptions } = options ?? {};
		let playwrightPosition: { x: number; y: number } | undefined;

		if (positionOption) {
			const box = await this.playwrightLocator.boundingBox({
				timeout: clickOptions.timeout,
			});
			if (!box) {
				throw new Error("Element is not visible or has no bounding box");
			}
			const x = box.width / 2;
			const y =
				positionOption === "top"
					? 2
					: positionOption === "center"
						? box.height / 2
						: box.height - 2;
			playwrightPosition = { x, y };
		}

		await this.playwrightLocator.click({
			...clickOptions,
			...(playwrightPosition && { position: playwrightPosition }),
		});
	}

	async doHover(options?: {
		timeout?: number;
		force?: boolean;
	}): Promise<void> {
		await this.playwrightLocator.hover(options);
	}

	async doType(
		text: string,
		options?: {
			delay?: number;
			timeout?: number;
			scrollIntoView?: boolean;
			clearFirst?: boolean;
		},
	): Promise<void> {
		if (options?.scrollIntoView) {
			await this.playwrightLocator.scrollIntoViewIfNeeded({
				timeout: options?.timeout,
			});
		}

		if (options?.clearFirst) {
			await this.playwrightLocator.fill("", { timeout: options?.timeout });
		}

		// If delay is provided, use type() so keystroke delay is respected.
		if (typeof options?.delay === "number") {
			await this.playwrightLocator.type(text, {
				delay: options.delay,
				timeout: options?.timeout,
			});
			return;
		}

		await this.playwrightLocator.fill(text, { timeout: options?.timeout });
	}

	async doCheck(options?: {
		checked?: boolean;
		force?: boolean;
		timeout?: number;
	}): Promise<void> {
		await this.playwrightLocator.setChecked(true, options);
	}

	async doUncheck(options?: {
		force?: boolean;
		timeout?: number;
	}): Promise<void> {
		await this.playwrightLocator.setChecked(false, options);
	}

	async doClear(options?: { timeout?: number }): Promise<void> {
		await this.playwrightLocator.clear(options);
	}

	async doSelectOption(
		page: Page,
		value: string | string[],
		options?: { timeout?: number; force?: boolean },
	): Promise<void> {
		await this.playwrightLocator.click(options);
		const optionName = Array.isArray(value) ? value[0] : value;
		await page
			.getByRole("button", { name: optionName, exact: true })
			.click(options);
	}

	/**
	 * For native <select> elements: select an option by its visible label text.
	 * Use this for HTML select/option dropdowns (e.g. id="travel-agent").
	 */
	async doSelectOptionByLabel(
		label: string,
		options?: { timeout?: number },
	): Promise<void> {
		await this.playwrightLocator.selectOption({ label }, options);
	}

	/**
	 * For dropdowns with checkbox options (e.g. DEPARTMENTS: Administration, Automation, Mayor's Office).
	 * Clicks the dropdown trigger to open it, then finds the checkbox by accessible name and sets checked state.
	 */
	async doCheckDrpDownOption(
		page: Page,
		optionName: string,
		check: boolean,
		options?: { timeout?: number; force?: boolean },
	): Promise<void> {
		await this.playwrightLocator.click(options);
		await page.getByRole("checkbox", { name: optionName }).setChecked(check, options);
	}

	async doPress(
		key: string,
		options?: { delay?: number; timeout?: number },
	): Promise<void> {
		await this.playwrightLocator.press(key, options);
	}

	async doScrollIntoView(options?: { timeout?: number }): Promise<ElementWrapper> {
		await this.playwrightLocator.scrollIntoViewIfNeeded(options);
		return this;
	}

	async scrollIntoViewAndBeVisible(options?: { timeout?: number }): Promise<void> {
		await this.playwrightLocator.scrollIntoViewIfNeeded(options);
		await expect(this.playwrightLocator).toBeVisible();
	}

	async doWaitForVisible(options?: {
		state?: "attached" | "detached" | "visible" | "hidden";
		timeout?: number;
	}): Promise<void> {
		await this.playwrightLocator.waitFor({
			state: options?.state || "visible",
			timeout: options?.timeout,
		});
	}

	getLocator(): Locator {
		return this.playwrightLocator;
	}

	locator(selector: string): ElementWrapper {
		return new ElementWrapper(this.playwrightLocator.locator(selector));
	}

	first(): ElementWrapper {
		return new ElementWrapper(this.playwrightLocator.first());
	}

	nth(index: number): ElementWrapper {
		return new ElementWrapper(this.playwrightLocator.nth(index));
	}

	filter(options: {
		hasText?: string | RegExp;
		has?: Locator | ElementWrapper;
	}): ElementWrapper {
		const filterOptions = {
			...options,
			has:
				options.has instanceof ElementWrapper
					? options.has.getLocator()
					: options.has,
		};
		return new ElementWrapper(this.playwrightLocator.filter(filterOptions));
	}

	async should(assertion: string, value?: string | string[]): Promise<void> {
		const locator = this.playwrightLocator;

		switch (assertion) {
			case "be.checked":
			case "beChecked":
				await expect(locator).toBeChecked();
				break;
			case "be.enabled":
			case "beEnabled":
				await expect(locator).toBeEnabled();
				break;
			case "be.present":
			case "bePresent":
				await expect(locator).toBeAttached();
				break;
			case "be.visible":
			case "beVisible":
				await expect(locator).toBeVisible();
				break;
			case "contain.text":
			case "containText":
				if (value === undefined) {
					throw new Error("containText requires a value parameter");
				}
				await expect(locator).toContainText(value as string);
				break;
			case "contain.value":
			case "containValue":
				if (value === undefined) {
					throw new Error("containValue requires a value parameter");
				}
				await expect(locator).toHaveValue(value as string);
				break;
			case "have.class":
			case "haveClass":
				if (value === undefined) {
					throw new Error("haveClass requires a value parameter");
				}
				await expect(locator).toHaveClass(value as string);
				break;
			case "have.selected.value":
			case "haveSelectedValue":
				if (value === undefined) {
					throw new Error("haveSelectedValue requires a value parameter");
				}
				await expect(locator).toHaveValue(value as string);
				break;
			case "have.text":
			case "haveText":
				if (value === undefined) {
					throw new Error("haveText requires a value parameter");
				}
				await expect(locator).toHaveText(value as string);
				break;
			case "have.value":
			case "haveValue":
				if (value === undefined) {
					throw new Error("haveValue requires a value parameter");
				}
				await expect(locator).toHaveValue(value as string);
				break;
			default:
				throw new Error(`Unknown assertion: ${assertion}`);
		}
	}

	async beChecked(): Promise<void> {
		await expect(this.playwrightLocator).toBeChecked();
	}

	async beEnabled(): Promise<void> {
		await expect(this.playwrightLocator).toBeEnabled();
	}

	async bePresent(): Promise<void> {
		await expect(this.playwrightLocator).toBeAttached();
	}

	async beVisible(): Promise<void> {
		await expect(this.playwrightLocator).toBeVisible();
	}

	/** Assert the element is hidden (not visible). */
	async beHidden(): Promise<void> {
		await expect(this.playwrightLocator).toBeHidden();
	}

	/** Assert the element is not visible (same as beHidden). */
	async notBeVisible(): Promise<void> {
		await expect(this.playwrightLocator).toBeHidden();
	}

	/** Assert the element is not checked (checkbox/radio). */
	async notBeChecked(): Promise<void> {
		await expect(this.playwrightLocator).not.toBeChecked();
	}

	/** Assert the element is disabled. */
	async beDisabled(): Promise<void> {
		await expect(this.playwrightLocator).toBeDisabled();
	}

	/** Assert the element is detached from the DOM. */
	async beDetached(): Promise<void> {
		await expect(this.playwrightLocator).not.toBeAttached();
	}

	async containText(text: string | RegExp): Promise<void> {
		await expect(this.playwrightLocator).toContainText(text);
	}

	async containValue(value: string): Promise<void> {
		await expect(this.playwrightLocator).toHaveValue(value);
	}

	async haveClass(
		className: string | RegExp | (string | RegExp)[],
	): Promise<void> {
		await expect(this.playwrightLocator).toHaveClass(className);
	}

	async haveSelectedValue(value: string | RegExp): Promise<void> {
		await expect(this.playwrightLocator).toHaveValue(value);
	}

	async haveText(text: string | RegExp, options?: { scrollIntoView?: boolean }): Promise<void> {
		if (options?.scrollIntoView) {
			await this.playwrightLocator.scrollIntoViewIfNeeded({
				timeout: 10000,
			});
		}
		await expect(this.playwrightLocator).toHaveText(text);
	}

	async haveValue(value: string): Promise<void> {
		await expect(this.playwrightLocator).toHaveValue(value);
	}

	/** Assert the element does not contain the given text. */
	async notContainText(text: string | RegExp): Promise<void> {
		await expect(this.playwrightLocator).not.toContainText(text);
	}

	/** Assert the element does not have the exact text. */
	async notHaveText(text: string | RegExp): Promise<void> {
		await expect(this.playwrightLocator).not.toHaveText(text);
	}

	/** Assert the element does not have the given value (e.g. input). */
	async notHaveValue(value: string): Promise<void> {
		await expect(this.playwrightLocator).not.toHaveValue(value);
	}
}
