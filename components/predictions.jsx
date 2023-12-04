import { Copy as CopyIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "components/loader";
import { useForm } from "react-hook-form";
import { MbButton, MbText } from "mintbase-ui";
import { useWallet } from "@mintbase-js/react";
import { mint, execute } from "@mintbase-js/sdk";
import { uploadReference } from "@mintbase-js/storage";
import { BounceLoader } from "react-spinners";

export default function Predictions({ predictions, submissionCount }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (submissionCount > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return;

  return (
    <section className="w-full my-10">
      <h2 className="text-center text-3xl font-bold m-6 text-teal-700">
        Results
      </h2>

      {submissionCount > Object.keys(predictions).length && (
        <div className="pb-10 mx-auto w-full text-center">
          <div className="pt-10" ref={scrollRef} />
          <Loader />
        </div>
      )}

      {Object.values(predictions)
        .slice()
        .reverse()
        .map((prediction, index) => (
          <Fragment key={prediction.id}>
            {index === 0 &&
              submissionCount == Object.keys(predictions).length && (
                <div ref={scrollRef} />
              )}
            <Prediction prediction={prediction} />
          </Fragment>
        ))}
    </section>
  );
}

export function Prediction({ prediction, showLinkToNewScribble = true }) {
  const { register, handleSubmit } = useForm();
  const { selector, activeAccountId } = useWallet();
  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);

  const onSubmit = async (data) => {
    // console.log("Data", data);
    const wallet = await selector.wallet();
    const imageSrc = prediction.output[prediction.output.length - 1];
    // convert to blob
    const blob = await fetch(imageSrc).then((r) => r.blob());
    const file = new File([blob], "output_image.png", { type: "image/png" });

    if (file == null || activeAccountId == null) {
      console.error("Error uploading file");
      return;
    } else {
      try {
        // upload to arweave -> Mint NFT
        setUploading(true);
        const reference = await handleUpload(file, data);
        setUploading(false);
        setMinting(true);
        const txStatus = await handleMint(reference, activeAccountId, wallet);
        setMinting(false);
      } catch (error) {
        console.log("Error", error);
        alert("Error minting");
        setMinting(false);
        setUploading(false);
      }
    }
  };

  if (!prediction) return null;

  return (
    <div className="mt-6 mb-12 text-teal-700">
      <div className="w-1/2 aspect-circle flex justify-center items-center mx-auto">
        {prediction.output?.length ? (
          <img
            src={prediction.output[prediction.output.length - 1]}
            alt="output image"
            className="w-full aspect-square"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Loader />
          </div>
        )}
      </div>

      <div className="text-center px-4 opacity-60 text-xl">
        &ldquo;{prediction.input.prompt}&rdquo;
      </div>
      <div className="text-center py-2">
        {showLinkToNewScribble && (
          <Link href="/">
            <button className="lil-button" style={{ color: "#0f766e" }}>
              <PlusCircleIcon className="icon" />
              Create a new scribble
            </button>
          </Link>
        )}
      </div>
      {prediction.output?.length && !minting && !uploading ? (
        <div className="flex flex-col items-center justify-center mt-2">
          <MbText className="text-3xl font-semibold">Mint your NFT Now</MbText>
          <div className="w-full mt-4 space-y-4">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit, (errorMsgs) =>
                console.error(errorMsgs)
              )}
            >
              <label className="font-bold">Name</label>
              <input
                className="text-black"
                placeholder="Name"
                required
                {...register("title", {
                  required: true,
                  minLength: { value: 1, message: "" },
                })}
              />

              <label className="font-bold">Description</label>
              <input
                className="text-black"
                placeholder="Token description"
                {...register("description", {
                  required: true,
                })}
              />

              <div className="flex justify-center items-center mt-4">
                <MbButton
                  style={{ backgroundColor: "#000000", color: "white" }}
                  type="submit"
                  label="Mint Your NFT"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {uploading && (
            <div className="flex flex-col justify-center items-center mt-4">
              <BounceLoader color="#0f766e" />
              <p className="text-lg font-bold text-teal-700">
                Uploading Assets to Arweave
              </p>
            </div>
          )}
          {minting && (
            <div className="flex flex-col justify-center items-center mt-4">
              <BounceLoader color="#0f766e" />
              <p className="text-lg font-bold text-teal-700">
                Minting your NFT
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// upload asset to arweave and get reference
async function handleUpload(file, data) {
  const metadata = {
    title: data.title,
    description: data.description,
    media: file,
  };

  const referenceJson = await uploadReference(metadata);
  console.log("Successfully uploaded with reference:", referenceJson.id);
  return referenceJson.id;
}

// mint NFT using CONTRACT_ADDRESS on testnet
async function handleMint(reference, activeAccountId, wallet) {
  if (reference) {
    const mintCall = mint({
      noMedia: true,
      metadata: {
        reference: reference,
      },
      ownerId: activeAccountId,
    });

    const output = await execute({ wallet }, mintCall);
    if (output.transaction_outcome.outcome.status.SuccessReceiptId) {
      alert("Successfully minted");
      return true;
    } else {
      alert("Error minting");
      return false;
    }
  }
}
