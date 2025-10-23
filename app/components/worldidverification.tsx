
'use client';

import { MiniKit, VerifyCommandInput, ResponseEvent } from '@worldcoin/minikit-js';
import { useState } from 'react';

interface Props {
  onVerified: (userData: any) => void;
}

export default function WorldIDVerification({ onVerified }: Props) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);

    if (!MiniKit.isInstalled()) {
      alert('Please open this app in World App');
      setIsVerifying(false);
      return;
    }

    const verifyPayload: VerifyCommandInput = {
      action: 'verify-chef',
      signal: '',
      verification_level: 'orb', // or 'device'
    };

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === 'success') {
        // Verify the proof on your backend
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payload: finalPayload,
            action: 'verify-chef',
            signal: '',
          }),
        });

        const data = await response.json();

        if (data.verified) {
          onVerified({ nullifier_hash: finalPayload.nullifier_hash });
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-4xl">👨‍🍳</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Join World Kitchen
        </h2>
        <p className="text-gray-600">
          Verify your identity with World ID to start sharing recipes
        </p>
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-full transition-colors disabled:opacity-50"
      >
        {isVerifying ? 'Verifying...' : 'Verify with World ID'}
      </button>

      <p className="text-sm text-gray-500 mt-4">
        This ensures authentic chefs and prevents spam
      </p>
    </div>
  );
} 
