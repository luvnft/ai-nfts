/*

useStoreData Hook
Description: This hook calls storeData method from @mintbase-js/data to get store data to render on Items.

*/

import { storeData } from "@mintbase-js/data";
import { useQuery } from "react-query";

const mapStoreData = (data) => ({
  stores: data?.data?.nft_contracts,
});

const useStoreData = () => {
  const formatedStores = ["nftaiartistry.mintspace2.testnet"];

  const { isLoading, error, data } = useQuery(
    "storeData",
    () => storeData(formatedStores),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreData,
    }
  );

  return {
    ...data,
    error,
    loading: isLoading,
  };
};

export { useStoreData };
