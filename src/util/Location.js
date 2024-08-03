import { GOOGLE_API_KEY } from "@env"

export function getMapPreview(lat, lng) {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`
	return imagePreviewUrl
}

export async function getAddress(lat, lng) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error("Failed to fetch address!")
		}

		const data = await response.json()

		if (data.results.length === 0) {
			throw new Error("No results found for the provided coordinates.")
		}

		const address = data.results[0].formatted_address
		return address
	} catch (error) {
		console.error("Error fetching address:", error)
		throw error
	}
}
