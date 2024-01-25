'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get Available Markets
 * Get the list of markets where Spotify is available
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a
 *                              markets object with an array of country codes.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAvailableMarkets = async (accessToken) => {
    const response = await WebRequest.builder()
        .withPath('markets')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}