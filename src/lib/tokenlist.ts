import ethTokenlist from "./../tokens/ethereum.tokenlist.json";
import polygonTokenlist from "./../tokens/polygon.tokenlist.json";
import bscTokenlist from "./../tokens/bsc.tokenlist.json";
import optimismTokenlist from "./../tokens/optimism.tokenlist.json";

export interface TokenList {
  readonly name: string;
  readonly logoURI: string;
  readonly tags: { [tag: string]: TagDetails };
  readonly timestamp: string;
  readonly tokens: TokenInfo[];
}

export interface TagDetails {
  readonly name: string;
  readonly description: string;
}

export interface TokenExtensions {
  readonly website?: string;
  readonly bridgeContract?: string;
  readonly assetContract?: string;
  readonly address?: string;
  readonly explorer?: string;
  readonly twitter?: string;
  readonly github?: string;
  readonly medium?: string;
  readonly tgann?: string;
  readonly tggroup?: string;
  readonly discord?: string;
  readonly serumV3Usdt?: string;
  readonly serumV3Usdc?: string;
  readonly coingeckoId?: string;
  readonly imageUrl?: string;
  readonly description?: string;
}

export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly symbol: string;
  readonly name: string;
  readonly decimals: number;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: TokenExtensions;
}

export type TokenInfoMap = Map<string, TokenInfo>;

export enum Chains {
  ethereum = "ethereum",
  bsc = "bsc",
  polygon = "polygon",
  optimism = "optimism",
}

export class StaticTokenListResolutionStrategy {
  constructor(private chain: Chains) {}
  resolve = () => {
    return this.getList() as TokenInfo[];
  };

  getList = () => {
    if (this.chain == Chains.ethereum) {
      return ethTokenlist.tokens;
    }
    if (this.chain == Chains.optimism) {
      return optimismTokenlist.tokens;
    }
    if (this.chain == Chains.polygon) {
      return polygonTokenlist.tokens;
    }
    if (this.chain == Chains.bsc) {
      return bscTokenlist.tokens;
    }
  };
}

export class TokenListProvider {
  constructor(private chain: Chains) {}

  resolve = async () => {
    return new TokenListContainer(
      await new StaticTokenListResolutionStrategy(this.chain).resolve()
    );
  };
}

export class TokenListContainer {
  constructor(private tokenList: TokenInfo[]) {}

  filterByTag = (tag: string) => {
    return new TokenListContainer(
      this.tokenList.filter((item) => (item.tags || []).includes(tag))
    );
  };

  filterBySymbol = (symbol: string) => {
    return new TokenListContainer(
      this.tokenList.filter((item) => (item.symbol  === symbol))
    );
  };

  excludeByTag = (tag: string) => {
    return new TokenListContainer(
      this.tokenList.filter((item) => !(item.tags || []).includes(tag))
    );
  };

  getList = () => {
    return this.tokenList;
  };
}
