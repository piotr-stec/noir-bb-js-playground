import { compile, createFileManager } from "@noir-lang/noir_wasm"

import main from "./circuit/src/main.nr?url";
import nargoToml from "./circuit/Nargo.toml?url";
import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';

import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import * as garaga from "garaga";
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);


export async function getCircuit() {
    const fm = createFileManager("/");
    const { body } = await fetch(main);
    const { body: nargoTomlBody } = await fetch(nargoToml);

    fm.writeFile("./src/main.nr", body);
    fm.writeFile("./Nargo.toml", nargoTomlBody);
    return await compile(fm);
}

const show = (id, content) => {
    const container = document.getElementById(id);
    container.appendChild(document.createTextNode(content));
    container.appendChild(document.createElement("br"));
};

document.getElementById("submit").addEventListener("click", async () => {
    try {
        let UltraHonkBackendOptions = { keccak: true };

        let garg = await garaga.init();
        const { program } = await getCircuit();
        const noir = new Noir(program);
        const backend = new UltraHonkBackend(program.bytecode);
        const age = document.getElementById("age").value;
        show("logs", "Generating witness... ⏳");
        const { witness } = await noir.execute({ age });
        show("logs", "Generated witness... ✅");
        show("logs", "Generating proof... ⏳");
        const proof = await backend.generateProof(witness, UltraHonkBackendOptions);
        show("logs", "Generated proof... ✅");
        show("results", proof.proof);
        show('logs', 'Verifying proof... ⌛');
        const isValid = await backend.verifyProof(proof, UltraHonkBackendOptions);
        show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);

        const ver_key = await backend.getVerificationKey(UltraHonkBackendOptions);

        const parsedVerKey = garaga.parseHonkVerifyingKeyFromBytes(ver_key);
        const parsedProof = garaga.parseHonkProofFromBytes(proof.proof);
        const calldata = garaga.getHonkCallData(parsedProof, parsedVerKey, 0);
        console.log("calldata: ", calldata);

    } catch (err) {
        console.log(err);
    }
});
