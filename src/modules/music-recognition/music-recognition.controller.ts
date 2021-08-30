import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';

@JsonController('/recognition')
export class MusicRecognitionController {
  @Get()
  public recognizeMusic(
    @QueryParam('url') url: string,
  ): { url: string } {
    return {
      url,
    };
  }
}
