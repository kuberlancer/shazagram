export interface IRemoteVideoExtractionService {
  isLink(url: string): boolean;
  extract(url: string): Promise<string>;
}

export interface IRemoteVideoExtractionStrategy {
  isAppropriateStrategy(url: string): boolean;
  extract(url: string): Promise<string>;
}
