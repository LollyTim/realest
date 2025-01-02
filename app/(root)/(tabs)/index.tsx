import { Href, Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className=" font-bold text-lg my-10">Welcome to Realest</Text>
      <Link href="/sign-in">Signin</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href={"/properties/1" as Href}>Properties</Link>

    </View>
  );
}
