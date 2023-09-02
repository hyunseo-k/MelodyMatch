import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, KeyboardEvent, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

import { Text, View } from '../../components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { v4 as uuidv4 } from 'uuid';

interface Track {
  id: string;
  name: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
  };
}

export default function PlaylistScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const handleSearch = async () => {
    const apiKey = 'df605a4b5c32e0cfbdbc4ea8ba9d2eeb'; // Last.fm API 키를 입력하세요
    const searchText = searchQuery.trim();

    console.log(searchText)

    try {
        let data: any[] = [];

        // 아티스트명으로 검색
        const response1 = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=${apiKey}&artist=${searchText}&format=json`
        );
        const data1 = await response1.json();
        
        console.log(data1)

        if (data1.results && data1.results.artistmatches && data1.results.artistmatches.artist) {
            data = data.concat(data1.results.artistmatches.artist.map(item => ({...item, id: uuidv4()})));
        }

        // 곡명으로 검색
        const response2 = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=${apiKey}&track=${searchText}&format=json`
        );
        const data2 = await response2.json();

        console.log(data2)

        if (data2.results && data2.results.trackmatches && data2.results.trackmatches.track) {
            data = data.concat(data2.results.trackmatches.track.map(item => ({...item, id: uuidv4()})));
        }
      

        setSearchResults(data);
        } catch (error) {
        console.error(error);
        }
    };

  const addToPlaylist = (track: Track) => {
    setPlaylist([...playlist, track]);
  };

  const deleteFromPlaylist = (track: Track) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== track.id);
    setPlaylist(updatedPlaylist);
  };

  const keyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardVisible(true);
  };
  
  const keyboardDidHide = (event: KeyboardEvent) => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const screenWidth = Dimensions.get('window').width;
  const maxTextWidth = screenWidth * 0.8;

  const renderSongItem = ({ item }: { item: Track }) => (
    <View style={styles.songItem}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column', flex: 1, marginRight: 10, flexShrink: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text 
              style={[styles.songText, {width: maxTextWidth}]} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {`${item.name} - ${item.artist && item.artist}`}
            </Text>
          </View>
          {item.album && item.album.title && (
            <Text style={styles.songText} numberOfLines={1} ellipsizeMode="tail">
              {item.album.title}
            </Text>
          )}
        </View>
        {playlist.includes(item) ? (
          <TouchableOpacity style={styles.button} onPress={() => deleteFromPlaylist(item)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => addToPlaylist(item)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
  



  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
      <View style={styles.container}>
        <LinearGradient colors={['#FFE7E7', '#FE99BB']} style={styles.container}>
          <Text style={styles.title}>~ Playlist ~</Text>
          {/* 검색 입력란 */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for music"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {/* 검색 버튼 */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* 내 플레이리스트 */}
          <Text style={styles.searchResultsTitle}>My Playlist</Text>
          {<ScrollView style={styles.playlistContainer}>
            <FlatList
              data={playlist}
              renderItem={renderSongItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              style={styles.playlist}
            />
          </ScrollView>}

          {/* 검색 결과 */}
          <Text style={styles.playlistTitle}>Search Results</Text>
          <ScrollView style={styles.searchResults}>
            {searchResults.map((item) => (
                <View key={item.id} style={styles.songItem}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'column', flex: 1, marginRight: 10, paddingRight: 10}}>
                  <Text style={styles.songText} numberOfLines={1} ellipsizeMode="tail">{item.name} - {item.artist}</Text>
                    {item.artist && item.artist.name && <Text style={styles.songText} numberOfLines={1} ellipsizeMode="tail">{item.artist.name}</Text>}
                    {item.album && item.album.title && <Text style={styles.songText} numberOfLines={1} ellipsizeMode="tail">{item.album.title}</Text>}
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    {playlist.includes(item) ? (
                      <TouchableOpacity style={styles.button} onPress={() => deleteFromPlaylist(item)}>
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.button} onPress={() => addToPlaylist(item)}>
                        <Text style={styles.buttonText}>Add</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              
            ))}
          </ScrollView>


        </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'DOS',
    marginTop: 20,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'DOS',
    marginStart: 10
  },
  searchResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    fontFamily: 'DOS',
    marginStart: 10
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,

    margin: 10,
  },
  searchButton: {
    height: 40,
    backgroundColor: '#ee8097',
    padding: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'DOS',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  playlist: {
    marginTop: 10,
    maxHeight: 200,
  },
  searchResults: {
    flex:1,
    marginTop: 10,
    height:10,
    overflow:'hidden',
    width:'100%'
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontFamily: 'DOS',
  },  
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    margin: 20,
    alignItems:'center'
  },
  searchResultsContent: {
    flexGrow: 1,
    maxHeight:10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  playlistContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
  songText: {
    flex: 1,
    width: '100%', // or any value you want to limit the width to
    overflow: 'hidden',
  },  
});