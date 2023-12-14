'use strict'

import * as AuthRequest from './requests/AuthRequest.js'
import { Method, AuthorizationType } from './requests/Request.js'

/**
 * Generate a random string using alphanumerics
 *   scope, response type, and state
 * @params {number} length - The length of the randomly generated string
 * @returns A Spotify Access Token in the form of a string
 */
const generateRandomString = function(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const generateAuthorisationToken = function(clientID, clientSecret) {
    return Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
}

/**
 * Get a Spotify login URI for the given client ID, client secret, and redirect URI,
 *   scope, response type, and state
 * @returns A Spotify Access Token in the form of a string
 */
export const getLoginURI = function() {
    const state = generateRandomString(16)
    return AuthRequest.builder()
        .withPath('authorize?')
        .withQueryParameters({
            response_type: this.responseType,
            client_id: this.clientID,
            scope: this.scopes.join('%20'),
            redirect_uri: this.redirectURI,
            state: state
        })
        .getAuthorizationURI()
}

/**
 * Get a Spotify access token for the given client ID, client secret, and redirect URI
 * @params {string} code - The authorization code returned after authorization
 * @returns A Spotify Access Token in the form of a string
 */
export const getAccessToken = async function(code) {
    const auth = generateAuthorisationToken(this.clientID, this.clientSecret)
    const response = await AuthRequest.builder()
        .withPath('api/token')
        .withAccessToken(`${AuthorizationType.Basic} ${auth}`)
        .applicationURLEncodedForm()
        .withCode(code)
        .withGrantType('client_credentials')
        .withRedirectURI(this.redirectURI)
        .withMethod(Method.POST)
        .build()
        .fetch()

    const data = await response.json();
    return data.access_token;
}

export const setAccessToken = function(accessToken) {
    this.accessToken = accessToken
}
