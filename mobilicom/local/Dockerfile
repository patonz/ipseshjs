FROM node
WORKDIR /app
COPY . .
RUN apt update
RUN apt install net-tools
RUN npm install
#RUN +sysctl net.ipv4.icmp_echo_ignore_broadcasts=0

#CMD ["node", "index.js"]