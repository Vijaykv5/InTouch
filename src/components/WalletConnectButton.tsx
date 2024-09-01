
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnectButton: React.FC = () => {
  return (
    <div className="fixed top-4 right-4">
      <WalletMultiButton className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-indigo-100" />
    </div>
  );
};

export default WalletConnectButton;
