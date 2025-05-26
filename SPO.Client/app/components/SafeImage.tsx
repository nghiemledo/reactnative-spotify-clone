import { useState } from "react";
import { Image } from "tamagui";

const SafeImage = ({ uri, ...props }: any) => {
  const [error, setError] = useState(false);
  const imageUri =
    uri && uri !== "null" ? uri : "https://image-cdn-ak.spotifycdn.com/image/ab67656300005f1f6eefc406626c4c6f14215919";
  return (
    <Image
      {...props}
      source={{ uri: error ? "https://image-cdn-ak.spotifycdn.com/image/ab67656300005f1f6eefc406626c4c6f14215919" : imageUri }}
      onError={() => setError(true)}
    />
  );
};
export default SafeImage;
