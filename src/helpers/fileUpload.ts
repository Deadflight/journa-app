import React from "react";

export const fileUpload = async (file: File): Promise<string> => {
	if (!file) throw new Error("No file to upload");
	const cloudURL = `https://api.cloudinary.com/v1_1/carlos-dev/upload`;

	const formData = new FormData();

	formData.append("upload_preset", "journal-app");
	formData.append("file", file);

	try {
		const resp = await fetch(cloudURL, {
			method: "POST",
			body: formData,
		});

		if (!resp.ok) throw new Error("Image upload failed");

		const cloudResponse = await resp.json();

		return cloudResponse.secure_url;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
};
