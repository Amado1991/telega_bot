const { Telegraf, Markup } = require("telegraf")
require("dotenv").config()
const text = require('./const')

const urlSheet = `https://sheets.googleapis.com/v4/spreadsheets/${ text.spreadsheetId }/values:batchGet?ranges=График&majorDimension=ROWS&key=${ text.apiKey }`;



const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : `незнакомец`}!`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('training', async (ctx) => {

    try {
        await ctx.replyWithHTML('<b>Записаться на тренировку</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('функциональное направление', 'btn_1')],
            [Markup.button.callback('мягкое направление', 'btn_2')]
        ]))
}catch(e) {
    console.error(e)
    }
    
})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try{
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text)
        }catch(e) {
        console.error(e)
        }
    })
}

addActionBot('btn_2', false, text.text)

bot.action('btn_1', async (ctx) => {
    try{
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Развитие выносливости, силы, сушка, сброс веса. Тренировки проходят по вторникам в первой половине дня 😊👍. <b>Записаться на тренировку:</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('12.09.2023', 'data_1'), Markup.button.callback('12.09.2023', 'data_2'), Markup.button.callback('12.09.2023', 'data_3')],
                [ Markup.button.callback('12.09.2023', 'data_4'), Markup.button.callback('12.09.2023', 'data_5'), Markup.button.callback('12.09.2023', 'data_6')],
                [Markup.button.callback('12.09.2023', 'data_7'), Markup.button.callback('12.09.2023', 'data_8'), Markup.button.callback('12.09.2023', 'data_8')],
            ]
        ))
    }catch(e) {
    console.error(e)
    }
})


bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))