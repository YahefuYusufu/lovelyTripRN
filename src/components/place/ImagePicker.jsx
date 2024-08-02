import React, { useState } from "react"
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker"
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../constants/ThemeProvider" // Import useTheme
import OutlineButton from "../ui/OutlineButton"

function ImagePicker({ onTakeImage }) {
	const [pickedImage, setPickedImage] = useState(null)
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions()
	const { colors } = useTheme() // Get theme colors

	async function verifyPermissions() {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission()
			return permissionResponse.granted
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app."
			)
			return false
		}

		return true
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermissions()
		if (!hasPermission) {
			return
		}

		try {
			const result = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			})

			if (!result.canceled) {
				const imageUri = result.assets[0].uri
				setPickedImage(imageUri)
				onTakeImage(imageUri)
			} else {
				console.log("Image capture was cancelled.")
			}
		} catch (error) {
			console.error("Error taking image:", error)
			Alert.alert("Error", "Something went wrong while taking the image.")
		}
	}

	let imagePreview = (
		<Text style={[styles.text, { color: colors.text }]}>
			No image taken yet.
		</Text>
	)
	if (pickedImage) {
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
	}

	return (
		<View>
			<View
				style={[styles.imagePreview, { backgroundColor: colors.primary100 }]}>
				{imagePreview}
			</View>
			<OutlineButton icon="camera" onPress={takeImageHandler}>
				Take Image
			</OutlineButton>
		</View>
	)
}

export default ImagePicker

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
})
