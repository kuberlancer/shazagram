import { unlink } from 'fs';
import { promisify } from 'util';
import { inject, injectable } from 'inversify';
import {
  SHAZAM_MUSIC_RECOGNITION_SERVICE,
} from '../../constants';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
  MusicDetail,
} from './music-recognition.interface';

const unlinkAsync = promisify(unlink);

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  constructor(
    @inject(SHAZAM_MUSIC_RECOGNITION_SERVICE)
    private readonly shazamMusicRecognitionService: IMusicRecognitionStrategy,
  ) {}

  async getDetail(filePath: string): Promise<MusicDetail> {
    const detail = await this.shazamMusicRecognitionService.getDetail(filePath);
    await unlinkAsync(filePath);
    return detail;
  }
}
