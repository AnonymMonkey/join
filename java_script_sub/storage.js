/* const STORAGE_URL */
const STORAGE_URL = "https://join-38d79-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Store a key-value pair in remote storage.
 * @param {string} key - name for the remote-storage key
 * @param {string} value - name for the remote-storage value
 * @returns
 */
async function setItem(key, value) {
  if (value == null) {
    console.error("Wert ist null, Abbruch");
    return;
  }

  return fetch(`${STORAGE_URL}${key}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((res) => res.json())
    .catch((err) => console.error("Fehler beim Speichern:", err));
}

/**
 * Get a key-value pair from remote storage.
 * @param {string} key - name for the remote-storage key
 * @returns
 */
async function getItem(key) {
  let response = await fetch(STORAGE_URL + key + ".json");
  let responseToJson = await response.json();
  return responseToJson;
}
