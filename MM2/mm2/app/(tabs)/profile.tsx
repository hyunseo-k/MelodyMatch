import { StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../../components/Themed';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const route = useRoute();
  const [profile, setProfile] = useState(null);

  const images = [
    require('../../assets/images/ballad.png'), //0
    require('../../assets/images/dance.png'), //1
    require('../../assets/images/elec.png'), //2
    require('../../assets/images/f_elec.png'), //3
    require('../../assets/images/f_hiphop.png'), //4
    require('../../assets/images/hiphop.png'), //5
    require('../../assets/images/indie.png'), //6
    require('../../assets/images/jpop.png'), //7
    require('../../assets/images/pop.png'), //8
    require('../../assets/images/r&b.png'), //9
    require('../../assets/images/rock.png'), //10
    require('../../assets/images/classic.png'), //11
    require('../../assets/images/f_R&B.png'), //12
    require('../../assets/images/jazz.png'), //13
    require('../../assets/images/f_folk.png'), //14
    require('../../assets/images/religious_music.png'), //15
    require('../../assets/images/idol.png'), //16
    require('../../assets/images/musical.png'), //17
    require('../../assets/images/f_rock.png'), //18
    require('../../assets/images/newage.png'), //19
    require('../../assets/images/folk.png'), //20
    require('../../assets/images/korean.png'), //21
    require('../../assets/images/trot.png'), //22
    require('../../assets/images/ost.png'), //23
  ];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchProfileData()
      .then((response) => {
        setProfile(response);
        console.log(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchProfileData = () => {
    // Simulating an API request and returning a promise with the response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock JSON response
        const jsonResponse = {
          email: 'nubjuk@gmail.com',
          avatar: 1,
          gender: '남',
          age: 23,
          favoriteSongs: ['Tonight - Big Bang', 'Lollipop - 빅뱅, 21', 'Love Song - 빅뱅(Big Bang)'],
          favoriteArtists: ['Big Bang', '빅뱅, 21', '빅뱅(Big Bang)'],
          favoriteGenre: '댄스',
        };
        resolve(jsonResponse);
      }, 1000); // Simulating a delay in the API response
    });
  };

  if (!profile) {
    // Render loading state or placeholder while profile data is being fetched
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFE7E7', '#FE99BB']} style={styles.gradient}>
        <View style={styles.twoRow}>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.avatar} source={images[1]} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>내 프로필</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.subtitle}>좋아하는 음악 장르:</Text>
              <Text style={styles.info}>{profile.favoriteGenre}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.subtitle}>성별:</Text>
              <Text style={styles.info}>{profile.gender}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.subtitle}>나이:</Text>
              <Text style={styles.info}>{profile.age}</Text>
            </View>
          </View>
        </View>

        <View style={styles.other}>
          <View style={styles.songContainer}>
            <Text style={styles.stitle}>좋아하는 노래:</Text>
            {profile.favoriteSongs.map((song, index) => (
              <Text key={index} style={styles.song}>
                {song}
              </Text>
            ))}
          </View>

          <View style={styles.artistContainer}>
            <Text style={styles.stitle}>좋아하는 아티스트:</Text>
            {profile.favoriteArtists.map((artist, index) => (
              <Text key={index} style={styles.artist}>
                {artist}
              </Text>
            ))}
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.stitle}>이메일: </Text>
            <Text style={styles.info}>{profile.email}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    marginTop: 10,
    flex: 1,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    alignItems: 'flex-start',
    marginEnd: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  imageContainer: {
    marginLeft: 0,
  },
  songContainer: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  artistContainer: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  emailContainer: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  stitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    fontFamily: 'DOS',
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'DOS',
  },
  detailsContainer: {
    flex: 2,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 5,
    fontFamily: 'DOS',
  },
  info: {
    fontSize: 16,
    fontFamily: 'DOS',
  },
  song: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'DOS',
  },
  artist: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'DOS',
  },
  genre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'capitalize',
    fontFamily: 'DOS',
  },
  twoRow: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'DOS',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  other: {
    flex: 2,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
});
