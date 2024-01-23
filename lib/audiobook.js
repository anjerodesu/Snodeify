'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get an Audiobook
 * Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK,
 * Canada, Ireland, New Zealand, and Australia markets.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the audiobook.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the audiobook information.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAudiobook = async (accessToken, id, market) => {
    const response = await WebRequest.builder()
        .withPath(`audiobooks/${id}`)
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
 * Get Several Audiobooks
 * Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are
 * only available within the US, UK, Canada, Ireland, New Zealand, and Australia markets.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the information for a
 *                          set of audiobooks. If one of the requested audiobooks is unavailable then you'll
 *                          find a null item in the audiobooks array where the audiobook object would
 *                          otherwise be.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralAudiobooks = async (accessToken, ids, market) => {

    const response = await WebRequest.builder()
        .withPath('audiobooks')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: idString,
            market
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Audiobook Chapters
 * Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the
 * US, UK, Canada, Ireland, New Zealand, and Australia markets.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the audiobook.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1, Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit
 *                          to get the next set of items.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the information for the
 *                          pages of chapters
 * @throws {Error} - Will throw an error if there;s a networking issue.
 */
export const getAudiobookChapters = async (accessToken, id, market = '', limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`audiobooks/${id}/chapters`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get User's Saved Audiobooks
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit
 *                          to get the next set of items.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the information for the
 *                          pages of audiobooks
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserSavedAudiobooks = async (accessToken, limit= 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath('me/audiobooks')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset
        })
        .build()
        .fetch()
}

/**
 * Save Audiobooks for Current User
 * Save one or more audiobooks to the current Spotify user's library.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the status information
 *                          that the album is saved.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const saveAudiobooksForCurrentUser = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (20) number of albums allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Album ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('me/audiobooks')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            ids: idString
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Remove User's Saved Audiobooks
 * Remove one or more audiobooks from the Spotify user's library.
 * @async
 * @param {string} accessToken - The access token for the authentication with the Spotify API,
 * @param {string[]} ids - A comma-separated list of the Spotify IDs.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the status information
 *                          that the audiobooks have been removed from the library.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const removeUserSavedAudiobooks = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of audiobooks allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Audiobook ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('me/audiobooks')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.DELETE)
        .withQueryParameters({
            ids: idString
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Check User's Saved Audiobooks
 * Check if one or more audiobooks are already saved in the current Spotify user's library
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the status information
 *                          that contains an array of booleans.
 * @throws {Error} Will throw an error if there's a networking issue.
 */
export const checkUserSavedAudiobooks = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of audiobooks allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Audiobook ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('me/audiobooks/contains')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: idString
        })
        .build()
        .fetch()

    return response.json()
}
