import { StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

interface Friend {
  id: number;
  name: string;
  avatar: string; // Updated avatar field to string type
  favoriteSongs: string;
}

export default function FriendsScreen() {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  useEffect(() => {
    fetchFriendList()
      .then((response) => {
        setFriendList(response);
        console.log(response); // Add this line to log the friendList
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchFriendList = () => {
    // Simulating an API request and returning a promise with the response
    return new Promise((resolve) => {
      setTimeout(() => {
        const friendData = [
          {
            id: 4,
            name: 'hyunseo@gmail.com',
            avatar: '4',
            favoriteSongs: 'HIGHEST IN THE ROOM - Travis Scott',
          },
          {
            id: 18,
            name: 'donggyu@gmail.com',
            avatar: '18',
            favoriteSongs: "What I've Done - LINKIN PARK            ",
          },
          {
            id: 6,
            name: 'jinhyeon@gmail.com',
            avatar: '6',
            favoriteSongs: 'May - 스웨덴세탁소                                  ',
          },
          {
            id: 10,
            name: 'taehun@gmail.com',
            avatar: '10',
            favoriteSongs: '사건의 지평선 - 윤하                                   ',
          },
          {
            id: 11,
            name: 'doyoon@gmail.com',
            avatar: 11,
            favoriteSongs: 'Concerto No.1 In D - Paganini                ',
          },
          {
            id: 13,
            name: 'jiyeon@gmail.com',
            avatar: 13,
            favoriteSongs: 'When I Was Your Man - Bruno Mars.     ',
          },
          {
            id: 1,
            name: 'happy@gmail.com',
            avatar: 1,
            favoriteSongs: '으르렁(Growl) - 엑소(EXO)                        ',
          },
        ];
        resolve(friendData);
      }, 1000); // Simulating a delay in the API response
    });
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    return (
      <TouchableOpacity
        style={styles.friendItem}
        onPress={() => handleFriendPress(item)}
      >
        <Image style={styles.avatar} source={images[item.avatar]} />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendSubtitle}>Favorite Songs:</Text>
          <Text style={styles.song}>{item.favoriteSongs}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleFriendPress = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleClosePopup = () => {
    setSelectedFriend(null);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#FFE7E7', '#FE99BB']} style={styles.gradient}>
      <Text style={styles.title}>Friend List</Text>
      <FlatList
        data={friendList.length === 0 ? defaultFriendList : friendList}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  friendInfo: {
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    fontFamily: 'DOS',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    fontFamily: 'DOS',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  flatListContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    fontFamily: 'DOS',
  },
  friendItem: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    marginEnd:10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  friendSubtitle: {
    fontSize: 14,
    marginTop: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
  song: {
    fontSize: 12,
    marginTop: 2,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
  },
});

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

const defaultFriendList = [
  {
    id: 4,
    name: 'hyunseo@gmail.com',
    avatar: 4,
    favoriteSongs: 'HIGHEST IN THE ROOM - Travis Scott',
  },
  {
    id: 18,
    name: 'donggyu@gmail.com',
    avatar: 18,
    favoriteSongs: "What I've Done - LINKIN PARK",
  },
  {
    id: 6,
    name: 'jinhyeon@gmail.com',
    avatar: 6,
    favoriteSongs: 'May - 스웨덴세탁소',
  },
  {
    id: 10,
    name: 'taehun@gmail.com',
    avatar: 10,
    favoriteSongs: '사건의 지평선 - 윤하',
  },
  {
    id: 11,
    name: 'doyoon@gmail.com',
    avatar: 11,
    favoriteSongs: 'Concerto No.1 In D - Paganini',
  },
  {
    id: 13,
    name: 'jiyeon@gmail.com',
    avatar: 13,
    favoriteSongs: 'When I Was Your Man - Bruno Mars',
  },
];
