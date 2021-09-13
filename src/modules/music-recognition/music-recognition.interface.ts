import { Express } from 'express';

export interface MusicDetail {
  name: string;
}

export interface IMusicRecognitionService {
  getDetail(file: Express.Multer.File): MusicDetail;
}

export interface IMusicRecognitionStrategy {
  getDetail(file: Express.Multer.File): MusicDetail | Promise<MusicDetail>;
}
