import { useWallet } from "@mintbase-js/react";
import { MbButton } from "mintbase-ui";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const { isConnected, connect, disconnect, activeAccountId } = useWallet();
  const router = useRouter();

  const isCreateNFTActive = router.pathname === "/";
  const isMarketplaceActive = router.pathname === "/marketplace";

  function truncateString(str, num) {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num) + "...";
  }
  const truncatedAccountId = truncateString(activeAccountId, 20);
  const buttonLabel = isConnected
    ? `Sign Out ${truncatedAccountId}`
    : " Connect NEAR Wallet";

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <nav className="flex justify-between items-center w-full bg-white sticky top-0 z-40 lg:border-b border-solid border-gray-150">
      <h1 className="font-bold p-2 sm:p-4 border-gray-100">NFT AI Artistry</h1>
      <div className="flex gap-3">
        <Link
          href="/"
          className={`text-black no-underline px-4 py-2 rounded-full transition hover:shadow-lg ${
            isCreateNFTActive ? "bg-gray-300" : "bg-white"
          } hover:bg-gray-300`}
        >
          Create NFT
        </Link>
        <Link
          href="/marketplace"
          className={`text-black no-underline px-4 py-2 rounded-full transition hover:shadow-lg ${
            isMarketplaceActive ? "bg-gray-300" : ""
          } hover:bg-gray-300`}
        >
          Marketplace
        </Link>
      </div>

      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        <MbButton onClick={buttonAction} label={buttonLabel} />
      </div>
    </nav>
  );
}

export default Navbar;
