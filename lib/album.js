'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Get Album
 * Get Spotify catalog information for a single album.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the album.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the album information.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAlbum = async function(accessToken, id, market = ''){
    const response = await WebRequest.builder()
        .withPath(`albums/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market
        })
        .build()
        .fetch()

    return response.json();
}

/**
 * Get Several Albums
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {[string]} ids - An array of Spotify Album IDs. Maximum: 20 IDs.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing a list of information
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralAlbums = async function(accessToken, ids, market) {
    if (ids.length > 20) {
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
        .withPath('albums')
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
 * Get Album Tracks
 * Get Spotify catalog information about an album's tracks. Optional parameters can be used to limit the
 * number of tracks returned.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the album.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with
 *                          limit to get the next set of items.
 * @returns {Promise<Object>} A promise that resolved to the JSON object containing the pages of tracks
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAlbumTracks = async function(accessToken, id, market, limit, offset){
    const response = await WebRequest.builder()
        .withPath(`albums/${id}/tracks`)
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
 * Get User's Saved Albums
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item).
 *                          Use with limit to get the next set of items.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<object>} A Promise that resolves to the JSON object containing the list of user saved
 *                          albums.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserSavedAlbums = async function(accessToken, limit = 20, offset = 0, market = '' ) {
    const response = await WebRequest.builder()
        .withPath('me/albums')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset,
            market
        })
        .build()
        .fetch()

    return response.json();
}

/**
 * Save one or more albums to the current user's 'Your Music' library.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - An array of Spotify Album IDs. Maximum: 20 IDs.
 * @returns Promise<Object> - A promise that resolves to the JSON object containing the
 *                          status information that the album is saved.
 * @throws {Error} Will throw an error if there's a networking issue.
 */
export const saveAlbumsForCurrentUser = async function(accessToken, ids){
    if (ids.length > 20) {
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
        .withPath('albums')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            ids: idString,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Remove User's Saved Albums
 * Remove one or more albums from the current user's 'Your Music' library.
 * @async
 * @param {string} accessToken - The access token for the authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
 * @returns {Promise<void>} - A promise that resolves to the JSON object containing the status information
 *                          that album(s) have been removed from the library.
 * @throws {Error} Will throw an error if there's a networking issue.
 */
export const removeUserSavedAlbums = async (accessToken, ids) => {
    if (ids.length > 20) {
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
        .withPath('me/albums')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.DELETE)
        .withQueryParameters({
            ids: idString,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Check User's Saved Albums
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 * @async
 * @param {string} accessToken - The access token for the authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
 * @returns {Promise<void>} - A promise that resolves to the JSON object containing the status information
 *                          that contains an array of booleans.
 * @throws {Error} Will throw an error if there's a networking issue.
 */
export const checkUserSavedAlbums = async (accessToken, ids) => {
    if (ids.length > 20) {
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
        .withPath('me/albums/contains')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: idString,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get New Releases
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player's 'Browse' tab).
 * @async
 * @param {string} accessToken - The access token for the authentication with the Spotify API.
 * @param {string} country - An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of
 *                          returned items to be relevant to a particular country. If omitted, the returned items
 *                          will be relevant to all countries.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit to
 *                          get the next set of items.
 * @returns {Promise<void>} - A promise that resolves to the JSON object containing the status information
 *                          that contains a paged set of albums.
 * @throws {Error} Will throw an error if there's a networking issue.
 */
export const getNewReleases = async (accessToken, country = '', limit= 20, offset= 0) => {
    const response = await WebRequest.builder()
        .withPath('browse/new-releases')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            country,
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}
