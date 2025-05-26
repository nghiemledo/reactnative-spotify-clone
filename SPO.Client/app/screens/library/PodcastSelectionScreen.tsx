import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Selection } from "../../components/library/Selection";
import { SelectionCard } from "../../components/library/SelectionCard";
import { LibraryStackParamList } from "../../navigation/LibraryNavigator";

type Podcast = {
  id: string;
  title: string;
  creator: string;
  description: string;
  coverImage: string;
  createdAt: string;
  type: string;
};

type PodcastSelectionScreenNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "PodcastSelection"
>;

type PodcastSelectionScreenRouteProp = RouteProp<LibraryStackParamList, "PodcastSelection">;

interface PodcastSelectionScreenProps {
  navigation: PodcastSelectionScreenNavigationProp;
  route: PodcastSelectionScreenRouteProp;
}

const initialPodcasts: Podcast[] = [
  {
    id: "1",
    title: "#28 - người lớn và áp lực 'xây dựng hình ảnh'",
    creator: "Giang cơ Radio",
    description:
      "Dec 1, 2023 • 15min • Minh là Giang, mình là người lớn và mình muốn nói về áp lực 'xây dựng hình ảnh'.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-01T00:00:00Z",
    type: "podcast",
  },
  {
    id: "2",
    title: "#29 - Tự do trong tâm trí",
    creator: "Giang cơ Radio",
    description:
      "Jan 15, 2024 • 20min • Minh là Giang, hôm nay chúng ta nói về tự do và cách tìm kiếm nó trong tâm trí.",
    coverImage:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
    createdAt: "2024-01-15T00:00:00Z",
    type: "podcast",
  },
  {
    id: "3",
    title: "Sống chậm lại, nghĩ khác đi",
    creator: "Sống Tích Cực",
    description:
      "Feb 10, 2024 • 25min • Một hành trình khám phá giá trị của việc sống chậm và suy ngẫm.",
    coverImage:
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg",
    createdAt: "2024-02-10T00:00:00Z",
    type: "podcast",
  },
  {
    id: "4",
    title: "Câu chuyện khởi nghiệp",
    creator: "Startup Vibes",
    description:
      "Mar 5, 2024 • 30min • Những câu chuyện thực tế từ các nhà khởi nghiệp trẻ.",
    coverImage:
      "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
    createdAt: "2024-03-05T00:00:00Z",
    type: "podcast",
  },
];

export default function PodcastSelectionScreen({
  navigation,
  route,
}: PodcastSelectionScreenProps) {
  return (
    <Selection
      data={initialPodcasts}
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
}