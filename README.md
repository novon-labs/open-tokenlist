# open-tokenlist

The idea behind creating this repository is to have all of the tokens from different blockchain at one place that can be used in different application to retrieve token information across different blockchain.

## Installation

```bash
npm install open-tokenlist
```

```bash
yarn add open-tokenlist
```

## Examples

### Query available tokens

```typescript
// "CHAINS" is an ENUM that allows to choose from multiple blockchains. eg ethereum, bsc, polygon & optimism
new TokenListProvider(CHAINS.ethereum).resolve().then((tokens) => {
  const tokenList = tokens.filterByTag("stablecoin").getList();
  console.log(tokenList);
});
```

### Render icon for token in React

```typescript jsx
import React, { useEffect, useState } from 'react';
import { TokenListProvider, TokenInfo } from 'open-tokenlist';
export const Icon = (props: { mint: string }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  useEffect(() => {
    new TokenListProvider(CHAINS.bsc).resolve().then(tokens => {
      const tokenList = tokens.filterByTag("stablecoin").getList();
      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);
  const token = tokenMap.get(props.mint);
  if (!token || !token.address) return null;
  return token.address;
```

## Adding new token

Submit PR with changes to JSON file `src/tokens/bsc.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/polygon.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/ethereum.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/optimism.tokenlist.json`

Please follow the Uniswap Token List specification found here: https://github.com/Uniswap/token-lists

