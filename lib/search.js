'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
 * Search for Item
 *
 * Get Spotify Catalog information about albums, artists, playlists, tracks, shows or episodes that match a
 * keyword string. Audiobooks are only available in the US, UK, Canada, Ireland, New Zealand, and Australia
 * markets.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} query - Your search query. You can narrow down your search using field filters. The
 *                          available filters are album, artist, track, year, upc, tag:hipster, tag:new,
 *                          isrc, and genre. Each field filter only applies to certain result types.
 * @param {string[]} type - a comma-separated list of item types to search across. Search results include
 *                          hits from all the specified item types. For example: q=abacab&type=album,track
 *                          returns both albums and tracks marching "abacab".
 * @param {string} market - An ISO 3166-1 alpha-2 country code or the string from_token. If a country code
 *                          is specified, only content that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first object).
 * @param {string} includeExternal - If include_external=audio is specified, it signals that the client can
 *                          play externally hosted content, and marks the content as playable in the
 *                          response. By default, externally hosted audio content is marked as unplayable
 *                          in the response.
 * @returns {Promise<*>} -  A Promise that resolves to the JSON object containing the information of the
 *                          search results.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const searchForItem = async (accessToken, query, type, market, limit, offset, includeExternal) => {
    const response = await WebRequest.builder()
        .withPath('/search')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            query,
            type,
            market,
            limit,
            offset,
            includeExternal
        })
        .build()
        .fetch()

    return response.json()
}
