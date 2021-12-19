export interface IRemoteVideoExtractorService {
  isLink(url: string): boolean;
  extract(url: string): Promise<string>;
}

export interface IRemoteVideoExtractorStrategy {
  isAppropriateStrategy(url: string): boolean;
  extract(url: string): Promise<string>;
}
