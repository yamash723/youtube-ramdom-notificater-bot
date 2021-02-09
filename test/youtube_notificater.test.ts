import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as YoutubeNotificater from '../lib/youtube_notificater-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new YoutubeNotificater.YoutubeNotificaterStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
