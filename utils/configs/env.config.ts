import dotenv from "dotenv";

const dotenvResult = dotenv.config();
const env = dotenvResult.parsed ?? {};

type TraceMode = "on" | "off" | "on-first-retry" | "retain-on-failure";
type ScreenshotMode = "off" | "on" | "only-on-failure";
type VideoMode = "off" | "on" | "retain-on-failure" | "on-first-retry";
type BrowserMode = "headless" | "headed";

export class EnvConfig {
  private static getValue(key: string, fallback: string): string {
    return env[key] ?? fallback;
  }

  private static getNumber(key: string, fallback: number): number {
    const rawValue = this.getValue(key, String(fallback));
    const parsedValue = Number.parseInt(rawValue, 10);
    return Number.isNaN(parsedValue) ? fallback : parsedValue;
  }

  private static getBoolean(key: string, fallback: boolean): boolean {
    const value = this.getValue(key, String(fallback)).toLowerCase();
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    return fallback;
  }

  static getBaseUrl(): string {
    return this.getValue("BASE_URL", "https://qa-practice.netlify.app/");
  }

  static getTestTimeout(): number {
    return this.getNumber("TEST_TIMEOUT", 60000);
  }

  static isCI(): boolean {
    return this.getBoolean("CI", false);
  }

  static isParallelExecution(): boolean {
    return this.getBoolean("PARALLEL_EXECUTION", true);
  }

  static getTestRetries(): number {
    return this.getNumber("TEST_RETRIES", this.isCI() ? 2 : 0);
  }

  static getWorkers(): number | undefined {
    const workers = this.getValue("WORKERS", "1");
    if (workers.toLowerCase() === "auto") {
      return undefined;
    }
    return this.getNumber("WORKERS", 1);
  }

  static getTraceMode(): TraceMode {
    const traceMode = this.getValue("TRACE_MODE", "on-first-retry");
    if (
      traceMode === "on" ||
      traceMode === "off" ||
      traceMode === "on-first-retry" ||
      traceMode === "retain-on-failure"
    ) {
      return traceMode;
    }
    return "on-first-retry";
  }

  static getScreenshotMode(): ScreenshotMode {
    const screenshotMode = this.getValue("SCREENSHOT_MODE", "only-on-failure");
    if (
      screenshotMode === "off" ||
      screenshotMode === "on" ||
      screenshotMode === "only-on-failure"
    ) {
      return screenshotMode;
    }
    return "only-on-failure";
  }

  static getVideoMode(): VideoMode {
    const videoMode = this.getValue("VIDEO_MODE", "retain-on-failure");
    if (
      videoMode === "off" ||
      videoMode === "on" ||
      videoMode === "retain-on-failure" ||
      videoMode === "on-first-retry"
    ) {
      return videoMode;
    }
    return "retain-on-failure";
  }

  static getBrowserMode(): BrowserMode {
    const browserMode = this.getValue("BROWSER_MODE", "headless");
    if (browserMode === "headless" || browserMode === "headed") {
      return browserMode;
    }
    return "headless";
  }

  static isHeadless(): boolean {
    return this.getBrowserMode() !== "headed";
  }

  static getActionTimeout(): number {
    return this.getNumber("ACTION_TIMEOUT", 60000);
  }

  static getNavigationTimeout(): number {
    return this.getNumber("NAVIGATION_TIMEOUT", 60000);
  }

  static getExpectTimeout(): number {
    return this.getNumber("EXPECT_TIMEOUT", 10000);
  }

  static getNetworkIdleTimeout(): number {
    return this.getNumber("NETWORK_IDLE_TIMEOUT", this.getNavigationTimeout());
  }

  static getViewportSize(): { width: number; height: number } {
    return {
      width: this.getNumber("VIEWPORT_WIDTH", 1920),
      height: this.getNumber("VIEWPORT_HEIGHT", 1080),
    };
  }

  static getSlowMo(): number {
    return this.getNumber("SLOW_MO", 0);
  }

  static isDebug(): boolean {
    return this.getBoolean("DEBUG", false);
  }

  static isConsoleLogEnabled(): boolean {
    return this.getBoolean("CONSOLE_LOG", false);
  }

  static getReporterMode(): string {
    return this.getValue("REPORTER", "all").toLowerCase();
  }

  static getArtifactRetentionDays(): number {
    return this.getNumber("ARTIFACT_RETENTION_DAYS", 30);
  }
}