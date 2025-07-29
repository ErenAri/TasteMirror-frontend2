// src/components/AnalyzeForm.tsx
import { useState } from "react";

interface AnalyzeFormProps {
  onSubmit: (data: { movie: string; music: string; brand: string }) => void;
}

export default function AnalyzeForm({ onSubmit }: AnalyzeFormProps) {
  const [movie, setMovie] = useState("");
  const [music, setMusic] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ movie, music, brand });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-md w-full shadow-2xl border border-white/20 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Know Yourself</h2>
        <p className="text-center mb-6 text-sm text-gray-300">
          Discover your cultural personality powered by AI
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Favorite Movie</label>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="e.g. Interstellar"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Favorite Music Artist</label>
          <input
            type="text"
            value={music}
            onChange={(e) => setMusic(e.target.value)}
            placeholder="e.g. Radiohead"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Preferred Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. Apple"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Analyze Me
        </button>
      </form>
    </div>
  );
}