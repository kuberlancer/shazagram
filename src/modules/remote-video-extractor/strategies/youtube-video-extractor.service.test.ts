import { IRemoteVideoExtractorStrategy } from '../remote-video-extractor.interface';
import { YoutubeVideoExtractorService } from './youtube-video-extractor.service';

describe('YoutubeMusicRecognitionService', () => {
  let youtubeVideoExtractorService: IRemoteVideoExtractorStrategy;

  beforeAll(() => {
    youtubeVideoExtractorService = new YoutubeVideoExtractorService();
  });

  test('should validate a youtube url', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(youtubeVideoExtractorService.isAppropriateStrategy(url))
      .toBeTruthy();
  });

  test('should validate a short youtube url', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(youtubeVideoExtractorService.isAppropriateStrategy(url))
      .toBeTruthy();
  });
});
