import React from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons" // Or another icon library
import { useTheme } from "../../constants/ThemeProvider"

const ToggleButton = () => {
	const { isDarkTheme, toggleTheme } = useTheme()
	const opacity = new Animated.Value(1)

	const handlePress = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			toggleTheme()
			Animated.timing(opacity, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start()
		})
	}

	return (
		<View style={styles.container}>
			<Animated.View style={{ opacity }}>
				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: isDarkTheme ? "#333" : "#ddd" },
					]}
					onPress={handlePress}>
					<Ionicons
						name={isDarkTheme ? "moon" : "sunny"}
						size={24}
						color={isDarkTheme ? "#fff" : "#000"}
					/>
				</TouchableOpacity>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	button: {
		padding: 5,
		borderRadius: 30,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
})

export default ToggleButton
