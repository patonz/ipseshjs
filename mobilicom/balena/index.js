const udp = require('dgram');

require('dotenv').config();
const localserverIp = process.env.LOCAL_SERVER;
const localPort = process.env.LOCAL_PORT;

const remoteServerIp = process.env.REMOTE_IP;
const remotePort = process.env.REMOTE_PORT;
const messageTosend = process.env.MESSAGE;
// --------------------creating a udp server --------------------

// creating a udp server
const socket = udp.createSocket('udp4');

// emits when any error occurs
socket.on('error', function (error) {
    console.log('Error: ' + error);
    socket.close();
});

// emits on new datagram msg
socket.on('message', (msg, info) => {
    console.log('Data received from remote : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

//emits when socket is ready and listening for datagram msgs
socket.on('listening', () => {
    var address = socket.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Socket is listening at port ' + port);
    console.log('Socket ip :' + ipaddr);
    console.log('Socket is IP4/IP6 : ' + family);
    setInterval(() => {
        socket.send(messageTosend, remotePort, remoteServerIp, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Data sent !!!');
            }
        });
    }, 5000);
});

//emits after the socket is closed using socket.close();
socket.on('close', () => {
    console.log('Socket is closed !');
});

socket.bind(localPort, localserverIp, () => {
    socket.setBroadcast(true)
});

/*setTimeout(function () {
    server.close();
}, 8000);*/

// -------------------- udp client ----------------



/*

//sending msg
client.send(data, remotePort, remoteServerIp, function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

//sending multiple msg
client.send([data1, data2], remotePort, remoteServerIp, function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});*/