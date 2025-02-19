# Setup

- `bun i`
- `bunx vite`

## Working flow:

- `bb write_vk_ultra_keccak_honk -b static/circuit.json -o static/vk_circuit.bin`
- `bb prove_ultra_keccak_honk -b static/circuit.json -w static/witness.gz -o static/proof.bin`
- `garaga calldata --system ultra_keccak_honk --vk static/vk_circuit.bin --proof static/proof.bin --format array`

## Bug

- `bun i`
- `bunx vite`
- press `generate proof` button
