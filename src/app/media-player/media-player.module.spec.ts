import { MediaPlayerModule } from './media-player.module';

describe('MediaPlayerModule', () => {
  let mediaPlayerModule: MediaPlayerModule;

  beforeEach(() => {
    mediaPlayerModule = new MediaPlayerModule();
  });

  it('should create an instance', () => {
    expect(mediaPlayerModule).toBeTruthy();
  });
});
