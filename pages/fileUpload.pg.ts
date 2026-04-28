import type { Page } from "@playwright/test";
import { ElementWrapper } from "../utils/wrappers/elementWrapper.wr";

export class FileUploadPage {
	static inpFileUpload(page: Page): ElementWrapper {
		return new ElementWrapper(page.locator("input[type='file']"));
	}

	static btnSubmitUpload(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByRole("button", { name: "Submit" }));
	}

	static lblUploadSuccess(page: Page): ElementWrapper {
		return new ElementWrapper(page.getByText("You have successfully uploaded", { exact: false }));
	}
}
