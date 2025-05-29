import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Selection } from "../../components/library/Selection";
import { SelectionCard } from "../../components/library/SelectionCard";
import { useGetArtistsQuery } from "../../services/ArtistService";
import { Artist } from "../../types/artist";
import { Text } from "tamagui";
import { RootStackParamList } from "../../navigation/AppNavigator";

const ArtistSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "ArtistSelection">>();
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
};

export default ArtistSelectionScreen;