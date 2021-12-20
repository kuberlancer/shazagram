import { spawn } from 'child_process';
import path from 'path';
import { injectable } from 'inversify';
import ytdl from 'ytdl-core';
import {
  UPLOAD_FOLDER,
  FRAGMENT_DURATION,
} from '../../../constants';
import { IRemoteVideoExtractorStrategy } from '../remote-video-extractor.interface';

@injectable()
export class YoutubeVideoExtractorService implements IRemoteVideoExtractorStrategy {
  public isAppropriateStrategy(url: string): boolean {
    return /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
      .test(url);
  }

  public async extract(url: string): Promise<string> {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: '18' });
    const dest = path.join(UPLOAD_FOLDER, `${Date.now().toString()}.${format.container}`);

    const startTime = url.split('?t=')[1] || '0';

    return new Promise<string>((resolve, reject) => {
      const process = spawn('ffmpeg', [
        '-i', format.url,
        '-ss', startTime,
        '-t', FRAGMENT_DURATION,
        '-c', 'copy',
        dest,
      ]);

      process.stdout.on('data', (data) => {
        console.log(data);
      });

      process.stderr.setEncoding('utf8');
      process.stderr.on('data', (data) => {
        console.log(data);
      });

      process.on('close', () => {
        resolve(dest);
      });

      process.on('error', (err) => {
        reject(err);
      });
    });
  }
}
