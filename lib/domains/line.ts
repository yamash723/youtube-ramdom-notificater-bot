import axios from "axios"
import * as querystring from "querystring"

export const notificationToLine = async (token: string, message: string) => {
    await axios({
        method: "post",
        url: "https://notify-api.line.me/api/notify",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: querystring.stringify({
            message: message,
        }),
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        throw new Error(err)
    })
}