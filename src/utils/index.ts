import axios, { AxiosError } from "axios";
interface AxiosErrorResponse {
  data?: {
    errors?: Record<string, string[]> | string[];
  };
  status?: number;
}

export const getErrorMessage = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err: any = error.response as AxiosErrorResponse;

    // For array of errors
    if (Array.isArray(err?.data?.errors)) {
      const messages: string[] = [];
      for (const val of err.data.errors) {
        if (val?.description) {
          messages.push(val.description);
        }
      }
      if (messages.length > 0) {
        return messages.join(", ");
      }
    } else if (typeof err?.data?.errors === "object") {
      const messages: string[] = [];
      for (const e in err.data.errors) {
        if (err.data.errors[e][0]?.message) {
          messages.push(err.data.errors[e][0].message);
        }
      }
      if (messages.length > 0) {
        return messages.join(", ");
      }
    } else if (err?.data) {
      return err?.data["message"];
    } else if (err?.status === 401) {
      return "Please login";
    } else if (err) {
      return err?.data["message"];
    }
  }

  return "An unexpected error occurred";
};
