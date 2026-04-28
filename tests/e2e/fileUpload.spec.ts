import { test } from "@playwright/test";
import { FileUploadPage } from "../../pages/fileUpload.pg";
import { uploadViaFileChooser } from "../../utils/helpers/fileUpload.hp";

test.describe("E2E | File Upload", () => {
	test("E2E | File Upload : should upload sample file and show success message", async ({ page }) => {
		// Setup
		const uploadFilePath = "fixtures/sample-upload.txt";
		const uploadFileName = "sample-upload.txt";

		// Exercise
		await page.goto("/file-upload.html");
		await uploadViaFileChooser(page, FileUploadPage.inpFileUpload(page), uploadFilePath);

        // Verify
		await FileUploadPage.inpFileUpload(page).haveValue(/sample-upload\.txt$/);

        // Exercise
		await FileUploadPage.btnSubmitUpload(page).doClick();

		// Verify
		await FileUploadPage.lblUploadSuccess(page).beVisible();
		await FileUploadPage.lblUploadSuccess(page).haveText(`You have successfully uploaded "${uploadFileName}"`);
	});
});
