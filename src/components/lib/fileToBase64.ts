/**
 * Converts a file to a base64 encoded string (without the data URL prefix)
 * @param file - The file to convert
 * @returns Promise resolving to the base64 encoded string
 */
const fileToBase64 = (file: File): Promise<string> =>
	new Promise<string>((resolve, reject) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onload = () => resolve((reader.result as string).split(",")[1]);
	  reader.onerror = (error) => reject(error);
	});
  
  export default fileToBase64;