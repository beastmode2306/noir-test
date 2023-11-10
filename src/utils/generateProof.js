import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export const generateProof = async (circuit, inputs) => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit, backend);

  await new Promise((resolve, _) => {
    setTimeout(resolve, 3000);
  });

  return noir.generateFinalProof(inputs);
};
