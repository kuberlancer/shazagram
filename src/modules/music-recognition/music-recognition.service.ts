import { Express } from 'express';
import { inject, injectable } from 'inversify';
import {
  AUDD_MUSIC_RECOGNITION_SERVICE,
} from '../../constants';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
  MusicDetail,
} from './music-recognition.interface';

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  constructor(
    @inject(AUDD_MUSIC_RECOGNITION_SERVICE)
    private readonly auddMusicRecognitionService: IMusicRecognitionStrategy,
  ) {}

  getDetail(file: Express.Multer.File): MusicDetail {
    const detail = this.auddMusicRecognitionService.getDetail(file);
    return {
      name: 'Unknown music',
    };
  }
}
