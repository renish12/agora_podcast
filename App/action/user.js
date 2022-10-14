import { Alert } from "react-native";
import Api from '../utils/apiMethod';
// import AsyncStorage from "@react-native-async-storage/async-storage";

export function setLoginDetails(data) {
  console.log(data, 'Authorization');
  Api.defaultHeader({
    UserId: 1,
    Token: 'KegRh1XVTyD-bGgc25aICEVj70LrF0B1y',
  });
}

// export function setLoginDetails() {
//    console.log('header');
//    Api.defaultHeader({
//       'x-api-key' : 'f93f7999-b30d-47cb-8e88-1fb9b5c8a718'
//    })
// }

function getStatus(response, dispatch) {
  if (response.status === 200) {
    return { status: true, response: response.response };
  } else if (response.status === 502) {
    Alert.alert("Internet not available", "Please check your internet setting");
    return { status: false };
  } else {
    if (response.status === 400) {
      return { status: false, response: response.response };
    } else if (response.status === 428) {
      Alert.alert(response, "Something Wrong");
      return { status: false, response: response.response };
    } else {
      return { status: false, response: response };
    }
  }
}
//----------------------Authentication flow API----------------------//
// export async function createPodcastChannel(params) {
//   try {
//     const res = await Api.POSTFORMDATA('create_podcast', params);
//     if (res) {
//       console.log(res, '........');
//       return getStatus(res);
//     } else {
//       return {status: false, message: res.message};
//     }
//   } catch (error) {
//     console.log('addPersonalProfile error: ', error);
//     return {status: false, errorMessage: 'Oops, Something Went Wrong'};
//   }
// }
export async function createPodcastChannel(data) {
    try {
      const res = await Api.POSTFORMDATA("create_podcast", data);
      if (res.status) {
      console.log(res);
        return { status: res.status, data: res.data };
      } else {
        return { status: res.status, message: res.message };
      }
    } catch (error) {
      console.log("userRegister Error: ", error);
      return { status: false, message: "Oops, Something Went Wrong" };
    }
}
// export async function signinWithMobileNumber(params) {
//   try {
//     const res = await Api.POST("Authentication/SigninWithMobileNumber", params);
//     if (res) {
//       // setLoginDetails(res.response.data.stDeviceToken);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("signinWithMobileNumber error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function checkUserIaExistOrNot(params) {
//   try {
//     const res = await Api.POST("Authentication/CheckUserIaExistOrNot", params);
//     if (res) {
//       // setLoginDetails(res.response.data.stDeviceToken);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("CheckUserIaExistOrNots error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function addIMEINumber(params) {
//   try {
//     const res = await Api.POST("Authentication/AddIMEINumber", params);
//     if (res) {
//       // console.log(res.response.data, "ASDASDASDASDASDAS");
//       // await AsyncStorage.setItem("imeiResponse", res.response.data);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("AddIMEINumber error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function addDeviceToken(params) {
//   try {
//     const res = await Api.POST("Authentication/AddDeviceToken", params);
//     if (res) {
//       if (res.status == 200)
//         await AsyncStorage.setItem("token", res.response.data.stDeviceToken);
//       // AsyncStorage.setItem("userId", JSON.stringify(result.response.data));
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("AddDeviceToken error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function getCountryList() {
//   try {
//     const res = await Api.GET("Authentication/CountryList");
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getCountryList error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function verifyOTP(params) {
//   try {
//     const res = await Api.POST("Authentication/VerifyOTP", params);
//     if (res) {
//       console.log(res, "OTP");
//       // if (res.status === 200) setLoginDetails(res.response.data.Token);
//       // await AsyncStorage.setItem("token", res.response.data.Token);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("Verify OTP error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function signUpForm(params) {
//   try {
//     const res = await Api.POST("Authentication/Signup", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("SignUp Form error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function getUserProfileByUserId(params) {
//   console.log(params, ">>");
//   try {
//     const res = await Api.POST("Authentication/GetUserByUserId", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("SignUp Form error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function resendOTP(params) {
//   try {
//     const res = await Api.POST("Authentication/ReSendOTP", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("resendOTP error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// export async function getUserDetail(params) {
//   try {
//     const res = await Api.GET("Profile/GetUserById", params);
//     if (res) {
//       //  console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getUserDetail error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// export async function updateUserProfile(params) {
//   try {
//     const res = await Api.POST("Profile/UpdateProfile", params);
//     if (res) {
//       console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }
// //----------------------------------------------------------------//

// //----------------------Manage Category----------------------//
// export async function getCategoryAPI(params) {
//   try {
//     const res = await Api.GET("Category/GetAllCategory", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("Get Image error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// export async function getCategoryByImageCategoryIdAPI(params) {
//   try {
//     const res = await Api.GET("Category/GetAllCategory", params);
//     if (res) {
//       //  console.log(res,"IMAGE LIST");
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("Get Image error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// //----------------------------------------------------------------//

// //----------------------Manage Image----------------------//
// export async function getImageAPI(params) {
//   //  return async (dispatch) => {
//   try {
//     const res = await Api.GET("Image/GetImageByCategory", params);
//     if (res) {
//       // if (res.status === 200) { await dispatch({ type: IMAGE_LIST, payload: res.response.data }) }
//       //  console.log(res,"IMAGE LIST");
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("Get Image error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
//   // }
// }

// export async function getImageByCategoryIdAPI(params) {
//   try {
//     const res = await Api.POST("Image/GetImageByCategoryId", params);
//     if (res) {
//       //  console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getVideoByTag error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function getImageBySubCategoryIdAPI(params) {
//   try {
//     const res = await Api.POST("SubCategory/GetImageBySubCategoryId", params);
//     if (res) {
//       //  console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getVideoByTag error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function favoriteVideoList(params) {
//   try {
//     const res = await Api.GET("video/FetchFavoriteVideos", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("favoriteVideoList error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// //----------------------------------------------------------------//
// //----------------------Manage Tag----------------------//
// export async function getTagList(params) {
//   try {
//     const res = await Api.GET("Tag/FetchTags", params);
//     if (res) {
//       //  console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getTagList error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }
// export async function getUserTagList(params) {
//   try {
//     const res = await Api.GET("Tag/GetUserTagsById", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getUserTagList error: ", error);
//     return { status: false, message: "Oops, Something Went Wrong" };
//   }
// }

// export async function addEditUserTagList(params) {
//   try {
//     const res = await Api.POST("Tag/addEditUserTag", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("addEditUserTagList error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }
// //----------------------------------------------------------------//

// export async function addDeviceDetails(params) {
//   try {
//     const res = await Api.POST("Authentication/AddDeviceDetails", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("addDeviceDetails error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function editDeviceDetails(params) {
//   try {
//     const res = await Api.POST("Authentication/EditDeviceDetails", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("editDeviceDetails error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function addPersonalProfile(params) {
//   try {
//     const res = await Api.POST("Authentication/AddPersonalProfile", params);
//     if (res) {
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("addPersonalProfile error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function addBusinessProfile(params) {
//   try {
//     const res = await Api.POST("Authentication/AddBusinessProfile", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("addBusinessProfile error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function editBusinessProfile(params) {
//   try {
//     const res = await Api.POST("Authentication/EditBusinessProfile", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("addBusinessProfile error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function setDefaultProfiles(params) {
//   try {
//     const res = await Api.POST("Authentication/SetDefaultProfiles", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("SetDefaultProfiles error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function getProfilesByUserId(params) {
//   try {
//     const res = await Api.POST("Authentication/GetProfilesByUserId", params);
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("getProfilesByUserId error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function deleteUserAccount(params) {
//   try {
//     const res = await Api.DELETE(
//       `Authentication/DeleteUserAccount?inUserID=${params}`,
//       params
//     );
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("deleteUserAccount error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }

// export async function deleteProfile(params) {
//   try {
//     const res = await Api.DELETE(
//       `Authentication/DeleteProfile?inProfileId=${params}`,
//       params
//     );
//     if (res) {
//       // console.log(res);
//       return getStatus(res);
//     } else {
//       return { status: false, message: res.message };
//     }
//   } catch (error) {
//     console.log("deleteProfile error: ", error);
//     return { status: false, errorMessage: "Oops, Something Went Wrong" };
//   }
// }
