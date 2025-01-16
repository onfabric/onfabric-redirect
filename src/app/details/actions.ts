"use server";
import { redirect } from "next/navigation";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPER_API_URL,
});

export type CallbackUrl = {
  callback_url: string;
  external_id: string;
};

export async function getCallbackUrl(
  state: string
) {
  return await axiosInstance.request({
    method: "GET",
    url: `/api/v1/public/link/callback_url/${state}`,
  }).then(response => response.data as CallbackUrl)
    .catch(() => redirect(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?error=INVALID_STATE`));
}

export async function updateLinkUserEmail(
  userId: string,
  email: string
) {
  return await axiosInstance.request({
    method: "PUT",
    url: "/api/v1/link/email",
    params: {
      user_id: userId,
      email,
    },
    headers: {
      "Api-Key": process.env.ONFABRIC_API_KEY,
    }
  }).then(() => redirect(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?user_id=${userId}`));
}