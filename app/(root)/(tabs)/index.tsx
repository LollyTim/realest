import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { Href, Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string; }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties
  })


  const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 6,
    },
    skip: true
  })

  const handlecardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  useEffect(() => {
    refetch({
      query: params.query!,
      filter: params.filter!,
      limit: 6,
    })
  }, [params.query, params.filter])



  return (
    <SafeAreaView className=" bg-white h-full">

      <FlatList
        data={properties}
        renderItem={(({ item }) => (
          <Card item={item} onPress={() => handlecardPress(item.$id)} />
        ))}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerClassName=" pb-32"
        columnWrapperClassName=" flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className=" text-primary-300 mt-5" />
          ) : <NoResults />
        }

        ListHeaderComponent={
          <View className=" px-5">
            <View className=" flex flex-row items-center justify-between mt-5">
              <View className=" flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className=" flex flex-col items-start ml-2 justify-center">
                  <Text className=" text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className=" size-6" />

            </View>
            <Search />
            <View className=" my-5">
              <View className=" flex flex-row justify-between items-center">
                <Text className=" text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>

            </View>
            {latestPropertiesLoading ? <ActivityIndicator size="large" className=" text-primary-300 mt-3" /> : !latestProperties || latestProperties.length === 0 ? <NoResults /> :
              <FlatList
                data={latestProperties}
                keyExtractor={(item, index) => item.$id.toString()}
                horizontal
                renderItem={({ item, index }) => <FeaturedCard key={index} item={item} onPress={() => handlecardPress(item.$id)} />}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-5 mt-5"
              // columnWrapperClassName=" flex gap-5 px-5"
              />}

            <View className=" my-5">
              <View className=" flex flex-row justify-between items-center">
                <Text className=" text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
              <Filters />

            </View>


          </View>
        }
      />

    </SafeAreaView>
  );
}
