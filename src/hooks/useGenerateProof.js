import { useState } from "react";
import { generateProof } from "../utils/generateProof.js";

export const useGenerateProof = (circuit) => {
  const [proof, setProof] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async (inputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const proof = await generateProof(circuit, inputs);

      setProof(proof);
      setSuccess(true);
    } catch (err) {
      setError(err);
      setProof(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    proof,
    isLoading,
    success,
    error,
    generate,
  };
};
