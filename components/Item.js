import { EIconName, MbThingCard } from "mintbase-ui";
import { parseMedia } from "../utils";
import { getCachedImage } from "../utils/getCachedImages";

function Item({ item, showModal }) {
  const { mediaUrl } = parseMedia(item.media, item.base_uri);

  return (
    <MbThingCard
      style={{
        border: "1px solid ",
        borderRadius: "",
        backgroundColor: "#6ee7b7",
      }}
      cardInfo={{
        centerElement: (
          <div className="w-full relative object-cover">
            {mediaUrl ? (
              <img
                src={getCachedImage(mediaUrl)}
                alt={item.title}
                className="rounded"
              />
            ) : (
              <div className="w-full h-72 mb-10 flex justify-center items-center">
                {" "}
                No Nft Media Available
              </div>
            )}
          </div>
        ),
        midLeftText: <div className="text-black">{item.title}</div>,
        midRightText: "",
        botRightIcon: EIconName.NONE,
        onCenterElementClick: () => showModal({ metadataId: item.metadata_id }),
      }}
    />
  );
}

function LoadingItem() {
  const products = Array.from(Array(12).keys());

  return (
    <>
      {products.map((productKey) => (
        <div key={productKey} className="flex items-center justify-center ">
          <div className="w-full h-64 bg-slate-900 animate-pulse" />
        </div>
      ))}
    </>
  );
}

export { Item, LoadingItem };
