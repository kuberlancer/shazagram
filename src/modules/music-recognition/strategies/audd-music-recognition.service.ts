import { createReadStream } from 'fs';
import { normalize } from 'path';
import { Express } from 'express';
import axios from 'axios';
import { injectable } from 'inversify';
import {
  IMusicRecognitionStrategy,
  MusicDetail,
} from '../music-recognition.interface';

@injectable()
export class AudDMusicRecognitionService implements IMusicRecognitionStrategy {
  public async getDetail(file: Express.Multer.File): Promise<MusicDetail> {
    const data = {
      api_token: '',
      file: createReadStream(normalize(file.path)),
      return: 'apple_music,spotify',
    };

    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.audd.io/',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    return {
      name: 'Unknown',
    };
  }
}
