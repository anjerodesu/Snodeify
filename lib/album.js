'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

/**
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
 * @throws {Error} - Will throw an error if there's a networking issue.
 * @returns {Promise<object>} A Promise that resolves to the JSON object containing the album information.
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
