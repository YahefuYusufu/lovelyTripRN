import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../constants/ThemeProvider" // Import useTheme

const OutlineButton = ({ onPress, icon, children }) => {
	const { colors } = useTheme() // Get theme colors

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				{ borderColor: colors.primary500 },
				pressed && styles.pressed,
			]}>
			<Ionicons
				name={icon}
				size={18}
				color={colors.primary500}
				style={styles.icon}
			/>
			<Text style={[styles.text, { color: colors.primary500 }]}>
				{children}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		margin: 4,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	pressed: {
		opacity: 0.7,
	},
	icon: {
		marginRight: 6,
	},
	text: {},
})

export default OutlineButton
