import { inject } from 'inversify';
import {
  interfaces,
  controller,
  httpGet,
  queryParam,
} from 'inversify-express-utils';
import { MUSIC_RECOGNITION_SERVICE } from '../../constants';
import { IMusicRecognitionService, MusicDetail } from './music-recognition.interface';

@controller('/recognition')
export class MusicRecognitionController implements interfaces.Controller {
  constructor(
    @inject(MUSIC_RECOGNITION_SERVICE)
    private readonly musicRecognitionService: IMusicRecognitionService,
  ) {}

  @httpGet('/')
  public recognizeMusic(@queryParam('url') url: string): MusicDetail {
    return this.musicRecognitionService.getDetail(url);
  }
}
