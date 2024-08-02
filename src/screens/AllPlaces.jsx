import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "../constants/ThemeProvider" // Import useTheme
import PlacesList from "../components/place/PlacesList"
import { fetchPlaces } from "../util/database"

function AllPlaces() {
	const [loadedPlaces, setLoadedPlaces] = useState([])
	const [error, setError] = useState(null) // State for error handling
	const isFocused = useIsFocused()
	const { colors } = useTheme() // Get theme colors

	useEffect(() => {
		const loadPlaces = async () => {
			try {
				const places = await fetchPlaces()
				setLoadedPlaces(places)
			} catch (error) {
				console.error("Error fetching places:", error)
				setError("Failed to load places. Please try again later.")
			}
		}

		if (isFocused) {
			loadPlaces()
		}
	}, [isFocused])

	if (error) {
		return (
			<View
				style={[styles.errorContainer, { backgroundColor: colors.primary100 }]}>
				<Text style={[styles.errorText, { color: colors.primary700 }]}>
					{error}
				</Text>
			</View>
		)
	}

	return <PlacesList places={loadedPlaces} />
}

const styles = StyleSheet.create({
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 16,
		fontWeight: "bold",
	},
})

export default AllPlaces
