# @novon/open-tokenlist

The idea behind creating this repository is to have all of the tokens from different blockchain at one place that can be used in different application to retrieve token information across different blockchain.

### Query available tokens

```typescript
// "CHAINS" is an ENUM that allows to choose from multiple blockchains. eg ethereum, bsc, polygon & optimism
new TokenListProvider(CHAINS.ethereum).resolve().then((tokens) => {
  const tokenList = tokens.filterByTag("stablecoin").getList();
  console.log(tokenList);
});
```

## Adding new token

Submit PR with changes to JSON file `src/tokens/bsc.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/polygon.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/ethereum.tokenlist.json`
Submit PR with changes to JSON file `src/tokens/optimism.tokenlist.json`

Please follow the Uniswap Token List specification found here: https://github.com/Uniswap/token-lists

