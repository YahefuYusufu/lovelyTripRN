import React from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../constants/ThemeProvider"

function PlaceItem({ place }) {
	const navigation = useNavigation()
	const { colors } = useTheme()

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
				<Text style={[styles.title, { color: colors.text }]}>
					{place.title}
				</Text>
				{/* <Text style={[styles.address, { color: colors.text }]}>
					{place.address}
				</Text> */}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	item: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		padding: 4,
		marginTop: 10,
		marginHorizontal: 5,
		height: 200,
		borderRadius: 10,
		elevation: 3,
		shadowColor: "white",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		overflow: "hidden",
	},
	pressed: {
		opacity: 0.75,
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 10,
	},
	info: {
		alignItems: "center",
		marginTop: 10,
	},
	title: {
		fontSize: 18,

		fontWeight: "bold",
	},
	address: {
		fontSize: 14,
		marginTop: 5,
	},
})

export default PlaceItem
