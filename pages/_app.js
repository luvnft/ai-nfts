import { WalletContextProvider } from "@mintbase-js/react";
import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Tooltip } from "react-tooltip";
import { NEAR_NETWORKS, mbjs } from "@mintbase-js/sdk";

function MyApp({ Component, pageProps }) {
  const network = process.env.NEXT_PUBLIC_NETWORK || NEAR_NETWORKS.TESTNET;
  const nearNetwork = network || NEAR_NETWORKS.TESTNET;

  // also the store you should be a minter
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  mbjs.config({
    network: "testnet",
    contractAddress: contractAddress,
  });

  const queryClient = new QueryClient();

  return (
    <>
      <Tooltip id="minted-nft" />

      <QueryClientProvider client={queryClient}>
        <WalletContextProvider
          contractAddress={contractAddress}
          network={nearNetwork}
        >
          <Component {...pageProps} />
        </WalletContextProvider>
      </QueryClientProvider>
      {/* <Analytics /> */}
    </>
  );
}

export default MyApp;
