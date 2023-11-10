import { useEffect, useState } from "react";
import CircuitCard from "./CircuitCard/CircuitCard.jsx";
import Benchmark from "./Benchmark/Benchmark.jsx";

import circuit from "../../../../circuit/target/circuit.json";
import { useTimer } from "../../../hooks/useTimer.js";
import { useNoirSetup } from "../../../hooks/useNoirSetup.js";

const Generate = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [proof, setProof] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();

  const {
    verify: verifyCircuit1,
    generate: generateCircuit1,
    isGenerationLoading: isGenerationLoadingCircuit1,
    isVerified: isVerifiedCircuit1,
    isVerificationLoading: isVerificationLoadingCircuit1,
    proof: proofCircuit1,
    success: successCircuit1,
    generationError: generationErrorCircuit1,
    verificationError: verificationErrorCircuit1,
  } = useNoirSetup(circuit);

  const {
    verify: verifyCircuit2,
    generate: generateCircuit2,
    isGenerationLoading: isGenerationLoadingCircuit2,
    isVerified: isVerifiedCircuit2,
    isVerificationLoading: isVerificationLoadingCircuit2,
    proof: proofCircuit2,
    success: successCircuit2,
    generationError: generationErrorCircuit2,
    verificationError: verificationErrorCircuit2,
  } = useNoirSetup(circuit);

  const isAnyCircuitLoading =
    isGenerationLoadingCircuit1 ||
    isGenerationLoadingCircuit2 ||
    isVerificationLoadingCircuit1 ||
    isVerificationLoadingCircuit2;

  const withResetGenerate = async (cb, cbArgs) => {
    setSuccess(false);
    setProof(null);
    setError(null);
    resetTimer();
    await cb(cbArgs);
  };

  const withResetVerify = async (cb, cbArgs) => {
    setIsVerified(false);
    resetTimer();
    await cb(cbArgs);
  };

  useEffect(() => {
    if (isAnyCircuitLoading) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isAnyCircuitLoading]);

  useEffect(() => {
    setProof(proofCircuit1);
  }, [proofCircuit1]);

  useEffect(() => {
    setProof(proofCircuit2);
  }, [proofCircuit2, setProof]);

  useEffect(() => {
    setSuccess(successCircuit1);
  }, [successCircuit1, setSuccess]);

  useEffect(() => {
    setSuccess(successCircuit2);
  }, [successCircuit2, setSuccess]);

  useEffect(() => {
    setError(generationErrorCircuit1 || verificationErrorCircuit1);
  }, [generationErrorCircuit1, verificationErrorCircuit1, setError]);

  useEffect(() => {
    setError(generationErrorCircuit2 || verificationErrorCircuit2);
  }, [generationErrorCircuit2, verificationErrorCircuit2, setError]);

  useEffect(() => {
    setIsVerified(isVerifiedCircuit1);
  }, [isVerifiedCircuit1, setIsVerified]);

  return (
    <section>
      <div
        style={{
          display: "flex",
        }}
      >
        <CircuitCard
          title={"Deposit circuit"}
          onGenerateClick={() =>
            withResetGenerate(generateCircuit1, { x: 1, y: 2 })
          }
          onVerifyClick={() => withResetVerify(verifyCircuit1, proofCircuit1)}
          isVerifyLocked={!proofCircuit1}
          isLocked={isAnyCircuitLoading}
        />

        <CircuitCard
          title={"Withdrawal circuit"}
          onGenerateClick={() =>
            withResetGenerate(generateCircuit2, { x: 1, y: 2 })
          }
          onVerifyClick={() => console.log("shmersik")}
          isVerifyLocked={!proofCircuit2}
          isLocked={isAnyCircuitLoading}
        />
      </div>

      <Benchmark
        status={success.toString()}
        data={proof}
        elapsedTime={elapsedTime}
        error={error}
        verificationStatus={isVerified.toString()}
      />
    </section>
  );
};

export default Generate;
