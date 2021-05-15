# MARK-BOT
<p align="justify">
This is Disocord MARK BOT which provides the users with some basic built-in functionalities or discord commands. <a href='https://discord.com/api/oauth2/authorize?client_id=842340656831135754&permissions=0&scope=bot'>Click here</a> to add the BOT to your various discord servers.
</p>

## [Getting Started](#started)
Head over to the [Discord BOT Link](https://discord.com/api/oauth2/authorize?client_id=842340656831135754&permissions=0&scope=bot), there you need to select a server from your account and then click on **Authorize**. Then you will see the MARK-I (current version) is added to your discord server. The BOT will be initially offline in the server like this:
<br><br>
![MARK-I BOT OFFLINE](https://firebasestorage.googleapis.com/v0/b/discord-bot-27096.appspot.com/o/MARK-I%20BOT%20OFFLINE.JPG?alt=media&token=f21a6fc5-1c5d-4e6b-b8f1-29b63bd0186a)
<br><br>
This is because currently the BOT is not deployed on any platform, so it will not work as soon as you add it to your server. To make the BOT come online, we need to follow certain steps first:
1. Eitherd download my code or firstly Fork my Repo and open up a terminal and type the following command
  ```
    git clone https://github.com/dakshsethi/MARK-BOT.git
    cd MARK-BOT
    npm install
  ```
2. Now the BOT is successfully installed in your local computer but still if you type `npm start` this returns an error in your terminal
`(node:10108) UnhandledPromiseRejectionWarning: Error [TOKEN_INVALID]: An invalid token was provided.` <br>
  This error because in the last line of the `index.js` file a NodeJs environment variable has been used as the Discord Login Token by the name `process.env.DISCORD_TOKEN` as this a secret token so that's why i have used the environment varibale to hide it.
  
3. To make the BOT come online we need to first create a BOT in our own disocrd portal. Head over to [Discord Developer's Portal](https://discord.com/developers/). Click on `New Application` now enter your **application name** and click on Create.
4. Now a General Information page of your application will open. Now on the sidebar click on **BOT**.
5. Go to `Build-A-Bot` and click on **Add Bot** button, now click on `Yes, do it!`. Now you will see a Build-A-Bot section like this:
![Build-A-Bot](https://firebasestorage.googleapis.com/v0/b/discord-bot-27096.appspot.com/o/Build-A-Bot.JPG?alt=media&token=4af3e643-8c24-4e00-aed0-9a7676e49417)
Click on Copy to copy your **DISCORD TOKEN**.
6. Replace `process.env.DISCORD_TOKEN` in your *index.js* file with this copied token.
7. Now again open up your terminal and simply run `npm start`, and now your BOT is finally online in your discord server and is ready to reply to your commands. **NOTE:** Everytime you terminate from the node command, the BOT will go offline so need you need to keep the file running in the background.


## [Bot Commands](#commands)
Currently the Bot supports only one command i.e., `-todo` but it has 3 additional features in this.
<table>
<thead>
  <tr>
    <th><code>-todo</code></th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>-todo show</code></td>
    <td>
      This displays the ToDo list for the current date.
    </td>
  </tr>
  <tr>
    <td><code>-todo show DD-MM-YYYY</code></td>
    <td>
      This displays the ToDo list for any specified date. <b>NOTE: The format of the date here is very important.</b> 
    </td>
  </tr>
  <tr>
    <td><code>-todo add "Message"</code></td>
    <td>Use this command to add any item to the current ToDo list.</td>
  </tr>
</tbody>
</table>
              






























