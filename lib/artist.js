'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType} from "./requests/Request.js";

/**
 * Get Artist
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the artist
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the artist information.
 * @throws {Error} Will throw an error if there's an issue with the API request or response.
 */
export const getArtist = async (accessToken, id) => {
    const response = await WebRequest.builder()
        .withPath(`artists/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Several Artists
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the artists' information.
 * @throws {Error} Will throw an error if there's an issue with the API request or response
 */
export const getSeveralArtists = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('artists')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * The IncludeGroups object contains a list of keywords that will be used to filter the artist albums.
 * @see getArtistAlbums
 * @type {{Compilation: string, Single: string, Album: string, AppearsOn: string}}
 */
export const IncludeGroups = {
    Album: 'album',
    Single: 'single',
    AppearsOn: 'appears_on',
    Compilation: 'compilation'
}

/**
 * Get Artist's Albums
 * Get Spotify catalog information about an artist's albums.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the artist.
 * @param {IncludeGroups | null} includeGroups - An array of keywords that will be used to filter the response. if
 *                              not supplied, the album types will be returned.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit
 *                          to get the next set of items.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the album information.
 * @throws {Error} - Will throw an error if there's an issue with the API request or response.
 */
export const getArtistAlbums = async (accessToken, id, includeGroups= null, market = '', limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`artists/${id}/albums`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            include_groups: includeGroups.join(','),
            market,
            limit,
            offset,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Artist's Top Tracks
 * Get Spotify catalog information about an artist's top tracks by country.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the artist.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the album information.
 * @throws {Error} - Will throw an error if there's an issue with the API request or response.
 */
export const getArtistTopTracks = async (accessToken, id, market) => {
    const response = await WebRequest.builder()
        .withPath(`artists/${id}/albums`)
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
 * Get Artist's Related Artists
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis
 * of the Spotify community's listening history.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the artist.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the artists' information.
 * @throws {Error} - Will throw an error if there's an issue with the API request or response.
 */
export const getArtistRelatedArtists = async (accessToken, id) => {
    const response = await WebRequest.builder()
        .withPath(`artists/${id}/related-artists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}
