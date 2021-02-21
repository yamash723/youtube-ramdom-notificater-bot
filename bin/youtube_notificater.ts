#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "@aws-cdk/core"
import { YoutubeNotificaterStack } from "../lib/youtube_notificater-stack"
require('dotenv').config()

const app = new cdk.App()

// eslint-disable-next-line no-new
new YoutubeNotificaterStack(app, "YoutubeNotificaterStack")
