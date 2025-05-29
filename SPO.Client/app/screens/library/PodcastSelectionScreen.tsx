import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Selection } from "../../components/library/Selection";
import { SelectionCard } from "../../components/library/SelectionCard";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useGetPodcastShowsQuery } from "../../services/PodcastService";


const PodcastSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "PodcastSelection">>();
    const { data: podcasts} = useGetPodcastShowsQuery();
  
  return (
    <Selection
      data={podcasts?.data || []}
      title="Choose more podcasts you like."
      navigation={navigation}
      route={route}
      renderItem={(item, index, selected, toggleSelection) => (
        <SelectionCard
          title={item.title}
          image={item.coverImage}
          index={index}
          selected={selected}
          onPress={() => toggleSelection(item.id)}
          isCircular={false}
        />
      )}
      keyExtractor={(item) => item.id}
      getImage={(item) => item.coverImage}
      isCircular={false}
      type="podcast"
    />
  );
};

export default PodcastSelectionScreen;
