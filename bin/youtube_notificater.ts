#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { YoutubeNotificaterStack } from '../lib/youtube_notificater-stack';

const app = new cdk.App();
new YoutubeNotificaterStack(app, 'YoutubeNotificaterStack');
