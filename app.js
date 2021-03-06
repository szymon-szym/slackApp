require('dotenv').config()
const { App } = require('@slack/bolt')

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', ({ message, say }) => {
    // say(`hey <@${message.user}>`)
    say({
        blocks: [
            {
                "type": "section",
                "text": {
                    type: "mrkdwn",
                    text: `hey <@${message.user}>`
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Click me"
                    },
                    action_id: "button_click"
                } 
            }
        ]
    })
});

app.action('button_click', ({ body, ack, say }) => {
    ack()
    say(`<@${body.user.id}> clicked the button`)
});


(async () => {
    await app.start(process.env.PORT || 3000)
    console.log('app is running ...')
})()

module.exports = app