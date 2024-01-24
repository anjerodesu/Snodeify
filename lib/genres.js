'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get Available Genre Seeds
 * Retrieve a list of available genres seed parameter vales for recommendations.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAvailableGenreSeeds = async (accessToken) => {
    const response = await WebRequest.builder()
        .withPath('recommendations/available-genre-seeds')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}
