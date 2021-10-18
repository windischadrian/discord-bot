require('dotenv').config()

const { Client, Intents, Channel, MessageEmbed } = require('discord.js');
const { 
    getVoiceConnection, 
    joinVoiceChannel, 
    createAudioResource,
    createAudioPlayer,
    AudioPlayerStatus,
    NoSubscriberBehavior
} = require('@discordjs/voice');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const CronJob = require('cron').CronJob;
const bahoiSuicid = 'Oricâte probleme ai avea, nu-i bine să te omori ca țăranu...te omori ieee ca pizdele alea \'mă omor miaaa\', dar tu nu mai exiști, adică tu crezi că ajungi in altă lume și pula mea cu spiritul tău..NU! Spiritul rămane...in pizda mă-tii1 Știți ce e important? Să futi, să te distrezi, să bei, mici, bere, ăăăă și toate cele, pepeni, struguri, ciorchini, toate distracțiile toate panaramele sunt atâtea carusele sunt atâtea mașinării care să apeși pe butoane sunt atâtea magarii sa canti sa vioara sa toate alea ce dracu ma te omori ce pizda mă-...psaico maico ca esti bolnav la cap că nu te placi ca pula mea ca pula-n pizdă da mai lasă-mă-n pula mea crezi ca mă omor acuma ca dacă nu mai nu stiu ce mai lasă nu știu ce...\'mă omor\' vai băga-mi-aș pula-n mă-ta te omori? Mai lasă-mă in pula mea cu omorâtu pizdii.';
const playdl = require('play-dl');
// const ytsr = require('ytsr');
const ytsr = require('youtube-search-without-api-key');
const prefix = '?';
isready = false;

const queue = new Map();

/*
const queueConstruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    musicStream: createAudioPlayer(),
    songs: [],
    search: [],
    volume: 5,
    playing: true,
    leaveTimer: null /* 20 seconds in question 
  };
  */
  //queue.set('1234567812345678', queueContruct);
  
  // 2. get queueContruct from queue
  //const serverQueue = queue.get('1234567812345678');
  //if(!serverQueue) { /* not exist */ }
  
  // 3. delete from queue
  //queue.delete('1234567812345678');

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    isReady = true;
    console.log("Bot is ready");
    cafelutsaCronJob(client).start();
    change();
})



client.on("message", async message => {
    if (!isReady) return;
    if (message.author.bot) return;

    let voiceChannel = message.member.voice.channel;
    let messageText = message.content;
    
    if(messageText.startsWith(`${prefix}join`)) voiceChannelJoin(message, voiceChannel);

    if(messageText.startsWith(`${prefix}leave`)) voiceChannelLeave(message);

    if(messageText.startsWith(`${prefix}play`)) executePlayCommand(message, voiceChannel);

    if(messageText.startsWith(`${prefix}skip`)) executeSkipCommand(message);

    if(messageText.startsWith(`${prefix}stop`)) executeStopCommand(message);

    if(messageText.startsWith(`${prefix}q`)) executeQueueueueCommand(message);

    messageText = messageText.toLowerCase();
    
    hei(message, messageText);

})

function voiceChannelJoin(message, voiceChannel) {
    if (!voiceChannel) return message.reply("You need to be in a voice channel.");
        
    if (client.voice.connections) return message.reply("Already connected to a voice channel.");

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator:voiceChannel.guild.voiceAdapterCreator,
    });

            
    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: connection,
        musicStream: createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        }),
        songs: [],
        search: [],
        volume: 5,
        playing: false
      };

    queue.set(message.guild.id, queueConstruct);
    message.channel.send(`Joined ${voiceChannel.name} channel. Use **${prefix}play** to add songs to the queue.`)

}

function voiceChannelLeave(message) {
    let connection = queue.get(message.guild.id).connection;

    if (!connection) return message.reply("Not in any voice channel.");

    connection.disconnect();
    connection.destroy();

    queue.delete(message.guild.id);
}

async function executePlayCommand(message, voiceChannel) {
    const messageChannel = message.channel;
    audioName = message.content.substr(`${prefix}play`.length);
    if (!voiceChannel) return message.reply("You need to be in a voice channel.");

    if (!audioName) return message.reply("Forgot song title?");

    var serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
        voiceChannelJoin(message, voiceChannel);
        serverQueue = queue.get(message.guild.id)
    }

    try {
        var songInfo;
        if (!audioName.includes('www.youtube.com/watch?v=')) {
            songInfo = await searchYoutubeAsync(audioName);
        } else {
            audioName.trim();
            songInfo = {
                title: 'Plm e d-aia cu link',
                url: audioName,
                duration: '00:00'
            }
        }
 
        const song = {
            title: songInfo.title,
            url: songInfo.url,
            duration: songInfo.duration_raw,
        }
        
        serverQueue.songs.push(song);

        if (!serverQueue.playing) play(message);

        messageChannel.send(`Added **${song.title}** to the queue.\n${song.url}`);
    } catch (err) {
        console.log(err);
        return messageChannel.send(`Shit went sideways\n${err}`);
    }
    
}

async function searchYoutubeAsync(songName) {
    const videoResult = await ytsr.search(songName);
    const songInfo = videoResult[0];
    return songInfo;
}

async function play(message) {
    const messageChannel = message.channel;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);
    const song = serverQueue.songs[0];

    if (!song) {
        connection = serverQueue.connection;
        connection.disconnect();
        connection.destroy();
        queue.delete(guildId);
        return;
    }

    try {
        const stream = await playdl.stream(song.url);
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        serverQueue.musicStream.play(resource);

        serverQueue.connection.subscribe(serverQueue.musicStream);
        serverQueue.playing = true;

        serverQueue.textChannel.send(`Playing: **${song.title}**`);

        serverQueue.musicStream.on(AudioPlayerStatus.Idle, () => {
            serverQueue.playing = false;
            serverQueue.songs.shift();
            play(message)
        });

    } catch (err) {
        console.log(err);
        return messageChannel.send(`Shit went sideways\n${err}`);
    }
    
}

function executeSkipCommand(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    message.reply("Skipped current song.");
    serverQueue.songs.shift();
    play(message)
}

function executeStopCommand(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    message.reply("Stopped playing songs.");
    serverQueue.connection.dispatcher.end();
    queue.delete(message.guild.id);
}

function executeQueueueueCommand(message) {
    try {
        const serverQueue = queue.get(message.guild.id);

        if (!serverQueue) return message.reply('Not playing any songs or some shit.');
    
        var qMessage = '*Songs in queueueueueueue:*\n';
        var i = 1;
        serverQueue.songs.forEach(song => {
            qMessage+= i + ' - ' + song.title + ' - ' + song.duration + '\n';
            i++;
        });
        message.channel.send(qMessage);
    } catch (err) {
        return message.reply(`Shit went sideways\n${err}`);
    }
    
}

function hei(message, messageText) {
    if (messageText.includes('miau')) {
        message.reply('Imi bag pula in mieunatu tau coaie');
    } else if (messageText.includes('babilon')) {
        message.reply('Baga-ti-as babilonu in cur');
    } else if (messageText.match(/(ei|3|ei\?|ei \?|3\?|3 \?)$/)) {
        message.reply('De pula sa ma iei hei hei');
    } else if (messageText.endsWith('5') || messageText.endsWith('cinci')) {
        message.reply('In cur ma lingi');
    } else if (messageText.match(/(arici|arici\?|arici \?)$/)) {
        message.reply('Du-te-n pula mea de aici');
    } else if (messageText.match(/(sinucid|suicid|ma omor)/)) {
        message.reply(bahoiSuicid);
    }
}

const altName = ['Sandei', 'Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', ];
const date = new Date();

function change() {

    var welfareVoiceChannel =  client.channels.cache.get('698958944122699878');
    var day = date.getDay();
    var newName = 'Welfare ' + altName[day];

    welfareVoiceChannel.setName(newName);
}

setInterval(change, 1000000);

const cafelutsaCronJob = (client) => new CronJob('00 00 09 * * *', () => {

    var generalTextChannel = client.channels.cache.get('788439966975000576');
    generalTextChannel.send('Va urez spor la cafelutsa si sa aveti o zi minunata!');

}, null, true, 'Europe/Bucharest');