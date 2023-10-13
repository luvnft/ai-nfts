/*

useStoreData Hook
Description: This hook calls storeData method from @mintbase-js/data to get store data to render on Items.

*/

import { storeData } from "@mintbase-js/data";
import { mbjs, NEAR_NETWORKS } from "@mintbase-js/sdk";
import { useQuery } from "react-query";
// import { MAINNET_CONFIG, TESTNET_CONFIG } from "../config/constants";

const mapStoreData = (data) => ({
  stores: data?.data?.nft_contracts,
});

const useStoreData = () => {
  // const stores =
  //   mbjs.keys?.network === NEAR_NETWORKS.TESTNET
  //     ? TESTNET_CONFIG.stores
  //     : MAINNET_CONFIG.stores;

  const defaultStores = process.env.NEXT_PUBLIC_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

  const { isLoading, error, data } = useQuery(
    "storeData",
    () => storeData(formatedStores),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreData,
    }
  );

  // console.log("useStoreData hook data", data);

  return {
    ...data,
    error,
    loading: isLoading,
  };
};

export { useStoreData };
