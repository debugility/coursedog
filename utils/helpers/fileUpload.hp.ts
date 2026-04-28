import type { Page } from "@playwright/test";
import { ElementWrapper } from "../wrappers/elementWrapper.wr";


export async function uploadViaFileChooser(
	page: Page,
	uploadTrigger: ElementWrapper,
	filePath: string,
): Promise<void> {
	const fileChooserPromise = page.waitForEvent("filechooser");
	await uploadTrigger.doClick();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(filePath);
}
