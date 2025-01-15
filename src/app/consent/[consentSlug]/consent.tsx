"use client"

import { useEffect, useState } from 'react';
import { generateLinkToken } from './actions';

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Consent(props: { consentSlug: string, userId?: string }) {
  const [inAppBrowser, setInAppBrowser] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const rules = [
      'WebView',
      '(iPhone|iPod|iPad)(?!.*Safari\\/)',
      'Android.*(wv)',
    ];
    const regex = new RegExp(`(${rules.join('|')})`, 'ig');
    setInAppBrowser(Boolean(userAgent.match(regex)));
  }, []);

  useEffect(() => {
    if (!inAppBrowser) {
      generateLinkToken(props.userId).then(response => {
        window.location.replace(`${process.env.NEXT_PUBLIC_CONSENT_APP_URL}/consent/${props.consentSlug}?token=${response.token}`);
      });
    }
  }, [inAppBrowser]);

  return (
    <div className="flex flex-col items-center text-center h-screen max-w-xl m-auto pt-16 pb-4 px-4">
      <Avatar>
        <AvatarImage src="/logo-icon-dark.svg" alt="Fabric Logo"/>
      </Avatar>
      <h1 className="mt-12 text-2xl font-bold">
        { inAppBrowser ? "In-app Browser Detected" : "Redirecting..." }
      </h1>
      <p className="px-8 mt-4">
        { inAppBrowser ? "We’ve detected that you’re using an in-app browser. For the best experience, please open the link in your default browser." : "We will redirect you through our consent flow shortly." }
      </p>
    </div>
  );
};