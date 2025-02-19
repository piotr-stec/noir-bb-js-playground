# Setup

- `pip install garaga`
- `bbup --version 0.67.0`
- `bun i`
- `bunx vite`

## Working flow:

- `bb write_vk_ultra_keccak_honk -b static/circuit.json -o static/vk_circuit.bin`
- `bb prove_ultra_keccak_honk -b static/circuit.json -w static/witness.gz -o static/proof.bin`
- `garaga calldata --system ultra_keccak_honk --vk static/vk_circuit.bin --proof static/proof.bin --format array`

## Reproduce bug

1. `bun i`
2. `bunx vite`
3. press `generate proof` button.

### Issue Description
- There is a discrepancy between the proof length generated locally and the proof from `bb.js` for the same circuit.
- The difference is captured in the file `diff_in_proof.png`.
