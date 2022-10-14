const isLive = false;
const isStage = false;
// let api_base_uri = "https://nettpage.com/Development/index.php/api/version_1_0";
// let api_base_uri = "http://192.168.29.72/Nettpage/api/version_1_0";

const firebaseDatabaseRef = {
  ChatList: "ChatList/",
  ChatRoom: "ChatRoom/",
  Messages: "Messages/",
  profile_info: "profile_info/",
};
{
  /* development */
}
// let api_base_uri = "http://88.208.196.241/Development/api/version_1_0"; // development url
let api_base_uri = "http://88.208.196.241/Development/api/version_2_0"; // development url
// let api_base_uri = "http://192.168.29.72/Nettpage/api/version_1_0"; // local url

let googleWebClientId =
  "381211351982-7jgnd71p4e8cu61jhskvjm37p8kr2vj2.apps.googleusercontent.com"; // development webClientId
let cloudMessagingServerKey =
  "AAAAWMH3m64:APA91bFMMxn1tpPs5XbVoEZnLvELKnATBQ2Hd_Qp6p6SR8zja8q3cpAu0JP17ZwYYcia-P4uX2XC4tQqK3UFm93rPobJVELuc8Pv4YizXgHB6_r7LZDWnznakO2TNwQrQe9DZEca55SL";
let DynamicLinkDomainUriPrefix = "https://appnettpagedev.page.link"; // development dynamicLinks Domain

{
  /* Stage (do not change) */
}

// if (isStage) {
//   api_base_uri = "http://88.208.196.241/Development/api/version_1_0"; // Stage url
//   googleWebClientId =
//     "519815190149-5jrsadejsr184ekp3a1s3jmjh13io04l.apps.googleusercontent.com"; // Stage webClientId
//   cloudMessagingServerKey =
//     "AAAAeQdmVoU:APA91bFH18AvbUxqvP8t0UnOekbjHfHKadjOIiIhTi-0IOycefSwXnn1ST6r2Tfn7_QTY_1UfJ2qmGlW3qH7-8vsXtUEH4Bb7HyEiH4-fXGt26_L43y3PQYUz2ZXUJNJpS6NG3QxYWkG";
// }

{
  /* Live (do not change)*/
}

if (isLive) {
  // api_base_uri = "https://nettpage.com/Live/index.php/api/version_1_0"; // Live url
  api_base_uri = "http://88.208.196.241/Live/api/version_1_0"; // Live url
  googleWebClientId =
    "305576584738-obtlmuoget488ou0ifiacvg37r2p8qsh.apps.googleusercontent.com"; // Live webClientId
  cloudMessagingServerKey =
    "AAAARyXIpiI:APA91bFOTXwF9iI-OjtU4fXWOVgfETaddRYCKt3JaT9dlmTU3aY3dRMql-Rr47ksz_duVhSsqOugv7hGHIvZQEZFFPHYlG8dSimCvifSsjGF5W9ebVRh8mjOHuK_vvfdOZcx1vwo59Go";
  DynamicLinkDomainUriPrefix = "https://appnettpage.page.link"; // Live dynamicLinks Domain
}

export default {
  isLive,
  api_base_uri,
};
export {
  firebaseDatabaseRef,
  googleWebClientId,
  cloudMessagingServerKey,
  DynamicLinkDomainUriPrefix,
};
