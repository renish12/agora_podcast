import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  max: {
    flex: 1,
    // marginVertical: 40,
    backgroundColor: '#F7F7F7',
  },
  buttonHolder: {
    alignItems: 'center',
    // // alignItems: 'flex-end',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginBottom: -100,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#38373A',
    // borderRadius: 24,
  },
  buttonRed: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: '#F4061D',
    borderRadius: 24,
  },
  buttonGreen: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: '#09DF18',
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    flex: 0.7,
    alignContent: 'center',
    marginHorizontal: 24,
    marginBottom:15
  },
  centerText: {
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  roleText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fbfbfb',
    fontSize: 20,
  },
  roleTextBold: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },
  roleTextRed: {
    textAlign: 'center',
    fontSize: 18,
    // color: '#F4061D',
  },
  spacer: {
    width: '100%',
    padding: '2%',
    marginBottom: 32,
    // borderWidth: 1,
    backgroundColor: '#38373A',
    color: '#fbfbfb',
    // borderColor: '#38373A',
  },
  input: {
    height: 40,
    borderColor: '#38373A',
    borderWidth: 1.5,
    width: '90%',
    alignSelf: 'center',
    padding: 10,
  },
  errorText: {textAlign: 'center', margin: 5, color: '#38373A'},
});
