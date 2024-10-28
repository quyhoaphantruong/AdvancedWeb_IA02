const UNSPLASH_API_URL = "https://api.unsplash.com";
const ACCESS_KEY = "VEZ-oe4A5S-BLyaIX11Me8bkcN4k29l1Gp_9hc3FlkA";

export const fetchPhotos = async (page = 1, perPage = 5) => {
  const url = `${UNSPLASH_API_URL}/photos?page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch images from Unsplash");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    throw error;
  }
};

export const fetchPhotoDetails = async (id) => {
  const response = await fetch(
    `${UNSPLASH_API_URL}/photos/${id}?client_id=${ACCESS_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch photo details');
  return response.json();
};
