import { useState } from "react";
import Items from "../components/Items";
import BuyModal from "../components/BuyModal/BuyModal";
import Navbar from "components/navbar";

function Store() {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleOpenBuyModal = (item) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setSelectedItem({});
    setShowBuyModal(false);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500 bg-teal-50 ">
      <Navbar />

      <div className="flex w-full">
        <Items showModal={handleOpenBuyModal} />
      </div>
      <div className="mx-24 mt-4">
        {!!showBuyModal && (
          <BuyModal closeModal={handleCloseBuyModal} item={selectedItem} />
        )}
      </div>
    </div>
  );
}

export default Store;
