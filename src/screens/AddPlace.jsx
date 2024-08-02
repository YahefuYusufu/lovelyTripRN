import React from "react"
import { Alert } from "react-native" // Import Alert for error handling
import PlaceForm from "../components/place/PlaceForm"
import { insertPlace } from "../util/database"

function AddPlace({ navigation }) {
	const createPlaceHandler = async (place) => {
		try {
			// Attempt to insert the place into the database
			const resultId = await insertPlace(place)
			console.log(`Place added with ID: ${resultId}`)

			// Navigate to the AllPlaces screen
			navigation.navigate("AllPlaces")
		} catch (error) {
			console.error("Error inserting place:", error)

			// Show an alert to the user if there was an error
			Alert.alert(
				"Error",
				"There was an error adding the place. Please try again.",
				[{ text: "OK" }]
			)
		}
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
