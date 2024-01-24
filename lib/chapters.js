'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get a Chapter
 * Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the
 * US, UK, Canada, Ireland, New Zealand, and Australia markets.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the chapter.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @return {Promise<Object>} - A Promise that resolves to the JSON object containing the information of the
 *                          chapter
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getChapter = async (accessToken, id, market) => {
    const response = await WebRequest.builder()
        .withPath(`chapters/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Several Chapters
 * Get Spotify catalog information for several audiobook chapters identified by their Spotify ID. Chapters are
 * only available within the US, UK, Canada, Ireland, New Zealand, and Australia markets.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A Promise that resolves to the JSON object containing the information of a set
 *                          of chapters.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralChapters = async (accessToken, ids, market = '') => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of categories allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Category ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('chapters')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: idString,
            market
        })

    return response.json()
}
