import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { H4, Text } from "tamagui";
import { Spinner } from "tamagui";
import { YStack } from "tamagui";
import { Section } from "../types/section";

export const SectionHelper = ({ item: section }: { item: Section }) => {
  if (section.loading)
    return (
      <YStack items="center" p={4}>
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  if (section.error)
    return (
      <Text color="red" text="center">
        {section.error}
      </Text>
    );
  if (!section.data?.length) return null;

  return (
    <YStack mb="$6">
      <H4 color="white" mb={3}>
        {section.title}
      </H4>
      <FlatList
        data={section.data}
        horizontal={section.type === "horizontal"}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={section.renderItem}
      />
    </YStack>
  );
};
