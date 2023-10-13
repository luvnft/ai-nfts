import copy from "copy-to-clipboard";
import { Copy as CopyIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "components/loader";
import { FormProvider, useForm } from "react-hook-form";
import { MbButton, MbText } from "mintbase-ui";
import { useWallet } from "@mintbase-js/react";
import { mint, execute } from "@mintbase-js/sdk";
import { uploadReference } from "@mintbase-js/storage";

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
      <h2 className="text-center text-3xl font-bold m-6">Results</h2>

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

  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = () => {
    const url =
      window.location.origin +
      "/scribbles/" +
      (prediction.uuid || prediction.id); // if the prediction is from the Replicate API it'll have `id`. If it's from the SQL database, it'll have `uuid`
    copy(url);
    setLinkCopied(true);
  };

  // Clear the "Copied!" message after 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinkCopied(false);
    }, 4 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  //mint form related

  const onSubmit = async (data) => {
    console.log("Data", data);
    const wallet = await selector.wallet();
    const imageSrc = prediction.output[prediction.output.length - 1];
    // convert to blob
    const blob = await fetch(imageSrc).then((r) => r.blob());
    const file = new File([blob], "output_image.png", { type: "image/png" });

    if (file == null || activeAccountId == null) {
      console.error("Error uploading file");
      return;
    } else {
      console.log("File", file);
      const reference = await handleUpload(file, data);
      const txStatus = await handleMint(reference, activeAccountId, wallet);
    }
    // const reference = await handleUpload(file, data);
    // await handleMint(reference, activeAccountId, wallet);
  };

  if (!prediction) return null;

  return (
    <div className="mt-6 mb-12">
      <div className="shadow-lg border my-5 p-5 bg-white flex justify-center">
        {/* <div className="w-1/2 aspect-square relative border">
          <img
            src={prediction.input.image}
            alt="input scribble"
            className="w-full aspect-square"
          />
        </div> */}
        <div className="w-1/2 aspect-square relative">
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
      </div>
      <div className="text-center px-4 opacity-60 text-xl">
        &ldquo;{prediction.input.prompt}&rdquo;
      </div>
      <div className="text-center py-2">
        {/* <button className="lil-button" onClick={copyLink}>
          <CopyIcon className="icon" />
          {linkCopied ? "Copied!" : "Copy link"}
        </button> */}

        {showLinkToNewScribble && (
          <Link href="/">
            <button className="lil-button" onClick={copyLink}>
              <PlusCircleIcon className="icon" />
              Create a new scribble
            </button>
          </Link>
        )}
      </div>
      {prediction.output?.length ? (
        <div className="flex flex-col items-center justify-center mt-2">
          <MbText className="text-3xl">Mint your NFT Now</MbText>
          <div className="w-full mt-4 space-y-4">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit, (errorMsgs) =>
                console.error(errorMsgs)
              )}
            >
              <label>Name</label>
              <input
                className="text-black"
                placeholder="Name"
                required
                {...register("title", {
                  required: true,
                  minLength: { value: 1, message: "" },
                })}
              />

              <label>Description</label>
              <input
                className="text-black"
                placeholder="Token description"
                {...register("description", {
                  required: true,
                })}
              />

              <div className="flex justify-center items-center mt-4">
                <MbButton type="submit" label="Mint Your NFT" />
              </div>
            </form>
          </div>
        </div>
      ) : null}
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
    // console.log(
    //   "Successfully minted:",
    //   output.transaction_outcome.outcome.status.SuccessReceiptId
    // );
    if (output.transaction_outcome.outcome.status.SuccessReceiptId) {
      alert("Successfully minted");
      return true;
    } else {
      alert("Error minting");
      return false;
    }
  }
}
