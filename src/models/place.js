export class Place {
	constructor(title, imageUri, location = {}, id) {
		this.id = id
		this.title = title
		this.imageUri = imageUri

		// Default to 'There is no address' if location.address is not defined
		this.address = location?.address || "There is no address"
		this.location = {
			lat: location?.lat || 0, // Default latitude if location.lat is not provided
			lng: location?.lng || 0, // Default longitude if location.lng is not provided
		}
	}
}
