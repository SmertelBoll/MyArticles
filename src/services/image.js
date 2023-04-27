function ArrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export const getImageUrlFromBuffer = (contentType, buffer) => {
  if (contentType && buffer) {
    const base64 = ArrayBufferToBase64(buffer);
    return `data:${contentType};base64,${base64}`;
  }
};
