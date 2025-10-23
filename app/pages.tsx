
'use client';

import { MiniKit } from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';
import RecipeList from '@/components/RecipeList';
import AddRecipe from '@/components/AddRecipe';
import WorldIDVerification from '@/components/WorldIDVerification';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize MiniKit
    if (MiniKit.isInstalled()) {
      console.log('MiniKit installed');
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            🍳 World Kitchen
          </h1>
          <p className="text-gray-600">
            Share recipes, discover flavors, connect with verified chefs
          </p>
        </header>

        {/* World ID Verification */}
        {!isVerified ? (
          <WorldIDVerification
            onVerified={(userData) => {
              setIsVerified(true);
              setUser(userData);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <p className="text-sm text-gray-600">
                ✓ Verified Chef
              </p>
            </div>

            {/* Add Recipe Section */}
            <AddRecipe user={user} />

            {/* Recipe Feed */}
            <RecipeList />
          </div>
        )}
      </div>
    </main>
  );
} 
