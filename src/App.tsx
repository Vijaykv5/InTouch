import React, { FC, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing dependencies
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import LandingPage from "./components/LandingPage";
import "./index.css";
import WalletConnectButton from "./components/WalletConnectButton";
import "@solana/wallet-adapter-react-ui/styles.css"; 
import UserProfilePage from "./components/UserProfilePage";
import CreatorDetailPage from "./components/CreatorDetailPage";
import InTouchSteps from "./components/Steps";
import { DEVNET_URL } from "./utils/constants";


const App: FC = () => {
  const endpoint = useMemo(() => DEVNET_URL, []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletConnectButton />
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/creators" element={<UserProfilePage />} />
              <Route path="/tutorial" element={<InTouchSteps/>} />
              {/* <Route path="/user/:userId" element={<UserDetailPage />} /> */}
              <Route
                path="/creator/:userName"
                element={<CreatorDetailPage />}
              />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
