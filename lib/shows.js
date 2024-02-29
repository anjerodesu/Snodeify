
import * as WebRequest from './requests/WebRequest.js'
import { AuthorizationType, ContentType, Method } from './requests/Request.js'

/**
 * Get Show
 *
 * Get Spotify catalog information for a single show identified by its unique Spotify ID.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {string} id - The Spotify ID for the show.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the show.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getShow = async (accessToken, market, id) => {
    const response = await WebRequest.builder()
        .withPath(`shows/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of a set of
 *                          shows.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralShows = async (accessToken, market, ids) => {
    const response = await WebRequest.builder()
        .withPath('shows')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            ids: ids.join(','),
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Show Episodes
 *
 * Get Spotify catalog information about a show’s episodes. Optional parameters can be used to limit the
 * number of episodes returned.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the show.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of episodes to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first episode to return. Default: 0 (the first object). Use with
 *                          limit to get the next set of episodes.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the pages
 *                          of episodes.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getShowEpisodes = async (accessToken, id, market, limit, offset) => {
    const response = await WebRequest.builder()
        .withPath(`shows/${id}/episodes`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            limit,
            offset,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user’s library. Optional parameters can be used to limit
 * the number of shows returned.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} limit - The maximum number of shows to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first show to return. Default: 0 (the first object). Use with
 *                          limit to get the next set of shows.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          user's saved shows.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserSavedShows = async (accessToken, limit, offset) => {
    const response = await WebRequest.builder()
        .withPath('me/shows')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Save Shows for Current User
 *
 * Save one or more shows to the current Spotify user’s library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          save status.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const saveShowsForCurrentUser = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('me/shows')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            ids: ids.join(','),
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user’s library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.
 * @param {market} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          remove status.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const removeUserSavedShows = async (accessToken, ids, market) => {
    const response = await WebRequest.builder()
        .withPath('me/shows')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.DELETE)
        .withQueryParameters({
            ids: ids.join(','),
            market,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user’s library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          shows in an array of booleans.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const checkUserSavedShows = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('me/shows/contains')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: ids.join(','),
        })
        .build()
        .fetch()

    return response.json()
}
