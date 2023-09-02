import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import React from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import * as AuthSession from 'expo-auth-session';

const onPressRegister = () => {
  console.warn("onRegisterPressed");
};

const kakaoclientId = '09b915ae69a32d00e7b3725b01cb614d';
const naverClientId = 'Dolm0U6r8etuHuK7cZOj';
const naverClientSecret = '76qmfmY97y';

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

const onPressKakaoRegister = () => {
  console.warn("onRegisterKakaoPressed");
};

const onPressNaverRegister = () => {
  console.warn("onRegisterNaverPressed");
};

const genre_choices = [
  { label: 'POP', value: 8 },
  { label: '국내힙합', value: 5 },
  { label: '댄스', value: 1 },
  { label: '국내R&B', value: 9 },
  { label: '발라드', value: 0 },
  { label: '인디', value: 6 },
  { label: 'OST', value: 23 },
  { label: '국내일렉', value: 2 },
  { label: '국내록', value: 10 },
  { label: '해외힙합', value: 4 },
  { label: '해외일렉', value: 3 },
  { label: '해외R&B', value: 12 },
  { label: '재즈', value: 13 },
  { label: 'J-POP', value: 7},
  { label: '아이돌', value: 16 },
  { label: '해외록', value: 18 },
  { label: '뮤지컬', value: 17 },
  { label: '클래식', value: 11 },
  { label: '뉴에이지', value: 19 },
  { label: '국내포크', value: 20 },
  { label: '해외포크', value: 14 },
  { label: '국악', value: 21 },
  { label: '성인가요/트로트', value: 22 },
  { label: '종교음악', value: 15 },
];

export default function TabTwoScreen() {
  const [id, onChangeId] = React.useState('');
  const [pw, onChangePw] = React.useState('');
  const [pw2, onChangePw2] = React.useState('');
  const [avatar, onChangeAvatar] = React.useState(0);
  const [gender, onChangeGender] = React.useState('');

  const [duplicatePopup, setDuplicatePopup] = React.useState(false);
  const [successPopup, setSuccessPopup] = React.useState(false);
  const [failurePopup, setFailurePopup] = React.useState(false);
  const [failure2Popup, setFailure2Popup] = React.useState(false);
  const [failure3Popup, setFailure3Popup] = React.useState(false);
  const [failure4Popup, setFailure4Popup] = React.useState(false);




  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDup = async (e) => {
    try {
      const response = await fetch(`http://172.10.5.119/polls/user/idcheck/?email=${id}`);
      
      if (response.ok) {
        // Login successful, update user info and navigate to the desired page
        const data = await response.json();
        setDuplicatePopup(true);
        // status 값 200이면 가능 501이면 중복 
        if (data.status === 200){
          console.log("성공");
          setDuplicatePopup(false);
          setSuccessPopup(true);
        }
        else if(data.status===501){
          console.log("중복");
          setDuplicatePopup(true); 
          setSuccessPopup(false); 
        }
      } else {
        console.log("실패");
        // Login failed, display failure message
        setFailurePopup(true);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error:', error);
    } // 중복 확인 성공 팝업 설정
  };

  

  const handleRegister = async (e) => {
    // Perform registration logic here
    // console.log("User ID:", id);
    // console.log("Password:", pw);
    // console.log("Confirm Password:", pw2);
    // console.log("Avatar:", avatar);

    e.preventDefault();
    // Perform register logic here, e.g., send email and password to an API for authentication
    // password = password2 이면 로그인 아니면 팝업


    if (pw === pw2 && successPopup === true){
      console.log("Email:", id);
      console.log("Password:", pw);
      //setEmail(email);
      onChangePw(pw);
      if (failure3Popup){
          
      }
      else{
        try {
          
          const user = {
            email: id,
            password: pw,
            avatar: avatar,
            gender: gender,
          }
          console.log(user)
          const response = await fetch('http://172.10.5.119/polls/register/', {
            method:'POST',
            body: JSON.stringify(user)
          });
          const data = await response.json()
          console.log(data.status)
          if (data.status === 200) {
            // setSuccessPopup(true);
            console.log("회원 등록 성공")
          } else {
            //setFailurePopup(true);
            setFailure4Popup(true);
            console.log("회원 등록 실패")
          }
        } catch (error) {
          console.log(error);
          // setFailurePopup(true);
          setFailure4Popup(true);
        }
      }
      //api 보내기

      
    } else if(pw !== pw2 && successPopup === true){
      setFailurePopup(true);
      setFailure2Popup(false);
    } else if(pw === pw2 && successPopup !== true){
      setFailurePopup(false);
      setFailure2Popup(true);
    } else{
      setFailurePopup(true);
      setFailure2Popup(true);
    }

  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <LinearGradient colors={['#FFE7E7', '#FE99BB']} style={styles.container}>
        <Text style={styles.title}>! Sign Up !</Text>
        <Text style={styles.stitle}> 회원가입을 위해 정보를 입력해주세요. </Text>
        <ScrollView>
          {/* Failure Popup Messages */}
          {failure4Popup && <Text style={styles.failureMessage}>* 내부적인 문제로 회원 정보 등록에 실패했습니다.</Text>}
          {failure3Popup && <Text style={styles.failureMessage}>* 조건에 맞는 비밀번호를 입력해주세요.</Text>}
          {failure2Popup && <Text style={styles.failureMessage}>* 이메일 중복 확인을 한 후 제출 버튼을 눌러주세요.</Text>}
          {failurePopup && <Text style={styles.failureMessage}>* 비밀번호와 비밀번호 확인이 일치하지 않습니다.</Text>}
        <Text style={styles.subtitle}>♫ Email:</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.sinput}
              onChangeText={onChangeId}
              value={id}
              placeholder="이메일"
            />
            <TouchableOpacity style={styles.dupButton} onPress={handleDup}>
              <Text style={styles.buttonText}>중복 체크</Text>
            </TouchableOpacity>
            
          </View>
          {duplicatePopup && <Text style={styles.failureMessage}>* 중복된 이메일입니다.</Text>} 
          {successPopup && <Text style={styles.failureMessage}>* 성공했습니다.</Text>} 
          
          <Text style={styles.subtitle}>♫ 성별:</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect 
              style={styles.picker}
              onValueChange={(gender) => onChangeGender(gender)}
              items={[
                { label: '남', value: '남' },
                { label: '여', value: '여' },
              ]}
            />
          </View>
          
          <Text style={styles.subtitle}>♫ PW:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePw}
            value={pw}
            placeholder="비밀번호"
            secureTextEntry={true}
            
          />
          <Text style={styles.subtitle}>♫ Confirm PW:</Text>
          <TextInput
            style={[styles.input, { color: '#000000' }]}
            onChangeText={onChangePw2}
            value={pw2}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
          />
          <Text style={styles.subtitle}>♫ Favorite Genre:</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect 
              style={styles.picker}
              onValueChange={(avatar) => onChangeAvatar(avatar)}
              items={[
                { label: 'POP', value: 8 },
                { label: '국내힙합', value: 5 },
                { label: '댄스', value: 1 },
                { label: '국내R&B', value: 9 },
                { label: '발라드', value: 0 },
                { label: '인디', value: 6 },
                { label: 'OST', value: 23 },
                { label: '국내일렉', value: 2 },
                { label: '국내록', value: 10 },
                { label: '해외힙합', value: 4 },
                { label: '해외일렉', value: 3 },
                { label: '해외R&B', value: 12 },
                { label: '재즈', value: 13 },
                { label: 'J-POP', value: 7},
                { label: '아이돌', value: 16 },
                { label: '해외록', value: 18 },
                { label: '뮤지컬', value: 17 },
                { label: '클래식', value: 11 },
                { label: '뉴에이지', value: 19 },
                { label: '국내포크', value: 20 },
                { label: '해외포크', value: 14 },
                { label: '국악', value: 21 },
                { label: '성인가요/트로트', value: 22 },
                { label: '종교음악', value: 15 },
              ]}
            />
          </View>

          

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
          <View style={styles.separator} lightColor="#fff" darkColor="rgba(255,255,255,0.1)" />

          <TouchableOpacity style={styles.kbutton} onPress={handleKakaoAuth}>
            <Text style={styles.buttonText}>카카오톡으로 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nbutton} onPress={handleNaverAuth}>
            <Text style={styles.buttonText}>네이버로 시작하기</Text>
          </TouchableOpacity>

        </ScrollView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  failureMessage: {
    marginStart:10,
    color: 'red',
    marginBottom: 10,
    fontFamily: 'DOS',
  },
  dupButton:{
    height: 40,
    backgroundColor: '#ee8097',
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    borderWidth: 1,
    textAlignVertical: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    alignItems:'center',
    fontFamily: 'DOS',
    marginEnd: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: '5%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'DOS',
  },
  separator: {
    marginVertical: 20,
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
  sinput: {
    flex: 1,
    marginStart:30,
    marginEnd:10,
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
  stitle: {
    textAlign: 'center',
    marginBottom:20,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'DOS',
  },
  button: {
    flex: 0,
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    textShadowColor: '#fff',
    backgroundColor: '#ee8097',
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    marginStart:30,
    marginEnd:30,
    height: 40,
    borderWidth: 1,
    padding: 20,
    borderRadius: 50,
    fontFamily: 'DOS',
  },
  pickerContainer: {
    marginStart: 30,
    marginEnd: 30,
    height: 40,
    marginBottom:20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 50,
    fontFamily: 'DOS',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',

  },
  kbutton: {
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    backgroundColor: '#F7E600',
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  nbutton: {
    marginStart:30,
    marginEnd:30,
    alignItems: 'center',
    backgroundColor: '#2DB400',
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontFamily: 'DOS',
  },
  
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
