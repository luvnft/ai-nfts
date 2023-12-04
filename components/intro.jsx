import { useWallet } from "@mintbase-js/react";
import { MbButton } from "mintbase-ui";

function Intro() {
  const { isConnected, connect, disconnect, activeAccountId } = useWallet();

  const buttonLabel = isConnected
    ? `Sign Out ${activeAccountId}`
    : " Connect NEAR Wallet";

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <nav className="flex justify-between w-full sticky text-teal-700 top-0 z-40 lg:border-b border-solid border-gray-150">
      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        <MbButton
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
          onClick={buttonAction}
          label={buttonLabel}
        />
      </div>
    </nav>
  );
}

export default Intro;
