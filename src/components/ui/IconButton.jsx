import React from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { Pressable, StyleSheet } from "react-native"

const IconButton = ({ icon, size, color, onPress }) => {
	return (
		<Pressable
			onPress={onPress}
			style={(pressed) => [s.button, pressed && s.pressed]}>
			<MaterialCommunityIcons name={icon} size={size} color={color} />
		</Pressable>
	)
}

export default IconButton
const s = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
	pressed: {
		opacity: 0.7,
	},
})
