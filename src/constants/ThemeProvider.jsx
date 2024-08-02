import React, { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import { LightColors, DarkColors } from "./colors"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const systemTheme = useColorScheme() // Detect system theme
	const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === "dark")

	useEffect(() => {
		setIsDarkTheme(systemTheme === "dark")
	}, [systemTheme])

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme)
	}

	const colors = isDarkTheme ? DarkColors : LightColors

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme, colors }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
