import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Slider from "react-native-slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import PlaypauseBtn from "../components/playpauseBtn";

const PlayScreen = ({ route, navigation }) => {
  const { data } = route.params;

  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState("00:00:00");
  const [timeElapsed, setTimeElapsed] = useState("00:00:00");
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const onStartPress = async (e) => {
    setisAlreadyPlay(true);
    setInprogress(true);
    audioRecorderPlayer.startPlayer(data.uri);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(async (e) => {
      if (e.currentPosition === e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      let percent = Math.round(
        (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100
      );
      setTimeElapsed(e.currentPosition);
      setPercent(percent);
      setDuration(e.duration);
    });
  };

  const onPausePress = async (e) => {
    setisAlreadyPlay(false);
    audioRecorderPlayer.pausePlayer();
  };

  return (
    <View>
      {!isAlreadyPlay ? (
        <PlaypauseBtn onpress={() => onStartPress()} icons="play" />
      ) : (
        <PlaypauseBtn onpress={() => onPausePress()} icons="pause" />
      )}
    </View>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
