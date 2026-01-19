export async function getBlockchainValue() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/blockchain/value`,
  { cache: 'no-store' }
);


  if (!res.ok) {
    throw new Error('Failed to fetch blockchain value');
  }

  return res.json();
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function setBlockchainValue(newValue: number) {
  const res = await fetch(`${BACKEND_URL}/blockchain/set-value`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: newValue }),
  });

  if (!res.ok) {
    throw new Error('Failed to set blockchain value');
  }

  return res.json(); // { txHash: '0x...' }
}
