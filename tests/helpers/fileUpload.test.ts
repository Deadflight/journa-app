import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "carlos-dev",
	api_key: "275982819923822",
	api_secret: "Z7gsAj4no2Ug2ZjLn3Xf1TvNnxY",
	secure: true,
});

describe("Tests for fileUpload.ts", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should", async () => {
		const imageURL =
			"https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";

		const resp = await fetch(imageURL);

		const blob = await resp.blob();
		const file = new File([blob], "photo.jpg");

		const url = await fileUpload(file);

		const urlSegment = url.split("/");

		const imageId = urlSegment[urlSegment.length - 1].replace(".png", "");

		const cloudResp = await cloudinary.api.delete_resources(
			["journal-app/" + imageId],
			{
				resource_type: "image",
			}
		);
		expect(typeof url).toBe("string");
	});
});
