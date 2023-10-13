import { useWallet } from "@mintbase-js/react";
import { MbButton } from "mintbase-ui";
import Link from "next/link";

function Navbar() {
  const { isConnected, connect, disconnect, activeAccountId } = useWallet();

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  const truncatedAccountId = truncateString(activeAccountId, 20);
  const buttonLabel = isConnected
    ? `Sign Out ${truncatedAccountId}`
    : " Connect NEAR Wallet";

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-40 lg:border-b border-solid border-gray-150">
      <div className="flex justify-between items-center">
        <h1 className="font-bold p-2 sm:p-4 border-gray-100">
          NFT AI Artistry
        </h1>
        <div className="flex gap-3">
          <Link href="/" className="text-black no-underline hover:underline">
            Create NFT
          </Link>
          <Link href="/" className="text-black no-underline hover:underline">
            Marketplace
          </Link>
        </div>
      </div>
      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        <MbButton onClick={buttonAction} label={buttonLabel} />
      </div>
    </nav>
  );
}

export default Navbar;
