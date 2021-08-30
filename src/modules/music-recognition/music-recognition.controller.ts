import {
  interfaces,
  controller,
  httpGet,
  queryParam,
} from 'inversify-express-utils';

@controller('/recognition')
export class MusicRecognitionController implements interfaces.Controller {
  @httpGet('/')
  public recognizeMusic(
    @queryParam('url') url: string,
  ): { url: string } {
    return {
      url,
    };
  }
}
