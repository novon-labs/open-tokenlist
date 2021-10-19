import { readFileSync } from 'fs';

import test from 'ava';

import { CHAINS, TokenInfo, TokenListProvider } from './tokenlist';

test('Check if correct tokenlist is fetched [ETHEREUM]', async (t) => {
  const list = (
    await new TokenListProvider(CHAINS.ethereum).resolve()
  ).getList();

  t.true(list.some((item) => item.chainId === 1));
});

test('Check if correct tokenlist is fetched [POLYGON]', async (t) => {
  const list = (
    await new TokenListProvider(CHAINS.polygon).resolve()
  ).getList();

  t.true(list.some((item) => item.chainId === 137));
});

test('Check if correct tokenlist is fetched [BSC]', async (t) => {
  const list = (await new TokenListProvider(CHAINS.bsc).resolve()).getList();

  t.true(list.some((item) => item.chainId === 56));
});

test('Check if correct tokenlist is fetched [Optimism]', async (t) => {
  const list = (
    await new TokenListProvider(CHAINS.optimism).resolve()
  ).getList();

  t.true(list.some((item) => item.chainId === 10));
});

test('Token list is filterable by a tag', async (t) => {
  const list = (await new TokenListProvider(CHAINS.ethereum).resolve())
    .filterByTag('stablecoin')
    .getList();

  t.true(list.some((item) => item.symbol === 'USDT'));
});

test('Token list can exclude by a tag', async (t) => {
  const list = (await new TokenListProvider(CHAINS.polygon).resolve())
    .excludeByTag('stablecoin')
    .getList();

  t.false(list.some((item) => item.tags === ['nft']));
});

test('Token list returns new object upon filter', async (t) => {
  const list = await new TokenListProvider(CHAINS.ethereum).resolve();
  const filtered = list.filterByTag('stablecoin');
  t.true(list !== filtered);
  t.true(list.getList().length !== filtered.getList().length);
});


test('Token list is a valid json', async (t) => {
  t.notThrows(() => {
    const content = readFileSync('./src/tokens/bsc.tokenlist.json').toString();
    JSON.parse(content.toString());
  });
  t.notThrows(() => {
    const content = readFileSync(
      './src/tokens/optimism.tokenlist.json'
    ).toString();
    JSON.parse(content.toString());
  });
  t.notThrows(() => {
    const content = readFileSync(
      './src/tokens/ethereum.tokenlist.json'
    ).toString();
    JSON.parse(content.toString());
  });
  t.notThrows(() => {
    const content = readFileSync(
      './src/tokens/polygon.tokenlist.json'
    ).toString();
    JSON.parse(content.toString());
  });
});

test('[ETHEREUM] Token list does not have duplicate entries', async (t) => {
  const list = await new TokenListProvider(CHAINS.ethereum).resolve();
  list.getList().reduce((agg, item) => {
    if (agg.has(item.address)) {
      console.log(item.address);
    }

    t.false(agg.has(item.address));
    agg.set(item.address, item);
    return agg;
  }, new Map<string, TokenInfo>());
});

test('[BSC] Token list does not have duplicate entries', async (t) => {
  const list = await new TokenListProvider(CHAINS.bsc).resolve();
  list.getList().reduce((agg, item) => {
    if (agg.has(item.address)) {
      console.log(item.address);
    }

    t.false(agg.has(item.address));
    agg.set(item.address, item);
    return agg;
  }, new Map<string, TokenInfo>());
});

test('[POLYGON] Token list does not have duplicate entries', async (t) => {
  const list = await new TokenListProvider(CHAINS.polygon).resolve();
  list.getList().reduce((agg, item) => {
    if (agg.has(item.address)) {
      console.log(item.address);
    }

    t.false(agg.has(item.address));
    agg.set(item.address, item);
    return agg;
  }, new Map<string, TokenInfo>());
});

test('[OPTIMISM] Token list does not have duplicate entries', async (t) => {
  const list = await new TokenListProvider(CHAINS.optimism).resolve();
  list.getList().reduce((agg, item) => {
    if (agg.has(item.address)) {
      console.log(item.address);
    }

    t.false(agg.has(item.address));
    agg.set(item.address, item);
    return agg;
  }, new Map<string, TokenInfo>());
});
