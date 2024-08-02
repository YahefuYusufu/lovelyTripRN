import React, { useCallback, useLayoutEffect, useState } from "react"
import MapView, { Marker } from "react-native-maps"
import { StyleSheet, Alert } from "react-native"
import CustomMarker from "../components/map/CustomMarker"
import IconButton from "../components/ui/IconButton"

const Map = ({ navigation, route }) => {
	const initialLocation = route.params && {
		lat: route.params.initialLat,
		lng: route.params.initialLng,
	}
	const [selectedLocation, setSelectedLocation] = useState(initialLocation)

	const region = {
		latitude: initialLocation ? initialLocation.lat : 37.78,
		longitude: initialLocation ? initialLocation.lng : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	function selectLocationHandler(event) {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude

		setSelectedLocation({ lat: lat, lng: lng })
	}

	/**For that you add a second argument to use callback.
The first argument is to function itself.
The second argument is a dependency array,
just as in use effect.
And then you can add your dependencies here.
And here the dependencies are navigation
and the selected location state.
So whenever the navigation prop or the selected location
state value changes, this function will be recreated.
Otherwise it won't.
And this can help us improve performance a little bit
by avoiding unnecessary rerender cycles */
	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				"No location picked!",
				"You have to pick a location (by tapping on the map) first!"
			)
			return
		}

		navigation.navigate("AddPlace", {
			pickedLat: selectedLocation.lat,
			pickedLng: selectedLocation.lng,
		})
	}, [navigation, selectedLocation])

	useLayoutEffect(() => {
		if (initialLocation) {
			return
		}
		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon="content-save"
					size={24}
					color={tintColor}
					onPress={savePickedLocationHandler}
				/>
			),
		})
	}, [navigation, savePickedLocationHandler, initialLocation])

	return (
		<MapView
			onPress={selectLocationHandler}
			initialRegion={region}
			style={s.map}>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lng,
					}}>
					<CustomMarker name="person-walking-luggage" size={28} color="red" />
				</Marker>
			)}
		</MapView>
	)
}

export default Map

const s = StyleSheet.create({
	map: {
		flex: 1,
	},
})
