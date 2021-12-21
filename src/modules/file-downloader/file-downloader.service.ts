import { createWriteStream } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { injectable } from 'inversify';
import { IFileDownloaderService } from './file-downloader.interface';
import { UPLOAD_FOLDER } from '../../constants';
import { DownloadFileError } from './errors';

@injectable()
export class FileDownloaderService implements IFileDownloaderService {
  public async download(url: string): Promise<string | Buffer> {
    const response = await axios(url, {
      responseType: 'stream',
    });

    return new Promise<string | Buffer>((resolve, reject) => {
      const stream = createWriteStream(
        join(UPLOAD_FOLDER, Date.now().toString()),
      );

      const filePath = stream.path;

      response.data.pipe(stream)
        .on('finish', () => {
          resolve(filePath);
        })
        .on('error', (error: Error) => {
          reject(new DownloadFileError());
        });
    });
  }
}
