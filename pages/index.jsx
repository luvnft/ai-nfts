import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import { useState } from "react";
import Predictions from "components/predictions";
import Error from "components/error";
import uploadFile from "lib/upload";
import naughtyWords from "naughty-words";
import Script from "next/script";
import pkg from "../package.json";
import sleep from "lib/sleep";
import Navbar from "components/navbar";
import Intro from "components/intro";
import { useWallet } from "@mintbase-js/react";
import { MbText } from "mintbase-ui";

export default function Home() {
  const { isConnected } = useWallet();
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [predictions, setPredictions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [scribbleExists, setScribbleExists] = useState(false);
  const [scribble, setScribble] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // track submissions so we can show a spinner while waiting for the next prediction to be created
    setSubmissionCount(submissionCount + 1);

    const prompt = e.target.prompt.value
      .split(/\s+/)
      .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
      .join(" ");

    setError(null);
    setIsProcessing(true);

    const fileUrl = await uploadFile(scribble);

    const body = {
      prompt,
      image: fileUrl,
      structure: "scribble",
    };
    // data for http request

    const response = await fetch(`${window.location.href}/api/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let prediction = await response.json();

    setPredictions((predictions) => ({
      ...predictions,
      [prediction.id]: prediction,
    }));

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      setPredictions((predictions) => ({
        ...predictions,
        [prediction.id]: prediction,
      }));
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
    }

    setIsProcessing(false);
  };

  if (isConnected)
    return (
      <>
        <Navbar />
        <main className="container max-w-[1024px] mx-auto p-5 mt-6">
          <div className="container max-w-[512px] mx-auto">
            {/* <hgroup>
              <h1 className="text-center text-5xl font-bold m-4">
                {pkg.appName}
              </h1>
              <p className="text-center text-xl opacity-60 m-4">
                {pkg.appSubtitle}
              </p>
            </hgroup> */}

            <Canvas
              onScribble={setScribble}
              scribbleExists={scribbleExists}
              setScribbleExists={setScribbleExists}
            />

            <PromptForm
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
              scribbleExists={scribbleExists}
            />

            <Error error={error} />
          </div>

          <Predictions
            predictions={predictions}
            isProcessing={isProcessing}
            submissionCount={submissionCount}
          />
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>{pkg.appName}</title>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <div className="mx-6 sm:mx-24 mt-56 mb-4 text-teal-700">
        <div className="w-full flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col justify-center items-center space-y-8">
          <img src="/ainft.png" alt="AI NFTs Image" className="h-64 w-64 object-contain" />
            <MbText className="h1-90 font-bold">AI NFT</MbText>
            <MbText className="p-big-90">
             A platform empowering creators to generate income by selling NFTs as part of their blockchain side hustle.<br />
             <a href="https://blog.luvnft.com"><strong>Create</strong></a> a blog dedicated to your AI NFT journey. Sell your AI NFT and associated blog as NFTs (on testnet).<br />
             Tag us in your social media posts @luvnft #AILUVNFT🤖
            </MbText>
          </div>
          <div>
            <Intro />
          </div>
        </div>
      </div>

      <Script src="https://js.bytescale.com/upload-js-full/v1" />
    </>
  );
}
