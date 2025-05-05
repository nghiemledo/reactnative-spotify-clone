import React from "react";
import { Text } from "react-native";
import { MotiView } from "moti";

interface TrackInfoProps {
  title: string;
  artist: string;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ title, artist }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "timing", duration: 1000 }}
  >
    <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>{title}</Text>
    <Text style={{ color: "#ccc", fontSize: 16 }}>{artist}</Text>
  </MotiView>
);
