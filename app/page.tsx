import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold mb-4">Give-A-Wonderful-Day</h1>
        <p className="mb-8">Transparent, on-chain nonprofit donations powered by Ethereum and AI.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Connect Wallet</button>
      </div>
    </main>
  );
}
