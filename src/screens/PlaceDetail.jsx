import React, { useEffect, useState } from "react"
import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native"
import { useTheme } from "../constants/ThemeProvider"
import { fetchPlaceDetails, deletePlace } from "../util/database"
import OutlineButton from "../components/ui/OutlineButton"

const PlaceDetail = ({ route, navigation }) => {
	const [place, setPlace] = useState()
	const { colors } = useTheme()
	const { placeId } = route.params

	useEffect(() => {
		async function loadPlace() {
			try {
				const place = await fetchPlaceDetails(placeId)
				setPlace(place)
				navigation.setOptions({
					title: place.title,
				})
			} catch (error) {
				console.error("Error fetching place details:", error)
			}
		}

		loadPlace()
	}, [placeId])

	const handleDelete = async () => {
		try {
			await deletePlace(placeId)
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

	return (
		<ScrollView>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.imageScrollContainer}>
				{place.imageUris.map((uri, index) => (
					<Image key={index} style={styles.image} source={{ uri }} />
				))}
			</ScrollView>
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={[styles.address, { color: colors.text }]}>
						{place.address}
					</Text>
				</View>
				<OutlineButton
					icon="map"
					onPress={() =>
						navigation.navigate("Map", {
							initialLat: place.location.lat,
							initialLng: place.location.lng,
						})
					}>
					View on Map
				</OutlineButton>
				<OutlineButton icon="trash" onPress={handleDelete}>
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
	imageScrollContainer: {
		height: 200,
	},
	image: {
		width: Dimensions.get("window").width,
		height: "100%",
		resizeMode: "cover",
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
})

export default PlaceDetail
