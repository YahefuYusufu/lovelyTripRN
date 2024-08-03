import React, { useCallback, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useTheme } from "../../constants/ThemeProvider"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import Button from "../ui/Button"
import { Place } from "../../models/place"

const PlaceForm = ({ onCreatePlace }) => {
	const [enteredTitle, setEnteredTitle] = useState("")
	const [selectedImages, setSelectedImages] = useState([])
	const [pickedLocation, setPickedLocation] = useState()

	const { colors } = useTheme()

	const changeTitleHandler = (enteredText) => {
		setEnteredTitle(enteredText)
	}

	const addImageHandler = (imageUri) => {
		setSelectedImages((currentImages) => [...currentImages, imageUri])
	}

	const pickLocationHandler = useCallback((location) => {
		setPickedLocation(location)
	}, [])

	const savePlaceHandler = () => {
		const placeData = new Place(enteredTitle, selectedImages, pickedLocation)
		onCreatePlace(placeData)
	}

	return (
		<ScrollView
			style={[styles.form, { backgroundColor: colors.background }]}
			contentContainerStyle={{ paddingBottom: 20 }}>
			<View style={styles.inputContainer}>
				<Text style={[styles.label, { color: colors.text }]}>City Name</Text>
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
					placeholder="Enter city name..."
					placeholderTextColor={colors.primary500}
				/>
			</View>
			<ImagePicker onTakeImage={addImageHandler} />
			<LocationPicker onPickLocation={pickLocationHandler} />
			<View style={styles.buttonContainer}>
				<Button onPress={savePlaceHandler}>Add Place</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	inputContainer: {
		marginBottom: 16,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 8,
		fontSize: 18,
	},
	input: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomWidth: 2,
		borderRadius: 6,
	},
	buttonContainer: {
		marginTop: 20,
	},
})

export default PlaceForm
