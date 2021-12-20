import { injectable } from 'inversify';
import { exec } from 'child_process';
import {
  IMusicRecognitionStrategy,
  MatchResult,
  MusicDetail,
} from '../music-recognition.interface';

@injectable()
export class ShazamMusicRecognitionService implements IMusicRecognitionStrategy {
  public async getDetail(filePath: string): Promise<MusicDetail> {
    return new Promise<MusicDetail>((resolve, reject) => {
      exec(`songrec audio-file-to-recognized-song ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.log('Error:', error);
          reject(error);
        }
        if (stderr) {
          console.log('Stderr:', stderr);
          reject(stderr);
        }
        try {
          const matchResult: MatchResult = JSON.parse(stdout);
          const { subtitle, title, url } = matchResult.track;
          resolve({ subtitle, title, url });
        } catch (e) {
          reject(new Error('The song isn\'t recognized'));
        }
      });
    });
  }
}
