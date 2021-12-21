import { IRemoteVideoExtractionStrategy } from '../remote-video-extraction.interface';
import { YoutubeVideoExtractionService } from './youtube-video-extraction.service';

describe('YoutubeMusicRecognitionService', () => {
  let youtubeVideoExtractionService: IRemoteVideoExtractionStrategy;

  beforeAll(() => {
    youtubeVideoExtractionService = new YoutubeVideoExtractionService();
  });

  test('should validate a youtube url', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(youtubeVideoExtractionService.isAppropriateStrategy(url))
      .toBeTruthy();
  });

  test('should validate a short youtube url', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(youtubeVideoExtractionService.isAppropriateStrategy(url))
      .toBeTruthy();
  });
});
