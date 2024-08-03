import React, { useEffect, useState } from "react"
import { ScrollView, Image, View, Text, StyleSheet, Alert } from "react-native"
import { fetchPlaceDetails, fetchPlace, deletePlace } from "../util/database"
import OutlineButton from "../components/ui/OutlineButton"

function PlaceDetail({ route, navigation }) {
	const [place, setPlace] = useState()

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

	const deleteHandler = async () => {
		Alert.alert("Are you sure?", "Do you really want to delete this place?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					try {
						await deletePlace(selectedPlaceId)
						navigation.goBack() // Navigate back after deletion
					} catch (error) {
						console.error("Error deleting place:", error)
						Alert.alert("Error", "Could not delete place.")
					}
				},
			},
		])
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: place.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{place.address}</Text>
				</View>
				<View style={styles.buttons}>
					<OutlineButton icon="map" onPress={showOnMapHandler}>
						View on Map
					</OutlineButton>
					<OutlineButton
						icon="trash"
						onPress={deleteHandler}
						style={styles.deleteButton}>
						Delete
					</OutlineButton>
				</View>
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
	buttons: {
		flexDirection: "row",
	},
	deleteButton: {
		marginLeft: 10,
	},
})

export default PlaceDetail
