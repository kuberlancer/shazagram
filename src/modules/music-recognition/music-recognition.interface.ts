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
  getDetail(filePath: string): Promise<MusicDetail>;
}

export interface IMusicRecognitionStrategy {
  getDetail(filePath: string): Promise<MusicDetail>;
}
