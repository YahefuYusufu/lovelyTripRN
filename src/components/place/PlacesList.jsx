import React from "react"
import { StyleSheet, FlatList, View, Text } from "react-native"
import { useTheme } from "../../constants/ThemeProvider"
import PlaceItem from "./PlaceItem"

function PlacesList({ places }) {
	const { colors } = useTheme()

	if (!places || places.length === 0) {
		return (
			<View
				style={[
					styles.fallbackContainer,
					{ backgroundColor: colors.background },
				]}>
				<Text style={[styles.fallbackText, { color: colors.primary500 }]}>
					No Places added yet - start exploring somewhere!
				</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <PlaceItem place={item} />}
		/>
	)
}

const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		fontWeight: "bold",
	},
})

export default PlacesList
