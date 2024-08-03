import React, { useCallback, useState } from "react"
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Alert,
} from "react-native"
import { useTheme } from "../../constants/ThemeProvider"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import Button from "../ui/Button"
import { Place } from "../../models/place"

const PlaceForm = ({ onCreatePlace }) => {
	const [enteredTitle, setEnteredTitle] = useState("")
	const [selectedImage, setSelectedImage] = useState()
	const [pickedLocation, setPickedLocation] = useState({}) // Initialize as an empty object

	const { colors } = useTheme()

	const changeTitleHandler = (enteredText) => {
		setEnteredTitle(enteredText)
	}

	const TakeImageHandler = (imageUri) => {
		setSelectedImage(imageUri)
	}

	const pickLocationHandler = useCallback((location) => {
		setPickedLocation(location)
	}, [])

	const SavePlaceHandler = () => {
		if (!enteredTitle || !selectedImage) {
			Alert.alert("Missing Information", "Please provide title and image.")
			return
		}

		// Create Place instance, pickedLocation is always an object
		const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
		onCreatePlace(placeData)
		console.log(placeData)
	}

	return (
		<ScrollView style={[styles.form, { backgroundColor: colors.background }]}>
			<View>
				<Text style={[styles.label, { color: colors.primary500 }]}>Form</Text>
				<TextInput
					style={[
						styles.input,
						{
							borderBottomColor: colors.primary700,
							backgroundColor: colors.primary100,
						},
					]}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker onTakeImage={TakeImageHandler} />
			<LocationPicker onPickLocation={pickLocationHandler} />
			<Button onPress={SavePlaceHandler}>Add Place</Button>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomWidth: 2,
	},
})

export default PlaceForm
