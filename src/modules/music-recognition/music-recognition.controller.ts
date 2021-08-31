import { inject } from 'inversify';
import {
  Request,
} from 'express';
import {
  interfaces,
  controller,
  httpGet,
  queryParam,
  httpPost,
  request,
} from 'inversify-express-utils';
import {
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTOR_SERVICE,
} from '../../constants';
import {
  IRemoteVideoExtractorService,
} from '../remote-video-extractor/remote-video-extractor.interface';
import {
  IMusicRecognitionService,
  MusicDetail,
} from './music-recognition.interface';

@controller('/recognition')
export class MusicRecognitionController implements interfaces.Controller {
  constructor(
    @inject(REMOTE_VIDEO_EXTRACTOR_SERVICE)
    private readonly remoteVideoExtractorService: IRemoteVideoExtractorService,

    @inject(MUSIC_RECOGNITION_SERVICE)
    private readonly musicRecognitionService: IMusicRecognitionService,
  ) {}

  @httpPost('/')
  public upload(@request() req: Request): MusicDetail {
    return {
      name: 'Unknown',
    };
  }

  @httpGet('/')
  public recognizeMusic(@queryParam('url') url: string): MusicDetail {
    if (this.remoteVideoExtractorService.isLink(url)) {
      console.log(`It's a link: ${url}`);
    }
    return this.musicRecognitionService.getDetail(url);
  }
}
