import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { Href, Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {

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
            limit: 20,
        })
    }, [params.query, params.filter])



    return (
        <SafeAreaView className=" bg-white h-full">

            <FlatList
                data={properties}
                renderItem={(({ item, index }) => (
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
                    <View className=" px-3">
                        <View className=" flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back()} className=" flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center ">
                                <Image source={icons.backArrow} className=" size-5" />
                            </TouchableOpacity>

                            <Text className=" text-base font-rubik-medium mr-2 text-black-300"> Search for your dream home </Text>
                            <Image source={icons.bell} className=" size-5" />


                        </View>
                        <Search />
                        <View className=" mt-5 ">
                            <Filters />
                            <Text className=" text-xl font-rubik-bold text-black-300 mt-5">
                                Found {properties?.length} Properties
                            </Text>

                        </View>
                    </View>
                }
            />

        </SafeAreaView>
    );
}
