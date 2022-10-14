const config = {
  // Get your own App ID at https://dashboard.agora.io/
  appId: '53820971c19048ff9f9cd0ba9e5cf83a',
  // Please refer to https://docs.agora.io/en/Agora%20Platform/token
  token:
    '00653820971c19048ff9f9cd0ba9e5cf83aIABp8xBZnfacGrWbmawBMn5QIucuN+2JYH+PaKLV9vymM0Wdgdi379yDIgDpDgAAaVtKYwQAAQD5F0ljAwD5F0ljAgD5F0ljBAD5F0lj',
  channelId: 'Agora Podcast 14102022',
  uid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
};

export default config;
