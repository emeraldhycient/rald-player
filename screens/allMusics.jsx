import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Medialibrary from "expo-media-library";
import DisplayList from "../components/displayList";
import { TextInput } from "react-native-paper";

const AllMusics = () => {
  const [musicFiles, setmusicFiles] = useState([]);

  const getpermission = async () => {
    /*{
  "accessPrivileges": "none",
  "canAskAgain": true,
  "expires": "never",
  "granted": false,
  "status": "undetermined",
}*/
    const permissions = await Medialibrary.getPermissionsAsync();
    if (permissions.granted) {
      getmusicfiles();
    }

    if (!permissions.granted && permissions.canAskAgain) {
      const { status, canAskAgain } =
        await Medialibrary.requestPermissionsAsync();
      if (status === "denied") {
        alert(
          "Permission Denied,pls give permission to access your music files"
        );
      } else if (status === "granted") {
        getmusicfiles();
      }
    }
  };

  const getmusicfiles = async () => {
    const musics = await Medialibrary.getAssetsAsync({
      mediaType: "audio",
    });

    console.log(musics);
    setmusicFiles(musics.assets);
  };

  useEffect(() => {
    getpermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput label="serach music " style={styles.input} mode="flat" />
      <Text style={styles.totalCount}>
        Total Records : {musicFiles.totalCount}
      </Text>
      <ScrollView>
        {musicFiles.map((music) => (
          <DisplayList key={music.id} musics={musicFiles} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllMusics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    backgroundColor: "#000",
  },
  input: {
    borderRadius: 7,
    height: 40,
    backgroundColor: "#c6c6c6",
  },
  totalCount: {
    color: "yellow",
    fontWeight: "bold",
    marginVertical: 10,
  },
});
