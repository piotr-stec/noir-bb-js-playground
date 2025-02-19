import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';

import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import * as garaga from "garaga";
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);


let _recipient = '0x13d9ee239f33fea4f8785b9e3870ade909e20a9599ae7cd62c1c292b73af1b7';
let _refund_commitment_hash =
    '0x2c5b4a87194666d24c76e0de88a21cd5e8556c05624bd4dd908415c4da7ba518';
let amount = '2';
let commitment_amount = '2';
let hashpath = [
    '0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864',
    '0x1069673dcdb12263df301a6ff584a7ec261a44cb9dc68df067a4774460b1f1e1',
    '0x18f43331537ee2af2e3d758d50f72106467c6eea50371dd528d57eb2b856d238',
    '0x7f9d837cb17b0d36320ffe93ba52345f1b728571a568265caac97559dbc952a',
    '0x2b94cf5e8746b3f5c9631f4c5df32907a699c58c94b2ad4d7b5cec1639183f55',
    '0x2dee93c5a666459646ea7d22cca9e1bcfed71e6951b953611d11dda32ea09d78',
    '0x78295e5a22b84e982cf601eb639597b8b0515a88cb5ac7fa8a4aabe3c87349d',
    '0x2fa5e5f18f6027a6501bec864564472a616b2e274a41211a444cbe3a99f3cc61',
    '0xe884376d0d8fd21ecb780389e941f66e45e7acce3e228ab3e2156a614fcd747',
    '0x1b7201da72494f1e28717ad1a52eb469f95892f957713533de6175e5da190af2',
    '0x1f8d8822725e36385200c0b201249819a6e6e1e4650808b5bebc6bface7d7636',
    '0x2c5d82f66c914bafb9701589ba8cfcfb6162b0a12acf88a8d0879a0471b5f85a',
    '0x14c54148a0940bb820957f5adf3fa1134ef5c4aaa113f4646458f270e0bfbfd0',
    '0x190d33b12f986f961e10c0ee44d8b9af11be25588cad89d416118e4bf4ebe80c',
    '0x22f98aa9ce704152ac17354914ad73ed1167ae6596af510aa5b3649325e06c92',
    '0x2a7c7c9b6ce5880b9f6f228d72bf6a575a526f29c66ecceef8b753d38bba7323',
    '0x2e8186e558698ec1c67af9c14d463ffc470043c9c2988b954d75dd643f36b992',
    '0xf57c5571e9a4eab49e2c8cf050dae948aef6ead647392273546249d1c1ff10f',
    '0x1830ee67b5fb554ad5f63d4388800e1cfe78e310697d46e43c9ce36134f72cca',
    '0x2134e76ac5d21aab186c2be1dd8f84ee880a1e46eaf712f9d371b6df22191f3e',
    '0x19df90ec844ebc4ffeebd866f33859b0c051d8c958ee3aa88f8f8df3db91a5b1',
    '0x18cca2a66b5c0787981e69aefd84852d74af0e93ef4912b4648c05f722efe52b',
    '0x2388909415230d1b4d1304d2d54f473a628338f2efad83fadf05644549d2538d',
    '0x27171fb4a97b6cc0e9e8f543b5294de866a2af2c9c8d0b1d96e673e4529ed540',
    '0x2ff6650540f629fd5711a0bc74fc0d28dcb230b9392583e5f8d59696dde6ae21',
    '0x120c58f143d491e95902f7f5277778a2e0ad5168f6add75669932630ce611518',
    '0x1f21feb70d3f21b07bf853d5e5db03071ec495a0a565a21da2d665d279483795',
    '0x24be905fa71335e14c638cc0f66a8623a826e768068a9e968bb1a1dde18a72d2',
    '0xf8666b62ed17491c50ceadead57d4cd597ef3821d65c328744c74e553dac26d',
    '0x918d46bf52d98b034413f4a1a1c41594e7a7a3f6ae08cb43d1a2a230e1959ef',
    '0x1bbeb01b4c479ecde76917645e404dfa2e26f90d0afc5a65128513ad375c5ff2'
];
let index = '0x0';
let nullifier = '0x22eb1323a8dd19eeecb15cb63a21541b6b480958b1ee414d6926537a1376d76d';
let refund = '0x0';
let root = '0x25dafe779915fb9fe58a3d2a9c906172b03fc25a75989633f2dd7cf673d05ba6';
let secret = '0x34bfb9fc9acc2bb15cb7ce161b16aa44f3ec2a20b6bdf4682b03ebd04411c8f';
let secret_nullifier_hash = '0x16319cd8d66b4d4f6930af0f5d5473fb4e80eaa544eafbfe751ea0b04c2e91b0';
let token_address = '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

const dataToGenerateWitness = {
    root,
    secret,
    nullifier,
    commitment_amount,
    refund,
    secret_nullifier_hash,
    _recipient,
    _refund_commitment_hash,
    amount,
    token_address,
    hashpath,
    index
};
const show = (id, content) => {
    const container = document.getElementById(id);
    container.appendChild(document.createTextNode(content));
    container.appendChild(document.createElement("br"));
};

document.getElementById("submit").addEventListener("click", async () => {
    try {
        let UltraHonkBackendOptions = { keccak: true };
        const response = await fetch("static/circuit.json");
        const json_circuit = await response.json();
        const bytecode = json_circuit.bytecode;

        await garaga.init();
        const noir = new Noir(json_circuit);
        const backend = new UltraHonkBackend(bytecode);

        show("logs", "Generating witness... ⏳");
        const { witness } = await noir.execute(dataToGenerateWitness);
        show("logs", "Generated witness... ✅");
        show("logs", "Generating proof... ⏳");
        const proof = await backend.generateProof(witness, UltraHonkBackendOptions);
        show("logs", "Generated proof... ✅");
        show("results", proof.proof);
        show('logs', 'Verifying proof... ⌛');
        const isValid = await backend.verifyProof(proof, UltraHonkBackendOptions);
        show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);

        let vkAgeBytes = await fetch('static/vk_circuit.bin').then((res) => res.bytes());

        const parsedVerKey = garaga.parseHonkVerifyingKeyFromBytes(vkAgeBytes);
        show('logs', `bb.js proof len ${proof.proof.length}`);

        console.log("bb.js proof", proof.proof);

        let proofBin = await fetch('static/proof.bin').then((res) => res.bytes());

        show('logs', `local proof len ${proofBin.length}`);
        console.log("local proof", proofBin);

        show("results", proofBin);

        show('logs', 'Parsing local proof... ⌛');
        const parsedProofLocal = garaga.parseHonkProofFromBytes(proofBin);
        show('logs', 'Local proof parsed ✅');
        console.log("local proof parsed", parsedProofLocal);

        show('logs', 'Parsing bb.js proof... ⌛');
        const parsedProof = garaga.parseHonkProofFromBytes(proof.proof);
        show('logs', 'bb.js proof parsed ✅');

        console.log("bb.js proof parsed", parsedProof);
        const calldata = garaga.getHonkCallData(parsedProof, parsedVerKey, 0);
        console.log("calldata: ", calldata);
    } catch (err) {
        show('logs', `Error: ${err} ⚠️`);
        console.log(err);
    }
});
