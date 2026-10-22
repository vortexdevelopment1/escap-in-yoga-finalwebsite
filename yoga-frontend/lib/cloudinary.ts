const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "l44x18ko";
const FOLDER = "escape_in_yoga";

/**
 * Converts local image path (e.g. '/images/class-hatha.jpg')
 * or bare filename (e.g. 'class-hatha.jpg')
 * into an optimized Cloudinary delivery CDN URL.
 */
export function getCloudinaryUrl(pathOrFilename: string, transformations = "f_auto,q_auto"): string {
  if (!pathOrFilename) return "";
  if (pathOrFilename.startsWith("http://") || pathOrFilename.startsWith("https://")) {
    return pathOrFilename;
  }

  // Strip leading '/images/' or '/'
  let cleanName = pathOrFilename.replace(/^\/?images\//, "").replace(/^\//, "");
  // Keep original extension or fallback to clean
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${FOLDER}/${cleanName}`;
}
