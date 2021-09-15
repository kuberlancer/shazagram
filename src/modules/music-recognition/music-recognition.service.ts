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

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  constructor(
    @inject(SHAZAM_MUSIC_RECOGNITION_SERVICE)
    private readonly shazamMusicRecognitionService: IMusicRecognitionStrategy,
  ) {}

  async getDetail(file: Express.Multer.File): Promise<MusicDetail> {
    return this.shazamMusicRecognitionService.getDetail(file);
  }
}
