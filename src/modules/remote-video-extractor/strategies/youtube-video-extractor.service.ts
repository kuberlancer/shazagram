import { promisify } from 'util';
import { exec } from 'child_process';
import path from 'path';
import { injectable } from 'inversify';
import ytdl from 'ytdl-core';
import { UPLOAD_FOLDER } from '../../../constants';
import { IRemoteVideoExtractorStrategy } from '../remote-video-extractor.interface';

const execAsync = promisify(exec);

@injectable()
export class YoutubeVideoExtractorService implements IRemoteVideoExtractorStrategy {
  public isAppropriateStrategy(url: string): boolean {
    return /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
      .test(url);
  }

  public async extract(url: string): Promise<string> {
    const info = await ytdl.getInfo(url);

    const dest = path.join(UPLOAD_FOLDER, `${Date.now().toString()}.mp3`);

    const format = ytdl.chooseFormat(info.formats, { quality: '18' });

    const {
      url: fileUrl,
      bitrate,
    } = format;

    const startTime = url.split('?t=')[1];
    const duration = '6';

    const {
      stdout,
      stderr,
    } = await execAsync(`ffmpeg -ss ${startTime || 0} -t ${duration} -i "${fileUrl}" "${dest}"`);

    if (stderr) console.error('Error:', stderr);

    return dest;
  }
}
