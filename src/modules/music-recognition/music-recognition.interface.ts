import { Express } from 'express';

export interface MusicDetail {
  subtitle: string;
  title: string;
  url: string;
}

export interface MatchResult {
  track: {
    title: string;
    subtitle: string;
    url: string;
  }
}

export interface IMusicRecognitionService {
  getDetail(file: Express.Multer.File): Promise<MusicDetail>;
}

export interface IMusicRecognitionStrategy {
  getDetail(file: Express.Multer.File): Promise<MusicDetail>;
}
