const config = {
  // Get your own App ID at https://dashboard.agora.io/
  appId: '53820971c19048ff9f9cd0ba9e5cf83a',
  // Please refer to https://docs.agora.io/en/Agora%20Platform/token
  token:
    '007eJxTYJDV3SMTcfmYUFz6ZrcHj6U9VokJXmeUW7Mwf1JXdNrdFRcUGEyNLYwMLM0Nkw0tDUws0tIs0yyTUwySEi1TTZPTLIwTZzu4JUtNck8+cFeKiZEBAkF8DgZDI0MDIwMjIwYGAGxQH1A=',
  channelId: '12102022',
  uid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
};

export default config;
