import React, { useState } from "react";
import { FaBars, FaTimes, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const commonStyles = {
  link: "inline-flex items-center text-2xl font-bold text-gray-900 space-x-2",
  navLink:
    "inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-gray-900 transition-all duration-200 border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
  buttonPrimary:
    "inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700",
  buttonSecondary:
    "inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-gray-900 transition-all duration-200 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900",
};

const LandingPage: React.FC = () => {
  const { connected } = useWallet();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (connected) {
      navigate("/creators");
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <header className="py-4 bg-white sm:py-5">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <a href="#" title="InTouch" className={commonStyles.link}>
                <img
                  className="w-auto h-8"
                  src="https://i.ibb.co/6vVXYQc/Screenshot-2024-09-01-at-10-16-29-PM.png"
                  alt="InTouch"
                />
              </a>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-12 lg:ml-12">
              {["How to use?", "  "].map((item) => (
                <a
                  href="/tutorial"
                  key={item}
                  title={item}
                  className={commonStyles.navLink}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex ml-4 lg:hidden">
              <button
                type="button"
                className={`${commonStyles.buttonSecondary} p-2.5`}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 mt-20 bg-white sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12">
            <div className="flex flex-col justify-between lg:order-2">
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 rounded-xl bg-blue-50">
                  {" "}
                  #1 Personalized DM for content creators{" "}
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl xl:text-7xl sm:tracking-tight">
                  Get In Touch with Creators
                </h1>
              </div>

              <div className="mt-6 lg:mt-auto">
                <p className="text-lg leading-7 text-gray-700 lg:leading-8 lg:text-xl">
                  <b>InTouch</b> simplifies your direct messaging experience by
                  offering personalized, secure, and intuitive communication
                  tools.
                </p>
                <div className="mt-10">
                  <a
                    href="#"
                    title="Let's Get Started"
                    className={commonStyles.buttonPrimary}
                    role="button"
                    onClick={handleGetStartedClick}
                  >
                    Let's Get Started
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:order-1">
              <div className="relative w-full max-w-sm mx-auto">
                <img
                  className="relative  max-w-xs mx-auto sm:max-w-sm rounded-2xl  w-[160%] h-[300px]"
                  src="https://i.ibb.co/5YrQGBf/Intouch.png"
                  alt="AuraUI Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full sm:w-96">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Connect Your Wallet
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">
              To get started, please connect your Solana wallet.
            </p>
            <div className="flex justify-center mb-6">
              <WalletMultiButton className="w-full max-w-xs px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
