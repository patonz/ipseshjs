require('dotenv').config();
const IpseDevice = require('../script/index')
const localserverIp = process.env.LOCAL_SERVER;
const localPort = process.env.LOCAL_PORT;

const remoteServerIp = process.env.REMOTE_IP;
const remotePort = process.env.REMOTE_PORT;
const messageTosend = process.env.MESSAGE;
const netInterface = process.env.INTERFACE;

IpseDevice.connect(netInterface, localPort);

setInterval(() => {
    IpseDevice.sendMessageBroadcast(messageTosend);
}, 3000);


IpseDevice.onReceiveMessage((msg, info)=>{
    console.log(msg.toString());
    console.log(info);
})