export function getPayloadFromToken(token) {
  try {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
