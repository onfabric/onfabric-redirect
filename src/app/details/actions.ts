"use server";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPER_API_URL,
});

export type CallbackUrlResponse = {
  callback_url: string;
  external_id: string;
};

export async function getExternalUserId(
  state: string
) {
  const response = await axiosInstance.request<CallbackUrlResponse>({
    method: "GET",
    url: `/api/v1/public/link/callback_url/${state}`,
  });
  
  if (response.status !== 200) {
    throw new Error("Failed to get external user id");
  }

  return response.data.external_id;
}

export async function updateLinkUserEmail(
  userId: string,
  email: string
) {
  const response = await axiosInstance.request({
    method: "PUT",
    url: "/api/v1/link/email",
    params: {
      user_id: userId,
      email,
    },
    headers: {
      "Api-Key": process.env.ONFABRIC_API_KEY,
    }
  });

  if (response.status !== 200) {
    throw new Error("Failed to update link user email");
  }
}