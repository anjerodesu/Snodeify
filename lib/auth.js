import qs from 'qs'

/**
 * Get a Spotify login URI for the given client ID, client secret, and redirect URI,
 *   scope, response type, and state
 * @params {number} length - The length of the randomly generated string
 * @returns A Spotify Access Token in the form of a string
 */
const generateRandomString = function(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

/**
 * Get a Spotify login URI for the given client ID, client secret, and redirect URI,
 *   scope, response type, and state
 * @returns A Spotify Access Token in the form of a string
 */
export const getLoginURI = function() {
    const state = generateRandomString(16)
    const queryString = qs.stringify({
        response_type: this.responseType,
        client_id: this.clientID,
        scope: this.scopes.join('%20'),
        redirect_uri: this.redirectURL,
        state: this.state
    })

    return this.authEndpoint + queryString
}

/**
 * Get a Spotify access token for the given client ID, client secret, and redirect URI
 * @returns A Spotify Access Token in the form of a string
 */
export const getSpotifyAccessToken = async function() {
    const auth = Buffer.from(`${this.clientID}:${this.clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'redirect_uri': this.redirectURL
        })
    });

    const data = await response.json();
    return data.access_token;
}
