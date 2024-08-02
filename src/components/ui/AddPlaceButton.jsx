import React from "react"
import IconButton from "./IconButton" // Import your existing IconButton component
import { useTheme } from "../../constants/ThemeProvider"

const AddPlaceButton = ({ navigation }) => {
	const { colors } = useTheme() // Get colors from the ThemeProvider

	return (
		<IconButton
			icon="airplane-plus" // Icon name or type
			size={28} // Size of the icon
			color={colors.gray700} // Color from theme
			onPress={() => navigation.navigate("AddPlace")} // Navigate to AddPlace screen
		/>
	)
}

export default AddPlaceButton
