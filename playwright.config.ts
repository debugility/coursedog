import { defineConfig, devices } from "@playwright/test";
import type { ReporterDescription } from "@playwright/test";
import { EnvConfig } from "./utils/configs/env.config";

function getBaseUrl(): string {
	return EnvConfig.getBaseUrl();
}

function getReporterConfig() {
	const reporterMode = EnvConfig.getReporterMode();

	if (reporterMode === "html") {
		return [["html", { outputFolder: "playwright-report", open: "never" }]] as ReporterDescription[];
	}
	if (reporterMode === "allure") {
		return [["allure-playwright", { outputFolder: "allure-results" }]] as ReporterDescription[];
	}
	if (reporterMode === "junit") {
		return [["junit", { outputFile: "test-results/junit.xml" }]] as ReporterDescription[];
	}

	return [
		["html", { outputFolder: "playwright-report", open: "never" }],
		["allure-playwright", { outputFolder: "allure-results" }],
		["junit", { outputFile: "test-results/junit.xml" }],
	] as ReporterDescription[];
}

export default defineConfig({
	testDir: "./tests",
	timeout: EnvConfig.getTestTimeout(),
	fullyParallel: EnvConfig.isParallelExecution(),
	forbidOnly: EnvConfig.isCI(),
	retries: EnvConfig.getTestRetries(),
	workers: EnvConfig.isCI() ? 1 : EnvConfig.getWorkers(),
	reporter: getReporterConfig(),
	expect: {
		timeout: EnvConfig.getExpectTimeout(),
	},
	use: {
		baseURL: getBaseUrl(),
		headless: EnvConfig.isHeadless(),
		trace: EnvConfig.getTraceMode(),
		screenshot: EnvConfig.getScreenshotMode(),
		video: EnvConfig.getVideoMode(),
		actionTimeout: EnvConfig.getActionTimeout(),
		navigationTimeout: EnvConfig.getNetworkIdleTimeout(),
		viewport: EnvConfig.getViewportSize(),
		launchOptions: {
			slowMo: EnvConfig.getSlowMo(),
		},
	},
	metadata: {
		debug: EnvConfig.isDebug(),
		consoleLog: EnvConfig.isConsoleLogEnabled(),
		artifactRetentionDays: EnvConfig.getArtifactRetentionDays(),
	},
	outputDir: "test-results/",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
});
