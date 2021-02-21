import * as cdk from "@aws-cdk/core"
import { Runtime } from "@aws-cdk/aws-lambda"
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs"
import { Rule, Schedule } from "@aws-cdk/aws-events"
import { LambdaFunction } from "@aws-cdk/aws-events-targets"

export class YoutubeNotificaterStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const youtubeApiKey = process.env.YOUTUBE_API_KEY
    const youtubePlaylistId = process.env.YOUTUBE_PLAYLIST_ID
    const lineApiKey = process.env.LINE_API_KEY

    if (!youtubeApiKey || !youtubePlaylistId || !lineApiKey) throw new Error("Env error")

    const getItemLambda = new NodejsFunction(this, "youtubeNotificater", {
      entry: "lib/lambda/youtubeNotificater.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_12_X,
      environment: {
        YOUTUBE_API_KEY: youtubeApiKey,
        LINE_API_KEY: lineApiKey,
        YOUTUBE_PLAYLIST_ID: youtubePlaylistId,
      },
    })

    // eslint-disable-next-line no-new
    new Rule(this, "ScheduleEvent", {
      // 注意：GMTで指定
      schedule: Schedule.cron({
        minute: "30",
        hour: "0",
        day: "*",
        month: "*",
        year: "*",
      }),
      targets: [new LambdaFunction(getItemLambda)],
    })
  }
}
