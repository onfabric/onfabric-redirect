"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [userAgent, setUserAgent] = useState('');
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setUserAgent(ua);

    const rules = [
      'WebView',
      '(iPhone|iPod|iPad)(?!.*Safari\\/)',
      'Android.*(wv)',
    ];
    const regex = new RegExp(`(${rules.join('|')})`, 'ig');
    setInApp(Boolean(ua.match(regex)));
  }, []);

  return (
    <div>  
      <div>
        User Agent: {userAgent || 'Loading...'}
      </div>
      <div>
        In App: {inApp ? 'true' : 'false'}
      </div>
    </div>
  );
}
