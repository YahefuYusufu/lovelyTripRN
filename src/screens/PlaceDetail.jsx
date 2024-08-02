import React, { useEffect, useState } from "react"
import { ScrollView, Image, View, Text, StyleSheet } from "react-native"
import { useTheme } from "../constants/ThemeProvider" // Import useTheme
import { fetchPlaceDetails } from "../util/database"
import OutlineButton from "../components/ui/OutlineButton"

function PlaceDetail({ route, navigation }) {
	const [place, setPlace] = useState()
	const { colors } = useTheme() // Access theme colors

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

	if (!place) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place details...</Text>
			</View>
		)
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: place.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={[styles.address, { color: colors.primary500 }]}>
						{place.address}
					</Text>
				</View>
				<OutlineButton icon="map" onPress={showOnMapHandler}>
					View on Map
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
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
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
