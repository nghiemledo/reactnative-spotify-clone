import { useState } from "react";
import { Image } from "tamagui";

const SafeImage = ({ uri, ...props }: any) => {
  const [error, setError] = useState(false);
  const imageUri =
    uri && uri !== "null" ? uri : "https://via.placeholder.com/150";
  return (
    <Image
      {...props}
      source={{ uri: error ? "https://via.placeholder.com/150" : imageUri }}
      onError={() => setError(true)}
    />
  );
};
export default SafeImage;
