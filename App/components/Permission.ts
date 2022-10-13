import {PermissionsAndroid} from 'react-native'

/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
            && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===  PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('You can use the cameras & mic & local Storage')
        } else {
            console.log('Permission denied')
        }
    } catch (err) {
        console.warn(err)
    }
}