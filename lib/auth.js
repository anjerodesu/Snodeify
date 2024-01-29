'use strict'

import * as AuthRequest from './requests/AuthRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Generate a random string
 * @params {number} length - The length of the randomly generated string
 * @returns A Spotify Access Token in the form of a string
 */
const generateRandomString = function(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

/**
 * Generate a basic base64 token using client id and client secret
 * @params {string} clientID - The app's client ID
 * @params {string} clientSecret - The app's client Secret
 * @returns {String} A base64 token
 */
const generateAuthorisationToken = function(clientID, clientSecret) {
    return Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
}

/**
 * Get a Spotify login URI
 * @returns {string} A Spotify authorization URL
 */
export const getLoginURI = function() {
    const state = generateRandomString(16)
    return AuthRequest.builder()
        .withPath('authorize')
        .withQueryParameters({
            response_type: this.responseType,
            client_id: this.clientID,
            scope: this.scopes.join(' '),
            redirect_uri: this.redirectURI,
            state: state
        })
        .build()
        .getAuthorizationURI()
}

/**
 * Get a Spotify access token
 * @params {string} code - The authorization code returned after authorization
 * @returns {string} A Spotify access token
 */
export const getAccessToken = async function(code) {
    const auth = generateAuthorisationToken(this.clientID, this.clientSecret)
    const response = await AuthRequest.builder()
        .withPath('api/token')
        .withAccessToken(`${AuthorizationType.Basic} ${auth}`)
        .withContentType(ContentType.ApplicationURLEncodedForm)
        .withQueryParameters({
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: this.redirectURI
        })
        .withMethod(Method.POST)
        .build()
        .fetch()

    return response.json();
}

export const getRefreshToken = async function(refreshToken) {
    const response = await AuthRequest.builder()
        .withPath('api/token')
        .withContentType(ContentType.ApplicationURLEncodedForm)
        .withQueryParameters({
            client_id: this.clientID,
            grant_type: 'authorization_code',
            refresh_token: refreshToken
        })
        .withMethod(Method.POST)
        .build()
        .fetch()

    return response.json();
}

/**
 * Set a Spotify access token
 * @params {string} accessToken - A Spotify accessToken
 * @returns {string} A Spotify access token
 */
export const setAccessToken = function(accessToken) {
    this.accessToken = accessToken
}
