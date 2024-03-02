'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from "./requests/Request.js";

/**
 * Check User's Saved Audiobooks
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} country - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want
 *                          to narrow the list of returned categories to those relevant to a particular country.
 *                          If omitted, the returned items will be globally relevant.
 * @param {string} locale - The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1
 *                          alpha-2 country code, joined by an underscore. Provide this parameter if you want
 *                          the category metadata returned in a particular language.
 *
 *                          Note: if locale is not supplied, or if the specified language is note available,
 *                          all strings will be returned in the Spotify default language (American English).
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit
 *                          to get the next set of items.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a paged
 *                          set of categories.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralBrowseCategories = async (accessToken, country, locale, limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath('browse/categories')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            country,
            locale,
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Single Browse Category
 * Get a single category used to tag items in Spotify
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify category ID for the category.
 * @param {string} country - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter to ensure
 *                          that the category exists for a particular country.
 * @param {string} locale - The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1
 *                          alpha-2 country code, joined by an underscore. Provide this parameter if you want
 *                          the category metadata returned in a particular language.
 *
 *                          Note: if locale is not supplied, or if the specified language is note available,
 *                          all strings will be returned in the Spotify default language (American English).
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the category information.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSingleBrowseCategory = async (accessToken, id, country, locale) => {
    const response = await WebRequest.builder()
        .withPath(`browse/categories/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            country,
            locale
        })
        .build()
        .fetch()

    return response.json()
}