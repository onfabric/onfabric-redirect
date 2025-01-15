"use server";

import axios from "axios";
import { createRandomString } from "@/lib/utils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPER_API_URL,
});

export async function generateLinkToken(
  userId?: string
) {
  if (!userId) {
    const externalId = createRandomString(16);
    userId = `auto-generated-${externalId}`;
  }
  const response = await axiosInstance.request({
    method: "POST",
    url: "/api/v1/link",
    params: {
      user_id: userId,
    },
    headers: {
      "Api-Key": process.env.ONFABRIC_API_KEY,
    }
  });
  return response.data;
}