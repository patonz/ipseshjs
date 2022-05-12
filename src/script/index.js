/**
 * IPSESHjs Internet Procol Suite for mESH
 */
const udp = require('dgram');



// creating a udp server
const socket = udp.createSocket('udp4');
const broadcastAddress = require('broadcast-address');

class IpsDevice {
    logPrefix = `[IPSESH]`;
    debug = true;
    printUnfilteredData = false;
    currentId = 0;
    prefix_logger = undefined;
    port = undefined;
    address = undefined;
    addressFamily = undefined;
    socketIp = undefined;
    broadcastIp = undefined;
    constructor() {
        this.onError();
        this.onListening();
        this.onClose();
    }

    connect(netInterface, socketPort, socketIp, ){
        if(socketIp == undefined){
            socketIp = '0.0.0.0'
        }
        this.bind(socketPort, socketIp);
        try {
            this.broadcastIp = broadcastAddress(netInterface)
        } catch (error) {
            this.broadcastIp = '255.255.255.255'
        }
     ;
    }

    bind(socketPort, socketIp) {
        socket.bind(socketPort, socketIp, () => {
            socket.setBroadcast(true)
        });
    }
   

    onError() {
        socket.on('error', (error) => {
            console.log('Error: ' + error);
            socket.close();
        });
    }

    onListening() {
        socket.on('listening', () => {
            this.address = socket.address();
            this.port = this.address.port;
            this.addressFamily = this.address.family;
            this.socketIp = this.address.address;
            this.logDebug('Socket is listening at port ' + this.port);
            this.logDebug('Socket ip :' + this.socketIp);
            this.logDebug('Socket is IP4/IP6 : ' + this.family);
        });
    }

    sendMessageToHost(msg, remotePort, remoteServerIp) {
        socket.send(msg, remotePort, remoteServerIp, (error) => {
            if (error) {
                console.log(error)
            } else {
                this.logDebug(`Data sent to ${remoteServerIp}:${remotePort}`);
            }
        });
    }

    sendMessageBroadcast(msg){
        socket.send(msg, this.port, this.broadcastIp, (error)=>{
            if (error) {
                console.log(error)
            } else {
                this.logDebug(`Data sent to ${this.broadcastIp}:${this.port}`);
            }
        })
    }

    onReceiveMessage(fun) {
        socket.on('message', (msg, info) => {
            this.logDebug('Data received from remote : ' + msg.toString());
            this.logDebug(`Received ${msg.length} bytes from ${info.address}:${info.port}\n`);
            fun(msg, info)
        });
    }

    onClose() {
        socket.on('close', () => {
            console.log('Socket is closed !');
        });
    }


    logDebug(data) {
        if (this.debug) {
            console.log(`${this.logPrefix} ${data}`);
        }
    }

}

module.exports = new IpsDevice(); // modules cache system, basically only one instance will be created.


