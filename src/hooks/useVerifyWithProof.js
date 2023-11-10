import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { useState } from "react";

export const useVerifyWithProof = (circuit) => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit, backend);

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const verify = async (proof) => {
    console.log("verify start", proof);
    setIsLoading(true);
    setError(null);
    setIsVerified(false);

    try {
      const verified = await noir.verifyFinalProof(proof);
      setIsVerified(verified);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }

    console.log("verify end", isVerified);
  };

  return { verify, isVerified, isLoading, error };
};
