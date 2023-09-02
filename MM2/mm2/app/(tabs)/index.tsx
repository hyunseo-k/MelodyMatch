import { StyleSheet, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native';
import React from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import * as AuthSession from 'expo-auth-session';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './profile';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const defaultUserInfo = {
  email : "test@gmail.com",
  avatar : 0,
  gender : '남',
  age : 10,
};

const onPressKakaoLogin = () => {
  console.warn("onLoginKakaoPressed");
};

const onPressNaverLogin = () => {
  console.warn("onLoginNaverPressed");
};

const kakaoclientId = '09b915ae69a32d00e7b3725b01cb614d';
const naverClientId = 'Dolm0U6r8etuHuK7cZOj';
const naverClientSecret = '76qmfmY97y';

export default function TabOneScreen() {
  const [email, onChangeemail] = React.useState('');
  const [password, onChangepassword] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(defaultUserInfo);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const navigation = useNavigation();

  const handleKeyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
    };
  }, []);

  const handleKakaoAuth = async () => {
    const redirectUri = AuthSession.getRedirectUrl();
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoclientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
    
    const result = await AuthSession.startAsync({ authUrl });
    console.log(result);
    // 결과 처리
  };

  const handleNaverAuth = async () => {
    const redirectUri = AuthSession.getRedirectUrl();
    console.log(redirectUri)
    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=STATE_STRING`;
    
    const result = await AuthSession.startAsync({ authUrl });
    console.log(result);
    // 결과 처리
  };

  const getUserInfo = () => {
    return userInfo;
  };

  React.useEffect(() => {
    console.log("userInfo updated:", userInfo);
    
  }, [userInfo]);
  
  const updateUserInfo = (newInfo) => {
    setUserInfo(newInfo);
  };

  const onPressLogin = async (e) => {
    console.log('email:', email);
    console.log('password:', password);
    try {
      const response = await fetch(`http://172.10.5.119/polls/user/?email=${email}&password=${password}`);
      if (response.ok) {
        const data = await response.json();
        console.log("response", data);
        if (email === data.email) {
          setUserInfo({
          email: email,
          avatar: data.avatar,
          gender: data.gender,
          age: data.age,
        });
          const updatedUserInfo = {
            email: email,
            avatar: data.avatar,
            gender: data.gender,
            age: data.age,
          };
          setUserInfo(updatedUserInfo);


          navigation.navigate('profile', { profile: updatedUserInfo });

          // navigate("/selection");
          // 친구들 있는 화면으 넘어가
      } else {
        console.error("Error");
      }
    }} catch (error) {
      console.error("Error:", error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <LinearGradient colors={['#FFE7E7', '#FE99BB']} style={styles.container}>
          <Text style={styles.title}>~ Melody Match ~</Text>
          <Text style={styles.stitle}>로그인하여 나만의 음악 친구를 만나세요!</Text>
          <SafeAreaView>
            <Text style={styles.subtitle}>♫ Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeemail}
              value={email}
              placeholder="이메일"
            />
            <Text style={styles.subtitle}>♫ PW:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangepassword}
              value={password}
              placeholder="비밀번호"
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={onPressLogin}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#ffff" darkColor="rgba(255,255,255,0.1)" />

            <TouchableOpacity style={styles.kbutton} onPress={handleKakaoAuth}>
              <Text style={styles.buttonText}>카카오 로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nbutton} onPress={handleNaverAuth}>
              <Text style={styles.buttonText}>네이버 로그인</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#ffff" darkColor="rgba(255,255,255,0.1)" />
            <TouchableOpacity onPress={handleNaverAuth}>
              <Text style={styles.goregister} >회원가입 하러가기</Text>
            </TouchableOpacity>
          </SafeAreaView>
          </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginTop: '10%',
    marginBottom: '5%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: '30%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'DOS',
  },
  stitle: {
    textAlign: 'center',
    marginBottom:20,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'DOS',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  input: {
    marginStart:30,
    marginEnd:30,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 20,
    borderRadius: 50,
    fontFamily: 'DOS',
  },
  subtitle: {
    marginStart: 30,
    fontSize: 16,
    marginBottom: 0,
    lineHeight: 29.3,
    fontFamily: 'DOS',
  },
  button: {
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    backgroundColor: '#ee8097',
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'DOS',
  },
  kbutton: {
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    backgroundColor: '#F7E600',
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  nbutton: {
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    backgroundColor: '#2DB400',
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  goregister: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'DOS',
    textDecorationLine: 'underline',
  }
});
