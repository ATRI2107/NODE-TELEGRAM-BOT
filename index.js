var TelegramBot=require('node-telegram-bot-api');
var token=''; //Enter your boT api token here
var bot=new TelegramBot(token,{polling: true});
var request=require('request');
bot.onText(/\/movie (.+)/,(msg,match)=>{
    var movie=match[1];
    var chatId=msg.chat.id;
    request('http://www.omdbapi.com/?apikey=34035a0a&t='+movie,(error,response,body)=>{
        if(!error && response.statusCode==200)
        {
            bot.sendMessage(chatId,'_Looking for _'+movie+'...',{parse_mode: 'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
                bot.sendMessage(chatId,'Result: \nTitle: '+res.Title+'\nYear: '+res.Year+'\nRated: '+res.Rated+'\nReleased: '+res.Released+"\nGenre: "+res.Genre+"\nActors: "+res.Actors+"\nPlot: "+res.Plot);
                bot.sendPhoto(chatId,res.Poster);
            });
        }
    });
});