import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const DisplayList = ({ musics, navigation }) => {
  const musicFiles = [...new Set(musics)];
  return (
    <>
      {musicFiles.map((music) => (
        <TouchableOpacity
          key={music.id}
          onPress={() => navigation.navigate("playscreen", { data: music })}
        >
          <View style={styles.container}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.banner}
            />
            <View style={{ width: "83%" }}>
              <Text style={styles.filename}>
                {music.filename
                  .replace(".mp3", " ")
                  .replace(".wav", " ")
                  .replace("_NaijaMusic.com.ng", "")}
              </Text>
              <Text style={styles.duration}>{`${(music.duration / 60).toFixed(
                2
              )} mins`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default DisplayList;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 0.4,
    borderBottomColor: "#c4c4c4",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filename: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 5,
  },
  duration: {
    color: "whitesmoke",
  },
  banner: {
    height: 40,
    width: "15%",
    borderRadius: 5,
  },
});
