export interface IFileDownloaderService {
  download(url: string): Promise<string | Buffer>;
}
