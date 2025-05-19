import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Selection } from "../../components/library/Selection";
import { SelectionCard } from "../../components/library/SelectionCard";
import { useGetArtistsQuery } from "../../services/ArtistService";
import { Artist } from "../../types/artist";
import { Text } from "tamagui";

type ArtistScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ArtistSelection"
>;

type ArtistScreenRouteProp = RouteProp<RootStackParamList, "ArtistSelection">;

interface ArtistSelectionScreenProps {
  navigation: ArtistScreenNavigationProp;
  route: ArtistScreenRouteProp;
}

export default function ArtistSelectionScreen({
  navigation,
  route,
}: ArtistSelectionScreenProps) {
  const { data: artists, isLoading, error } = useGetArtistsQuery();

  if (isLoading) return <Text color="white">Loading...</Text>;
  if (error) return <Text color="white">Error loading artists</Text>;

  return (
    <Selection
      data={artists?.data || []}
      title="Choose more artists you like."
      navigation={navigation}
      route={route}
      renderItem={(item: Artist, index, selected, toggleSelection) => (
        <SelectionCard
          title={item.name}
          image={item.urlAvatar}
          index={index}
          selected={selected}
          onPress={() => toggleSelection(item.id)}
          isCircular={true}
        />
      )}
      keyExtractor={(item) => item.id}
      getImage={(item) => item.urlAvatar}
      isCircular={true}
      type="artist"
    />
  );
}