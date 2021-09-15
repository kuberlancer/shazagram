import { inject } from 'inversify';
import {
  Request,
} from 'express';
import {
  interfaces,
  controller,
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
  public async upload(@request() req: Request): Promise<MusicDetail> {
    if (!req.file) {
      throw new Error('file is not passed');
    }
    return this.musicRecognitionService.getDetail(req.file);
  }
}
