import { IMusicRecognitionStrategy } from '../music-recognition.interface';
import { YoutubeMusicRecognitionService } from './youtube-music-recognition.service';

describe('YoutubeMusicRecognitionService', () => {
  let youtubeMusicRecognitionService: IMusicRecognitionStrategy;

  beforeAll(() => {
    youtubeMusicRecognitionService = new YoutubeMusicRecognitionService();
  });

  test('should validate a youtube url', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(youtubeMusicRecognitionService.isAppropriateStrategy(url))
      .toBeTruthy();
  });

  test('should validate a short youtube url', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(youtubeMusicRecognitionService.isAppropriateStrategy(url))
      .toBeTruthy();
  });
});
