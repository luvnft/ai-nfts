import { useState } from "react";

export default function PromptForm({ onSubmit, scribbleExists }) {
  const [prompt, setPrompt] = useState();

  const disabled = !(scribbleExists && prompt?.length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex mt-4">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="block w-full flex-grow rounded-l-md text-cyan-950"
        />

        <button
          className={`bg-cyan-950 text-teal-100 rounded-r-md text-small inline-block px-5 py-3 flex-none ${
            disabled ? "opacity-20 cursor-not-allowed	" : ""
          }`}
          type="submit"
          disabled={disabled}
        >
          Generate Art
        </button>
      </div>
    </form>
  );
}
