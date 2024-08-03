import React, { useEffect, useState } from "react"
import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	FlatList,
} from "react-native"
import { useTheme } from "../constants/ThemeProvider"
import { fetchPlaceDetails, deletePlace } from "../util/database"
import OutlineButton from "../components/ui/OutlineButton"

function PlaceDetail({ route, navigation }) {
	const [place, setPlace] = useState(null)
	const { colors } = useTheme()

	function showOnMapHandler() {
		navigation.navigate("Map", {
			initialLat: place.location.lat,
			initialLng: place.location.lng,
		})
	}

	const selectedPlaceId = route.params.placeId
	useEffect(() => {
		async function loadPlace() {
			const place = await fetchPlaceDetails(selectedPlaceId)
			try {
				setPlace(place)
				navigation.setOptions({
					title: place.title,
				})
			} catch (error) {
				console.error("Error fetching place details:", error)
			}
		}

		loadPlace()
	}, [selectedPlaceId])

	const deletePlaceHandler = async () => {
		try {
			await deletePlace(selectedPlaceId)
			navigation.goBack()
		} catch (error) {
			console.error("Error deleting place:", error)
		}
	}

	if (!place) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place details...</Text>
			</View>
		)
	}

	const renderImageItem = ({ item }) => (
		<Image style={styles.image} source={{ uri: item }} />
	)

	return (
		<ScrollView>
			{place.imageUris && place.imageUris.length > 0 ? (
				<FlatList
					data={place.imageUris}
					renderItem={renderImageItem}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.imageList}
				/>
			) : (
				<Text style={[styles.text, { color: colors.text }]}>
					No images available.
				</Text>
			)}
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={[styles.address, { color: colors.text }]}>
						{place.address}
					</Text>
				</View>
				<OutlineButton icon="map" onPress={showOnMapHandler}>
					View on Map
				</OutlineButton>
				<OutlineButton icon="trash" onPress={deletePlaceHandler}>
					Delete Place
				</OutlineButton>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageList: {
		height: 200,
	},
	image: {
		width: 100,
		height: 100,
		marginHorizontal: 5,
		borderRadius: 8,
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	addressContainer: {
		paddingBottom: 20,
	},
	address: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		padding: 20,
	},
})

export default PlaceDetail
