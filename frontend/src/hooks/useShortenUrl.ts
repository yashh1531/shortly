import { useCallback, useState } from "react";
import { ApiError, shortenUrl } from "../services/api";
import { isValidUrl, normalizeUrl } from "../utils/validateUrl";
import type { ShortenStatus, ShortenUrlResponse } from "../types";

interface ShortenUrlState {
  status: ShortenStatus;
  result: ShortenUrlResponse | null;
  errorMessage: string | null;
}

export function useShortenUrl() {
  const [state, setState] = useState<ShortenUrlState>({
    status: "idle",
    result: null,
    errorMessage: null,
  });

  const submit = useCallback(async (rawUrl: string) => {
    if (!isValidUrl(rawUrl)) {
      setState({
        status: "error",
        result: null,
        errorMessage: "Please enter a valid URL.",
      });
      return;
    }

    setState({ status: "loading", result: null, errorMessage: null });

    try {
      const result = await shortenUrl(normalizeUrl(rawUrl));
      setState({ status: "success", result, errorMessage: null });
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      setState({ status: "error", result: null, errorMessage: message });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle", result: null, errorMessage: null });
  }, []);

  return { ...state, submit, reset };
}
