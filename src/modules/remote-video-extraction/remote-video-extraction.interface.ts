export interface IRemoteVideoExtractionService {
  validateURL(url: string): void;
  extract(url: string): Promise<string>;
}

export interface IRemoteVideoExtractionStrategy {
  isAppropriateStrategy(url: string): boolean;
  extract(url: string): Promise<string>;
}
