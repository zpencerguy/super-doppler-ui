import { useEffect, useState } from "react";

type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const ConnectToPhantom = () => {
  const [phantom, setPhantom] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  if (typeof window !== "undefined") {
    // const isPhantomConnected = localStorage.getItem("walletConnected");
    // if (isPhantomConnected == "connected") {
    //   console.log("You are connected to Phantom Wallet");
    // }
  }

  useEffect(() => {
    if ("solana" in window) {
      setPhantom(window["solana"]);
    }
  }, []);

  const [connected, setConnected] = useState(false);


  useEffect(() => {
    phantom?.on("connect", () => {
      setConnected(true);
      console.log(
        'Connected with public key:'
      );
    });

    phantom?.on("disconnect", () => {
      setConnected(false);
    });
  }, [phantom]);

  const connectHandler = () => {
    phantom?.connect();
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
  };

  if (phantom) {
    
    if (connected) {
      if (typeof window !== "undefined") {
        localStorage.setItem("walletConnected", "connected")

        return (
          <button
            onClick={disconnectHandler}
            className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75 connected"
          >
            Disconnect
          </button>
        );
      }
      
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("walletConnected", "disconnected")

      return (
        <button
          onClick={connectHandler}
          className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75 disconnected"
        >
          Connect to Phantom
        </button>
      );
    }

    
  }

  return (
    <a
      href="https://phantom.app/"
      target="_blank"
    >
      Get Phantom
    </a>
  );
};

export default ConnectToPhantom;
