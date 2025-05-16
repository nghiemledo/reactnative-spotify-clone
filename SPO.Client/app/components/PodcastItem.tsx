import React from 'react'
import { Text } from 'tamagui'
import { XStack } from 'tamagui'
import SafeImage from './SafeImage'
import { YStack } from 'tamagui'
import { Podcast } from '../types/podcast'
interface PodcastItemProps {
    item: Podcast
}
export const PodcastItem = ({item}: PodcastItemProps) => {
  return (
    <XStack mr="$4" space="$3" py="$2" items="flex-start">
          <SafeImage uri={item.coverImage} width={80} height={80} rounded={8} />
          <YStack flex={1} space="$1">
            <Text color="white" fontWeight="600" fontSize="$5" numberOfLines={2}>
              {item.title}
            </Text>
            <Text color="gray" fontSize="$3" numberOfLines={1}>
              Episode • {item.creator}
            </Text>
            {item.type === "podcast" && (
              <>
                <XStack items="center" space="$2">
                  <Text color="gray" fontSize="$2">
                    {item.description.split("•")[0]}
                  </Text>
                  <Text color="gray" fontSize="$2">
                    •
                  </Text>
                  <Text color="gray" fontSize="$2">
                    {item.description.split("•")[1]}
                  </Text>
                </XStack>
                <Text color="gray" fontSize="$2" numberOfLines={2}>
                  {item.description.split("•").slice(2).join("•")}
                </Text>
              </>
            )}
          </YStack>
        </XStack>
  )
}
