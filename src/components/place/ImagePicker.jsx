import React, { useState } from "react"
import {
	launchCameraAsync,
	launchImageLibraryAsync,
	useCameraPermissions,
	useMediaLibraryPermissions,
	PermissionStatus,
} from "expo-image-picker"
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../constants/ThemeProvider"
import OutlineButton from "../ui/OutlineButton"

function ImagePicker({ onTakeImage }) {
	const [pickedImage, setPickedImage] = useState(null)
	const [cameraPermissionInformation, requestCameraPermission] =
		useCameraPermissions()
	const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] =
		useMediaLibraryPermissions()
	const { colors } = useTheme()

	async function verifyCameraPermissions() {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestCameraPermission()
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

	async function verifyMediaLibraryPermissions() {
		if (
			mediaLibraryPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestMediaLibraryPermission()
			return permissionResponse.granted
		}

		if (mediaLibraryPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant media library permissions to use this app."
			)
			return false
		}

		return true
	}

	async function takeImageHandler() {
		const hasCameraPermission = await verifyCameraPermissions()
		if (!hasCameraPermission) return

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
			}
		} catch (error) {
			console.error("Error taking image:", error)
			Alert.alert("Error", "Something went wrong while taking the image.")
		}
	}

	async function pickImageHandler() {
		const hasLibraryPermission = await verifyMediaLibraryPermissions()
		if (!hasLibraryPermission) return

		try {
			const result = await launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			})

			if (!result.canceled) {
				const imageUri = result.assets[0].uri
				setPickedImage(imageUri)
				onTakeImage(imageUri)
			}
		} catch (error) {
			console.error("Error picking image:", error)
			Alert.alert("Error", "Something went wrong while picking the image.")
		}
	}

	let imagePreview = (
		<Text style={[styles.text, { color: colors.text }]}>
			No image selected yet.
		</Text>
	)
	if (pickedImage) {
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
	}

	return (
		<View style={styles.container}>
			<View
				style={[styles.imagePreview, { backgroundColor: colors.primary100 }]}>
				{imagePreview}
			</View>
			<View style={styles.buttons}>
				<OutlineButton icon="camera" onPress={takeImageHandler}>
					Take Image
				</OutlineButton>
				{/* <OutlineButton icon="image" onPress={pickImageHandler}>
					Pick Image
				</OutlineButton> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
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
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "space-between",
	},
})

export default ImagePicker
