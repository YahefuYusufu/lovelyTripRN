import React, { useState, useEffect } from "react"
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location"
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../constants/ThemeProvider" // Import useTheme
import OutlinedButton from "../ui/OutlineButton"
import { getAddress, getMapPreview } from "../../util/Location"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"

function LocationPicker({ onPickLocation }) {
	const [pickedLocation, setPickedLocation] = useState()
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const route = useRoute()
	const { colors } = useTheme() // Get theme colors

	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions()

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			}
			setPickedLocation(mapPickedLocation)
		}
	}, [route, isFocused])

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
				onPickLocation({ ...pickedLocation, address: address })
			}
		}
		handleLocation()
	}, [pickedLocation, onPickLocation])

	async function verifyPermissions() {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission()
			return permissionResponse.granted
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant location permissions to use this app."
			)
			return false
		}

		return true
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions()
		if (!hasPermission) {
			return
		}

		const location = await getCurrentPositionAsync()
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		})
	}

	function pickOnMapHandler() {
		navigation.navigate("Map")
	}

	let locationPreview = (
		<Text style={{ color: colors.text, fontWeight: "500" }}>
			No location picked yet.
		</Text>
	)

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={[styles.image, { borderRadius: 4 }]}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
			/>
		)
	}

	return (
		<View>
			<View style={[styles.mapPreview, { backgroundColor: colors.primary100 }]}>
				{locationPreview}
			</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	)
}

export default LocationPicker

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
})
