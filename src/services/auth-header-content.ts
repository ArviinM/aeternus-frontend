import { default as axios, AxiosRequestHeaders } from "axios";

type UserInfo = {
  accessToken: string;
};

export default function getAuthHeaders(): AxiosRequestHeaders {
  // Set this to whatever the minimum token length should be (if you know)
  // Otherwise, you can leave at 1 for "not an empty string"
  const minTokenLength = 1;

  try {
    const userInfo = localStorage.getItem("user");

    // Abort if not string
    if (typeof userInfo !== "string")
      throw new Error("User info not found - Problem");

    // Destructure token
    const { accessToken } = JSON.parse(userInfo) as UserInfo;

    // Abort if token is not string and min length
    if (
      !(typeof accessToken === "string" && accessToken.length >= minTokenLength)
    ) {
      throw new Error("Invalid user access token");
    }
    // Return headers object
    return {
      "x-access-token": accessToken,
      "Content-Type": "multipart/form-data",
    };
  } catch {
    // Catch any errors and return an empty headers object
    return {};
  }
}
