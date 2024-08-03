import * as SQLite from "expo-sqlite"
import { Place } from "../models/place"

// Helper function to get a database connection
async function getDatabase() {
	const db = await SQLite.openDatabaseAsync("places.db")
	return db
}

export async function init() {
	const db = await SQLite.openDatabaseAsync("places.db")

	await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUris TEXT NOT NULL, -- Changed column name to imageUris
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `)
}

export async function insertPlace(place) {
	const db = await SQLite.openDatabaseAsync("places.db")
	const result = await db.runAsync(
		"INSERT INTO places (title, imageUris, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
		place.title,
		JSON.stringify(place.imageUris), // Store as JSON
		place.address,
		place.location.lat,
		place.location.lng
	)
	return result.lastInsertRowId
}

export async function fetchPlaces() {
	const db = await SQLite.openDatabaseAsync("places.db")
	const allRows = await db.getAllAsync("SELECT * FROM places")
	return allRows.map((row) => ({
		...row,
		imageUris: JSON.parse(row.imageUris), // Parse JSON
	}))
}

export async function fetchPlace(id) {
	const db = await SQLite.openDatabaseAsync("places.db")
	const place = await db.getFirstAsync("SELECT * FROM places WHERE id = ?", id)
	return {
		...place,
		imageUris: JSON.parse(place.imageUris), // Parse JSON
	}
}

// Fetch place details by its ID
export async function fetchPlaceDetails(id) {
	try {
		const db = await getDatabase()
		const placeData = await db.getFirstAsync(
			"SELECT * FROM places WHERE id = ?",
			id
		)

		if (!placeData) {
			throw new Error("Place not found")
		}

		return new Place(
			placeData.title,
			JSON.parse(placeData.imageUris), // Parse JSON
			{
				lat: placeData.lat,
				lng: placeData.lng,
				address: placeData.address,
			},
			placeData.id
		)
	} catch (error) {
		console.error("Error fetching place details:", error)
		throw error
	}
}

// Function to delete a place
export async function deletePlace(id) {
	const db = await SQLite.openDatabaseAsync("places.db")
	await db.runAsync("DELETE FROM places WHERE id = ?", id)
}
