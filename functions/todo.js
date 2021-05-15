const fetch = require('node-fetch');
let list = [];


function ToDoMsgContent(msgIndex, msg) {
        const todoMsg = 
            "```"+
            "Please use the following commands:"+
            "\n -todo show --> to display ToDo for today"+
            "\n -todo show date(DD-MM-YYYY) --> to display ToDo for a specific date"+
            '\n -todo add "message" --> to add new item to the ToDo list'+
            "```";
        if(msgIndex.length == 1)
            msg.channel.send(todoMsg);
        else if(msgIndex.length == 2) {
            if(msgIndex[1] === 'show') {
                let res = showToDo().then(res => msg.channel.send(["```", res, "```"])).catch(err => console.log(err));
            }
        }
        else if(msgIndex.length >= 3) {
            if(msgIndex[1] === 'show') {
                if(dateCheck(msgIndex[2]))
                    res = showToDoWithDate(msgIndex[2]).then(res => msg.channel.send(["```", res, "```"])).catch(err => console.log(err));
                else {
                    const errMsg = "```"+"Please enter the date in the correct format!! (DD-MM-YYYY)\n"+"```";
                    msg.channel.send(errMsg);
                }
            }

            else if(addReg.test(msg.content)) {
                // console.log("Correct"); //+ //msg.channel);
                addToDo(msg.content).then(res => msg.channel.send(["```", res, "```"])).catch(err => console.log(err));
            }
            else {
                // console.log("Incorrect Format " + addReg.test(msg.content) + " " + msg.content + " " + msg.channel.members);
                console.log(msg.channel.members);
                msg.channel.send(todoMsg);
            }
        }
}

async function showToDo() {
    const res = await fetch(`https://bot-api-thedssaved-gmailcom.vercel.app/data/todo/${dd_mm_yyyy()}`)
    .then(res => res.json()) // expecting a json response
    .then((todoList) => { 
        list = `The ToDo list for ${dd_mm_yyyy()}:`;
        let count = 1;
        todoList.forEach(item => {
            list+= `\n\t ${count++}. ${item.message}`;
        });
        // console.log(list);
        return list;
    })
    // console.log(res);
    return res;
}

function showToDoWithDate(date) {
    return fetch(`https://bot-api-thedssaved-gmailcom.vercel.app/data/todo/${date}`)
    .then(res => res.json()) // expecting a json response
    .then((todoList) => { 
        list = `The ToDo list for ${date}:`;
        let count = 1;
        todoList.forEach(item => {
            list+= `\n\t ${count++}. ${item.message}`;
        });
        // console.log(list);
        return list;
    })
}

function addToDo(msg) {
    const body = { 
        message: quoteStringExtract(msg),
        date: dd_mm_yyyy()
    };
 
    return fetch('https://bot-api-thedssaved-gmailcom.vercel.app/data/todo/', {
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then((todoList) => {
        list = `Task Added Successfully!! \nThe ToDo list for ${dd_mm_yyyy()}:`;
        let count = 1;
        todoList.forEach(item => {
            list+= `\n\t ${count++}. ${item.message}`;
        });
        // console.log(list);
        return list;
    });
}

function quoteStringExtract(msg) {
    const regexp = /".*?"/gus;
    let result = regexp.exec(msg)[0];
    let final = "";
    for(var i=1; i<result.length-1; i++)
        final+=result[i];
    return final;
}

function dd_mm_yyyy() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    var today = dd + '-' + mm + '-' + yyyy;
    return today;
}

const addReg = new RegExp(`^-todo add "([ A-Za-z0-9_!//@./*:;'"#&+-]+)"$`);

function dateCheck(date) {
    const exp = new RegExp('^(((0[1-9]|[12][0-9]|30)[-]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-]?02)[-]?[0-9]{4}|29[-]?02[-]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$');
    return exp.test(date);
}

module.exports = {
    ToDoMsgContent: ToDoMsgContent,
    showToDo: showToDo,
    showToDoWithDate: showToDoWithDate,
    addToDo: addToDo,
}