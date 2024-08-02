import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"
import { useTheme } from "../../constants/ThemeProvider" // Import useTheme

const Button = ({ onPress, children }) => {
	const { colors } = useTheme() // Get theme colors

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [s.button(colors), pressed && s.pressed]}>
			<Text style={s.text(colors)}>{children}</Text>
		</Pressable>
	)
}

export default Button

const s = StyleSheet.create({
	button: (colors) => ({
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		backgroundColor: colors.primary800, // Use theme color
		elevation: 2,
		shadowColor: "black",
		shadowOpacity: 0.15,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 2,
		borderRadius: 4,
		marginTop: 24,
		height: 50,
	}),
	pressed: {
		opacity: 0.7,
	},
	text: (colors) => ({
		textAlign: "center",
		fontSize: 16, // Adjusted font size for better readability
		fontWeight: "bold",
		color: colors.primary50, // Use theme color
	}),
})
