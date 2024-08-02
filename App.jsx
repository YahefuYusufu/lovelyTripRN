import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AppLoading from "expo-app-loading"
import { useTheme, ThemeProvider } from "./src/constants/ThemeProvider"
import AllPlaces from "./src/screens/AllPlaces"
import AddPlace from "./src/screens/AddPlace"
import PlaceDetail from "./src/screens/PlaceDetail"
import Map from "./src/screens/Map"
import { init } from "./src/util/database"
import IconButton from "./src/components/ui/IconButton"
import ToggleButton from "./src/components/ui/ToggleButton"

const Stack = createNativeStackNavigator()

function MainApp() {
	const [dbInitialized, setDbInitialized] = useState(false)
	const { colors, isDarkTheme } = useTheme()

	useEffect(() => {
		async function initializeDatabase() {
			try {
				await init()
				setDbInitialized(true)
				console.log("Database initialized successfully")
			} catch (err) {
				console.error("Error initializing database:", err)
			}
		}
		initializeDatabase()
	}, [])

	if (!dbInitialized) {
		return <AppLoading />
	}

	if (!colors) {
		console.error("Colors are undefined. Check your ThemeProvider setup.")
		return null // or some fallback UI
	}

	return (
		<>
			<StatusBar style={isDarkTheme ? "light" : "dark"} />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: colors.primary500 },
						headerTintColor: colors.gray700,
						contentStyle: { backgroundColor: colors.background },
					}}>
					<Stack.Screen
						name="AllPlaces"
						component={AllPlaces}
						options={({ navigation }) => ({
							headerLeft: () => <ToggleButton />,
							headerRight: () => (
								<IconButton
									icon="airplane-plus"
									size={28}
									color={colors.gray700}
									onPress={() => navigation.navigate("AddPlace")}
								/>
							),
						})}
					/>
					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{
							title: "Places I've been....",
						}}
					/>
					<Stack.Screen name="Map" component={Map} />
					<Stack.Screen
						name="PlaceDetail"
						component={PlaceDetail}
						options={{ title: "Loading Place...ls" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	)
}

export default function App() {
	return (
		<ThemeProvider>
			<MainApp />
		</ThemeProvider>
	)
}
