import { promisify } from 'util';
import path from 'path';
import { injectable } from 'inversify';
import { exec } from 'child_process';
import {
  IMusicRecognitionStrategy,
  MatchResult,
  MusicDetail,
} from '../music-recognition.interface';

const execAsync = promisify(exec);

@injectable()
export class ShazamMusicRecognitionService implements IMusicRecognitionStrategy {
  public async getDetail(file: Express.Multer.File): Promise<MusicDetail> {
    const filePath = path.normalize(file.path);

    const {
      stdout,
      stderr,
    } = await execAsync(`songrec audio-file-to-recognized-song ${filePath}`);

    if (stderr) console.error('Error:', stderr);

    try {
      const matchResult: MatchResult = JSON.parse(stdout);
      const { subtitle, title, url } = matchResult.track;

      return {
        subtitle,
        title,
        url,
      };
    } catch (e) {
      throw new Error('The song isn\'t recognized');
    }
  }
}
