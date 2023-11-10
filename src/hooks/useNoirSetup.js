import { useState } from "react";
import { generateProof } from "../utils/generateProof.js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export const useNoirSetup = (circuit) => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit, backend);

  const [proof, setProof] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isGenerationLoading, setIsGenerationLoading] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const [isVerified, setIsVerified] = useState(false);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  const generate = async (inputs) => {
    setIsGenerationLoading(true);
    setGenerationError(null);

    try {
      const proof = await noir.generateFinalProof(inputs);

      setProof(proof);
      setSuccess(true);
    } catch (err) {
      setGenerationError(err);
      setProof(null);
    } finally {
      setIsGenerationLoading(false);
    }
  };

  const verify = async (proof) => {
    console.log("verify start", proof);
    setIsVerificationLoading(true);
    setVerificationError(null);
    setIsVerified(false);

    try {
      const verified = await noir.verifyFinalProof(proof);
      setIsVerified(verified);
      setIsVerificationLoading(false);
    } catch (err) {
      setVerificationError(err);
      setIsVerified(false);
    } finally {
      setIsVerificationLoading(false);
    }
    console.log("verify end", isVerified);
  };

  return {
    proof,
    isGenerationLoading,
    success,
    generationError,
    verificationError,
    isVerified,
    isVerificationLoading,
    generate,
    verify,
  };
};
