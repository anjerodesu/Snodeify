'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'
import { AdditionalTypes } from "./players.js";

/**
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {string} fields - Filters for the query: a comma-separated list of the fields to return. If
 *                          omitted, all fields are returned.
 * @param {AdditionalTypes | null} additionalTypes - A comma-separated list of item types that your client
 *                          supports besides the default 'track' type.
 *
 *                          Note: This parameter was introduced to allow existing clients to maintain their
 *                          current behaviour and might be deprecated in the future.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the playlist information of
 *                          the playlist.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getPlaylist = async (accessToken, id, market = '', fields = '', additionalTypes = null) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            fields,
            additional_types: additionalTypes
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string} name - The new name of the playlist.
 * @param {boolean} visibility - If true tha playlist will be public, if false it will be private.
 * @param {boolean} collaborative - If true, the playlist will become collaborative and other users will
 *                          be able to modify the playlist in their Spotify client.
 *
 *                          Note: You can only set collaborative to true on non-public playlists.
 * @param {string} description - Value for playlist description as displayed in Spotify Clients and in
 *                          the Web API.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the status information
 *                          if the playlist was updated.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const changePlaylistDetails = async (accessToken, id, name, visibility, collaborative, description) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            name,
            public: visibility,
            collaborative,
            description
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {string} fields - Filters for the query: a comma-separated list of the fields to return. If
 *                          omitted, all fields are returned.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first item to return. Default: 0 (the first item). Use with
 *                          limit to get the next set of items.
 * @param {AdditionalTypes | null} additionalTypes - A comma-separated list of item types that your client
 *                          supports besides the default 'track' type.
 *
 *                          Note: This parameter was introduced to allow existing clients to maintain their
 *                          current behaviour and might be deprecated in the future.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of pages
 *                          of the tracks.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getPlaylistItems = async (accessToken, id, market = '', fields = '', limit = 20, offset = 0, additionalTypes = null) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/tracks`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            fields,
            limit,
            offset,
            additional_types: additionalTypes
        })

    return response.json()
}

/**
 * Reorder Playlist Items
 *
 * Reorder items in a playlist depending on the request's parameters.
 *
 * Note: This method is the half part of the Update Playlist Items endpoint. For more information, please
 * visit https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {number} rangeStart - The position of the first item to be reordered.
 * @param {number} insertBefore - The position where the items should be inserted. To reorder the items to
 *                          the end of the playlist, simply set insert_before to the position after the last
 *                          item.
 * @param {number} rangeLength - The amount of items to be reordered. Defaults to 1 if not set. The range
 *                          of items to be reordered begins from the rangeStart position., and includes the
 *                          rangeLength subsequent items.
 * @param {string} snapshotID - The playlist's snapshot ID against which you want to make the changes.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of snapshot
 *                          ID for the playlist
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const reorderPlaylistItems = async (accessToken, id, rangeStart, insertBefore, rangeLength, snapshotID) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/tracks`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            range_start: rangeStart,
            insert_before: insertBefore,
            range_length: rangeLength,
            snapshot_id: snapshotID
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Replace Playlist Items
 *
 * Replace items in a playlist depending on the request's parameters.
 *
 * Note: This method is the half part of the Update Playlist Items endpoint. For more information, please
 * visit https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string[]} uris - An array of Spotify URIs to set, can be track or episode URIs. A maximum of 100
 *                          items can be set in one request.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of snapshot
 *                          ID for the playlist
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const replacePlaylistItems = async (accessToken, id, uris) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/tracks`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            uris
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string[]} uris - An array of Spotify URIs to add. A maximum of 100 items can be set in one
 *                          request.
 * @param {number} position - The position to insert the items, a zero-based index. Default: -1, to append
 *                          items instead.
 *
 *                          Note: Items are added in the order they appear in the uris array.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of snapshot
 *                          ID for the playlist
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const addItemsToPlaylist = async (accessToken, id, uris, position = -1) => {
    let bodyParams = { uris }
    if (position >= 0) {
        bodyParams = {
            ...bodyParams,
            position
        }
    }
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/tracks`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.POST)
        .withBodyParameters({
            bodyParams
        })
        .build()
        .fetch()

    return response.json
}

/**
 * @typedef {string: string} Tracks
 * @prop {string} key "uri"
 * @prop {string} value Spotify URI
 */
/**
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {Tracks[]} tracks - An array of objects containing Spotify URIs of the tracks or episodes to
 *                          remove.
 * @param {string} snapshotID - The playlist's snapshot ID against which you want to make the changes. The
 *                          API will validate that the specified items exist and in the specified positions
 *                          and make the changes, even if more recent changes have been made to the
 *                          playlist.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of snapshot
 *                          ID for the playlist
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const removePlaylistItems = async (accessToken, id, tracks, snapshotID) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/tracks`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.DELETE)
        .withBodyParameters({
            tracks,
            snapshot_id: snapshotID
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Current User's Playlist
 *
 * Get a list of the playlists owned or followed by the current Spotify user.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first playlist to return. Default: 0 (the first object).
 *                          Maximum offset: 100.000. Use with limit to get the next set of playlists.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of snapshot
 *                          ID for the playlist
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getCurrentUserPlaylists = async (accessToken, id, limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`me/playlists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first playlist to return. Default: 0 (the first object).
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of list
 *                          of playlists owned or followed by the current Spotify user.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserPlaylists = async (accessToken, id, limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`users/${id}/playlists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Create Playlist
 *
 * Create a playlist for a Spotify user.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string} name - The name for the new playlist.
 * @param {boolean} hidden - If true the playlist will be public, if false it will be private. Default: true.
 * @param {boolean} collaborative - If true, the playlist will become collaborative. Default: false
 * @param {string} description - Value for playlist description as displayed in Spotify Clients and in the Web API.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                         playlist created.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const createPlaylist = async (accessToken, id, name, hidden, collaborative, description) => {
    const response = await WebRequest.builder()
        .withPath(`users/${id}/playlists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.POST)
        .withBodyParameters({
            name,
            public: !hidden,
            collaborative,
            description
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} locale - The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1
 *                          alpha-2 country code, joined by an underscore. Provide this parameter if you want
 *                          the category metadata returned in a particular language.
 *
 *                          Note: if locale is not supplied, or if the specified language is note available,
 *                          all strings will be returned in the Spotify default language (American English).
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first playlist to return. Default: 0 (the first object).
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                         paged set of playlists.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getFeaturedPlaylists = async (accessToken, locale = '', limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`browse/featured-playlists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            locale,
            limit,
            offset,
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} categoryID - The Spotify category ID for the category.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first playlist to return. Default: 0 (the first object).
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                        paged set of playlists
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getCategoryPlaylists = async (accessToken, categoryID, limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath(`browse/categories/${categoryID}/playlists`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            offset
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                        playlist cover image.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getPlaylistCoverImage = async (accessToken, id) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/images`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID of the playlist.
 * @param {string} imageData - Base64 encoded JPEG image data, maximum payload size is 256 KB.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                       status of the image upload.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const addCustomPlaylistCoverImage = async (accessToken, id, imageData) => {
    const response = await WebRequest.builder()
        .withPath(`playlists/${id}/images`)
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            imageData
        })
        .build()
        .fetch()

    return response.json()
}
