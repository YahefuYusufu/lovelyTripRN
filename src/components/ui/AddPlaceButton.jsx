import React from "react"
import IconButton from "./IconButton"
import { useTheme } from "../../constants/ThemeProvider"

const AddPlaceButton = ({ navigation }) => {
	const { colors } = useTheme()

	return (
		<IconButton
			icon="airplane-plus"
			size={28}
			color={colors.gray700}
			onPress={() => navigation.navigate("AddPlace")}
		/>
	)
}

export default AddPlaceButton
