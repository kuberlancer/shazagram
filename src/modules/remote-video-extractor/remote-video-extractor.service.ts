import { inject, injectable } from 'inversify';
import { YOUTUBE_VIDEO_EXTRACTOR_SERVICE } from 'src/constants';
import {
  IRemoteVideoExtractorService,
  IRemoteVideoExtractorStrategy,
} from './remote-video-extractor.interface';

@injectable()
export class RemoteVideoExtractorService implements IRemoteVideoExtractorService {
  constructor(
    @inject(YOUTUBE_VIDEO_EXTRACTOR_SERVICE)
    private readonly youtubeVideoExtractorService: IRemoteVideoExtractorStrategy,
  ) {}

  isLink(url: string): boolean {
    return /(https?:\/\/[^\s]+)/g
      .test(url);
  }
}
