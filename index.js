const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

// Discord.Channel()

const todo = require('./functions/todo');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} 🔥🔥🔥`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the Server, ${member}`);
});

client.on('message', msg => {
    if(msg.content === 'ping')
        msg.channel.send('pong!!');
    console.log(msg.author.username);


    let msgIndex = msg.content.split(' ');

    if(msgIndex[0] === '-todo')
        todo.ToDoMsgContent(msgIndex, msg);
    // console.log(typeof msg.guild.members.cache);
    // console.log(typeof msg.channel.member)

    // coltsteel
    // Akshay Saini - Namesty Javascript

    // console.log(msg.channel.name);
    // if(msg.content === 'ping')
    //     msg.reply('pong!!');
    if(msg.content.includes("documentation")) {
        msg.reply(["```",
            "It sounds like you might be looking for DOCUMENTATION",
            "Try one of the following links: ",
            "Docs: https://disocordjs.guide",
            "```"
        ])
    }
})


// const addReg = new RegExp(`\-todo[' ']add[' ']["][\w\s]+["]\g`);
// const addReg = new RegExp(`^-todo add "([a-zA-Z ]+)"$`);
// const addReg = new RegExp(`^-todo add "([ A-Za-z0-9_!//@./#&+-]+)"$`);
const addReg = new RegExp(`^-todo add "([ A-Za-z0-9_!//@./*:;'"#&+-]+)"$`);

function dateCheck(date) {
    const exp = new RegExp('^(((0[1-9]|[12][0-9]|30)[-]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-]?02)[-]?[0-9]{4}|29[-]?02[-]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$');
    return exp.test(date);
}

client.login(process.env.DISCORD_TOKEN);