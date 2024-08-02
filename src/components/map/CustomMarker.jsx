import { StyleSheet, View } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"

const CustomMarker = ({ name, size, color }) => {
	return (
		<View style={styles.marker}>
			<FontAwesome6 name={name} size={size} color={color} />
		</View>
	)
}

export default CustomMarker
const styles = StyleSheet.create({
	marker: {
		width: 30,
		height: 30,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
})
