export interface MusicDetail {
  name: string;
}

export interface IMusicRecognitionService {
  getDetail(url: string): MusicDetail;
}

export interface IMusicRecognitionStrategy {
  isAppropriateStrategy(url: string): boolean;
}
