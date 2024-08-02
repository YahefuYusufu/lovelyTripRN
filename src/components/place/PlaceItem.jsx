import React from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../constants/ThemeProvider" // Import useTheme

function PlaceItem({ place }) {
	const navigation = useNavigation()
	const { colors } = useTheme() // Get theme colors

	const selectPlaceHandler = () => {
		navigation.navigate("PlaceDetail", { placeId: place.id })
	}

	return (
		<Pressable
			onPress={selectPlaceHandler}
			style={({ pressed }) => [
				styles.item,
				{ backgroundColor: colors.primary500 },
				pressed && styles.pressed,
			]}>
			<Image
				style={[styles.image, { backgroundColor: colors.primary100 }]}
				source={{ uri: place.imageUri }}
			/>
			<View style={styles.info}>
				<Text style={[styles.title, { color: colors.primary100 }]}>
					{place.title}
				</Text>
				<Text style={[styles.address, { color: colors.primary100 }]}>
					{place.address}
				</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "flex-start",
		padding: 10,
		marginVertical: 8,
		borderRadius: 10,
	},
	pressed: {
		opacity: 0.75,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	info: {
		marginLeft: 12,
		flex: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	address: {
		fontSize: 14,
	},
})

export default PlaceItem
