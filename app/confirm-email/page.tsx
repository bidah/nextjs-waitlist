'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Logo = dynamic(() => import('@/components/Logo'), { ssr: false });

function ConfirmEmailContent() {
  const [message, setMessage] = useState('Confirming email...');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const confirmationAttempted = useRef(false);

  useEffect(() => {
    const confirmEmail = async () => {
      if (confirmationAttempted.current) {
        console.log('Confirmation already attempted, skipping');
        return;
      }

      console.log('Starting email confirmation for:', email);
      confirmationAttempted.current = true;

      if (!email) {
        setMessage('No email provided for confirmation.');
        return;
      }

      try {
        const response = await fetch(`/api/confirm-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        console.log('Confirmation response:', data);
        setMessage(data.message);
      } catch (error) {
        console.error('Error confirming email:', error);
        setMessage('An error occurred while confirming your email.');
      }
    };

    confirmEmail();
  }, [email]);

  return (
    <div className="h-dvh p-4 flex bg-white">
      <div className="rounded-3xl w-full flex flex-col items-center justify-center from-primary/20 to-background p-4 bg-[url('/bg.webp')] bg-cover bg-center">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="absolute top-0 left-0 right-0 w-full p-0">
            <div className="max-w-md mx-auto flex flex-start justify-center">
              <Logo width={300} height={160} className="sm:w-[400px] sm:h-[214px]" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-xl md:text-2xl text-center text-black font-semibold font-varela-round">
            {message}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailContent />
    </Suspense>
  );
}