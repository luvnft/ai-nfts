import { WalletContextProvider } from "@mintbase-js/react";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Tooltip } from "react-tooltip";
import { NEAR_NETWORKS, Network, mbjs } from "@mintbase-js/sdk";

function MyApp({ Component, pageProps }) {
  const network = process.env.NEXT_PUBLIC_NETWORK || NEAR_NETWORKS.TESTNET;
  const nearNetwork = network || NEAR_NETWORKS.TESTNET;

  // also the store you should be a minter
  const contractAddress =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "mystore.mintbase1.near";

  mbjs.config({
    network: nearNetwork,
    contractAddress: contractAddress,
  });

  return (
    <>
      <Tooltip id="replicate-tooltip" />
      <Tooltip id="vercel-tooltip" />
      <Tooltip id="bytescale-tooltip" />
      <Tooltip id="github-tooltip" />
      <Tooltip id="youtube-tooltip" />
      <WalletContextProvider
        contractAddress={contractAddress}
        network={nearNetwork}
      >
        <Component {...pageProps} />
      </WalletContextProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
