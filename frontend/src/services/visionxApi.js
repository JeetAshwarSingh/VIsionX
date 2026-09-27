const SCREENING_ANALYZE_URL =
  import.meta.env.VITE_SCREENING_ANALYZE_URL || "";

const ANALYSIS_STORAGE_KEY = "visionx.analysis.result";

/**
 * Send a retinal image to the screening inference backend.
 *
 * Expected:
 * - POST request
 * - multipart/form-data
 * - field name: "image"
 * - JSON response
 */
export async function analyzeScreeningImage(file) {
  if (!SCREENING_ANALYZE_URL) {
    throw new Error(
      "Screening inference endpoint is not configured. Set VITE_SCREENING_ANALYZE_URL in your .env file."
    );
  }

  if (!(file instanceof File)) {
    throw new Error("A retinal image file is required.");
  }

  const formData = new FormData();
  formData.append("image", file);

  let response;

  try {
    response = await fetch(SCREENING_ANALYZE_URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      `Unable to reach the screening inference service: ${
        error?.message || "Network error"
      }`
    );
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    // Backend may have returned a non-JSON response.
  }

  if (!response.ok) {
    const backendMessage =
      payload?.message ||
      payload?.error ||
      payload?.detail ||
      `Inference request failed with status ${response.status}.`;

    throw new Error(backendMessage);
  }

  if (!payload) {
    throw new Error("The inference service returned an empty response.");
  }

  return payload;
}

/**
 * Returns the configured inference endpoint.
 */
export function getScreeningAnalyzeUrl() {
  return SCREENING_ANALYZE_URL;
}

/**
 * Store analysis response for the next workflow page.
 */
export function storeAnalysisResult(result) {
  try {
    sessionStorage.setItem(
      ANALYSIS_STORAGE_KEY,
      JSON.stringify(result)
    );
  } catch (error) {
    console.error("Unable to store analysis result:", error);
  }
}

/**
 * Read previously stored analysis response.
 */
export function getStoredAnalysisResult() {
  try {
    const raw = sessionStorage.getItem(ANALYSIS_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Unable to read stored analysis result:", error);
    return null;
  }
}

/**
 * Remove stored analysis response.
 */
export function clearStoredAnalysisResult() {
  try {
    sessionStorage.removeItem(ANALYSIS_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear analysis result:", error);
  }
}

/**
 * Return the first value that is actually defined.
 */
export function firstDefined(...values) {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );
}

/**
 * Safely read a nested property using a dot path.
 *
 * Example:
 * readPath(result, "prediction.grade")
 */
export function readPath(source, path) {
  if (!source || !path) {
    return undefined;
  }

  return path
    .split(".")
    .reduce((current, key) => {
      if (
        current === undefined ||
        current === null
      ) {
        return undefined;
      }

      return current[key];
    }, source);
}

/**
 * Read the first available value from a list of paths.
 */
export function firstPath(source, paths = []) {
  for (const path of paths) {
    const value = readPath(source, path);

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return undefined;
}

/**
 * Convert backend image values into something usable
 * by an <img src="..." /> element.
 *
 * Supports:
 * - data URLs
 * - http/https URLs
 * - absolute frontend paths
 * - raw base64 PNG/JPEG data
 */
export function imageSource(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("data:")) {
    return trimmed;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `data:image/png;base64,${trimmed}`;
}