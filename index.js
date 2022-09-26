const { 
    Telegraf, 
    Markup 
} = require('telegraf');
require('dotenv').config();
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'посетитель'}`));
bot.help((ctx) => ctx.reply(text.command));

bot.command('service', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Документы</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'), Markup.button.callback('Обзоры', 'btn_2')],
            [Markup.button.callback('Редакторы', 'btn_3')], [Markup.button.callback('Обзоры', 'btn_4')]
        ]))
    } catch (err) {
        console.log(err);
    }  
})

function addActionBot(name, src, text) {
    bot.action(name, async(ctx) => {
        try {
            await ctx.answerCbQuery();
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch(err) {
            console.log(err);
        }
    })
}
addActionBot('btn_1', './img/1.jpeg', text.text1);
addActionBot('btn_2', './img/2.jpeg', text.text2);
addActionBot('btn_3', false, text.text3);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));