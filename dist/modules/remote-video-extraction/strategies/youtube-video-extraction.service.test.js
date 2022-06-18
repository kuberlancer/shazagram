"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_video_extraction_service_1 = require("./youtube-video-extraction.service");
describe('YoutubeMusicRecognitionService', () => {
    let youtubeVideoExtractionService;
    beforeAll(() => {
        youtubeVideoExtractionService = new youtube_video_extraction_service_1.YoutubeVideoExtractionService();
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
