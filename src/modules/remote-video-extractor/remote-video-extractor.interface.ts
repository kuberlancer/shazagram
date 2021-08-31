export interface IRemoteVideoExtractorService {
  isLink(url: string): boolean;
}

export interface IRemoteVideoExtractorStrategy {
  isAppropriateStrategy(url: string): boolean;
}
