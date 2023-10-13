/*

useStoreNfts Hook
Description: This hook calls storeNfts method from @mintbase-js/data to get store nfts to render on Items.

*/

import { storeNfts } from "@mintbase-js/data";
import { useQuery } from "react-query";

const mapStoreNfts = (data) => ({
  nftsData: data?.data?.mb_views_nft_metadata_unburned,
});

const useStoreNfts = (store) => {
  const defaultStores = process.env.NEXT_PUBLIC_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

  console.log("Formatted Stores", formatedStores);

  const { isLoading, error, data } = useQuery(
    ["storeNfts", store],
    () => storeNfts(formatedStores, false),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreNfts,
    }
  );

  console.log("useStoreNfts hook data", data);

  return { ...data, error, loading: isLoading };
};

export { useStoreNfts };
