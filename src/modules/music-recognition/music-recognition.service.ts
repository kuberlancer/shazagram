import { unlink } from 'fs';
import { promisify } from 'util';
import { Express } from 'express';
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

  async getDetail(file: Express.Multer.File): Promise<MusicDetail> {
    const detail = await this.shazamMusicRecognitionService.getDetail(file);
    await unlinkAsync(file.path);
    return detail;
  }
}
