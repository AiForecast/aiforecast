'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WhitePaper() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the PDF file in the public directory
    window.location.href = '/WhitePaper.pdf';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading whitepaper...</p>
    </div>
  );
}
