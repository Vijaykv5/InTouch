import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/firebase-config";
import { PUBLIC_KEY } from "../utils/constants";

const style = {
  commonInputStyles:
    "block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500",
  commonButtonStyles:
    "inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md focus:outline-none bg-orange-500 hover:bg-orange-600",
  commonSectionStyles: "flex items-center justify-center h-screen bg-gray-900",
  commonContainerStyles: "max-w-6xl px-4 mx-auto sm:px-6 lg:px-8",
  commonTitleStyles:
    "text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl",
  commonTextStyles:
    "max-w-xl mx-auto mt-4 text-base leading-relaxed text-white",
  formContainerStyles:
    "bg-white rounded-md shadow-lg p-6 w-full sm:p-10 max-w-4xl mx-auto", 
};

const Form = ({ contentCreator }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const wallet = useWallet();
  const connection = new Connection(DEVNET_URL);

  const handleSendMessage = async () => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet to send a message.");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey as PublicKey,
          toPubkey: new PublicKey(
            PUBLIC_KEY
          ),
          lamports: 0.01 * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      const formData = {
        name,
        email,
        message,
        transactionSignature: signature,
      };

      const storageRef = ref(storage, `messages/${Date.now()}.json`);

      await uploadBytes(
        storageRef,
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      toast.success("Message sent successfully and transaction completed!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className={style.formContainerStyles}>
      <h3 className="text-2xl font-semibold text-black">Get a Free Quote</h3>
      <p className="mt-4 text-base text-gray-600">
        Fill all details about your project for {contentCreator}
      </p>
      <form action="#" method="POST" className="mt-4">
        <div className="space-y-6">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className={style.commonInputStyles}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={style.commonInputStyles}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name="message"
            id="message"
            placeholder="Enter your project brief"
            className={`${style.commonInputStyles} resize-y`}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            <button
              type="button"
              className={style.commonButtonStyles}
              onClick={handleSendMessage}
            >
              Send Message (0.01 SOL)
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Contact1 = () => {
  const { userName } = useParams();

  return (
    <section className={style.commonSectionStyles}>
      <div className={style.commonContainerStyles}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
          <div className="flex flex-col justify-center lg:py-5">
            <h1 className={style.commonTitleStyles}>
              <span className="text-orange-500">InTouch</span> with {userName}
            </h1>
            <div>
              <br />
              <h2 className={style.commonTitleStyles}>
                It&apos;s time to get in touch!
              </h2>
              <p className={style.commonTextStyles}>
                Use InTouch and send personalised messages to {userName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center lg:pl-12">
            <Form contentCreator={userName} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
