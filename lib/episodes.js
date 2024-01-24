'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get Episode
 * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for ths episode.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the episode information.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getEpisode = async (accessToken, id, market= '') => {
    const response = await WebRequest.builder()
        .withPath(`episodes/${id}`)
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
 * Get Several Episode
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} ids - A comma-separated list of the Spotify IDs for the episodes. Maximum: 50 IDs.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of episodes
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralEpisodes = async (accessToken, ids, market = '') => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of episodes allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Episode ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('episodes')
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
 * Get User's Saved Episodes
 * Get a list of the episodes saved in the current Spotify user's library.
 * Note: This Spotify API endpoint is in beta and could change without warning.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first iem to return. Default: 0 (the first item). Use with limit to
 *                          get tge next set of items.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a pages
 *                          of episodes.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserSavedEpisodes = async (accessToken, market= '', limit= 20, offset= 0) => {
    const response = await WebRequest.builder()
        .withPath('me/episodes')
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
 * Save Episodes for Current User
 * Save one or more episodes to the current user's library.
 * Note: This Spotify API endpoint is in beta and could change without warning.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 *
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the status information
 *                          that the episode is saved.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const saveEpisodesForCurrentUser = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of episodes allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Episode ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('me/episodes')
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
 * Remove User's Saved Episodes
 * Remove one or more episodes from the current user's library.
 * Note: This Spotify API endpoint is in beta and could change without warning.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs. Maximum: 50 IDs.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the status information
 *                          that the episode is removed.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const removeUserSavedEpisodes = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of albums allowed.'
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
        .withPath('me/episodes')
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
 * Check User's Saved Episodes
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.
 * Note: This Spotify API endpoint is in beta and could change without warning.
 * @async
 * @param {string} accessToken - The access token for the authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the episodes. Maximum: 50 IDs.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of .
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const checkUserSavedEpisodes = async (accessToken, ids) => {
    if (ids.length > 50) {
        return {
            status: '400',
            message: 'You exceeded the maximum (50) number of episodes allowed.'
        }
    }

    if (ids.length < 1) {
        return {
            status: '400',
            message: 'Episode ID(s) cannot be empty.'
        }
    }

    const idString = ids.join(',')
    const response = await WebRequest.builder()
        .withPath('me/episodes/contain')
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
