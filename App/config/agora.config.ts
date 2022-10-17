const config = {
  // Get your own App ID at https://dashboard.agora.io/
  appId: '53820971c19048ff9f9cd0ba9e5cf83a',
  // Please refer to https://docs.agora.io/en/Agora%20Platform/token
  token:
    '007eJxTYAg80hPEfW+lvNWEb/vk4poefet9nyg4i2GyptQ03mtt0x0UGEyNLYwMLM0Nkw0tDUws0tIs0yyTUwySEi1TTZPTLIwTf3B5JjcEMjLEOlswMzJAIIgvxGBoZGxiamZuYWlpbmFmamJsZMjAAADE8yA8',
  channelId: '123456789978654321',
  uid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
};

export default config;
