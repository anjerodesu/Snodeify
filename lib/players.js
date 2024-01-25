'use strict'

import * as WebRequest from './requests/WebRequest.js'
import { ContentType, Method, AuthorizationType } from './requests/Request.js'

export const AdditionalTypes = {
    Track: 'track',
    Episode: 'episode'
}

/**
 * Get Playback State
 * Get information about the user's current playback state, including track or episode, progress, and active device.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {AdditionalTypes | null} additionalTypes - A comma-separated list of item types that your client supports besides
 *                          the default track type. Valid types are: track and episode.
 *
 *                          Note: This parameter was introduced to allow existing clients to maintain their current
 *                          behaviour and might be deprecated in the future.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information about playback.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getPlaybackState = async (accessToken, market= '', additionalTypes= null) => {
    const response = await WebRequest.builder()
        .withPath('me/player')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            additional_types: additionalTypes
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Transfer Playback
 * Transfer playback to a new device and optionally begin playback.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - An array containing the ID of the device on which playback should be started/transferred.
 *
    *                      Note: Although an array is accepted, only a single device is currently supported.
 * @param {boolean} play - Ensure playback happens on new device (true). or keep the current playback state (false).
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of  the
 *                          playback.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const transferPlayback = async (accessToken, ids, play = false) => {
    const response = await WebRequest.builder()
        .withPath('me/player')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            device_ids: ids,
            play
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Available Devices
 * Get information about a user's available Spotify Connect devices. Some device models are not supported and will
 * not be listed in the API response.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of devices.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getAvailableDevices = async (accessToken) => {
    const response = await WebRequest.builder()
        .withPath('me/player/devices')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Currently Playing Track
 * Get the object currently being played on the user's Spotify account.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {AdditionalTypes | null} additionalTypes - A comma-separated list of item types that your client supports besides
 *                          the default track type. Valid types are: track and episode.
 *
 *                          Note: This parameter was introduced to allow existing clients to maintain their current
 *                          behaviour and might be deprecated in the future.
 */
export const getCurrentlyPlayingTrack = async (accessToken, market = '', additionalTypes = null) => {
    const response = await WebRequest.builder()
        .withPath('me/player/currently-playing')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            market,
            additional_types: additionalTypes
        })
        .build()
        .fetch()

    return response.json()
}


/**
 * Start/Resume Playback
 * Start a new context or resume current playback on the user's active device.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The ID of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @param {string} contextURI - Spotify URI of the context to play.
 * @param {string[] | null} uris - A JSON array of the Spotify track URIs to play
 * @param {Object | null} offset - Indicates from where in the context playback should start.
 *
 *                          Note: Only available when contextURI corresponds to an album or playlist object
 *                          "position" is zero based and can't be negative.
 * @param {number} positionMS - Integer
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information if the
 *                          playback has started.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const startPlayback = async (accessToken, id, contextURI = '', uris = null, offset = null, positionMS = 0) => {
    const response = await WebRequest.builder()
        .withPath('me/player/play')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            context_uri: contextURI,
            uris,
            offset,
            position_ms: positionMS
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Pause Playback
 * Pause playback on the user's account.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed
 * when you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The ID of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information if the
 *                          playback is paused.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const pausePlayback = async (accessToken, id = '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/pause')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Skip To Next
 * Skips to next track in the user's queue.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const skipToNext = async (accessToken, id= '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/next')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.POST)
        .withQueryParameters({
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Skip To Previous
 * Skips to previous track in the user's queue.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const skipToPrevious = async (accessToken, id= '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/previous')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.POST)
        .withQueryParameters({
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Seek To Position
 * Seeks to the given position in the user's currently playing track.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} positionMS - The position in milliseconds to seek to. Must be a positive number. Passing in
 *                          a position that is greater than the length of the track will cause the player to
 *                          start playing the next song.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const seekToPosition = async (accessToken, positionMS, id= '') => {
    if (positionMS < 1) {
        return {
            status: '400',
            message: '"positionMS" must be a positive number.'
        }
    }

    const response = await WebRequest.builder()
        .withPath('me/player/seek')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            position_ms: positionMS,
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

export const RepeatState = {
    Track: 'track',
    Context: 'context',
    Off: 'off'
}

/**
 * Set Repeat Mode
 * Set the repeat mode for the user's playback.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {RepeatState} state - The player's repeat state.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const setRepeatMode = async (accessToken, state, id= '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/seek')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            state,
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Set Playback Volume
 * Set the volume for the user's current playback device.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} volumePercent - The volume to set. Must be a value from 0 to 100 inclusive.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const setPlaybackVolume = async (accessToken, volumePercent, id= '') => {
    if (volumePercent < 0 || volumePercent > 100) {
        return {
            status: 400,
            message: "Invalid volume percentage. Allowed values are between 0 and 100."
        }
    }

    const response = await WebRequest.builder()
        .withPath('me/player/volume')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            volume_percent: volumePercent,
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Toggle Playback Shuffle
 * Toggle shuffle on or off for user's playback.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {boolean} state - Shuffle user's playback (true) or not (false).
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const togglePlaybackShuffle = async (accessToken, state, id= '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/shuffle')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withQueryParameters({
            state,
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Recently Played Tracks
 * Get tracks from the current user's recently played tracks.
 *
 * Note: Currently doesn't support podcast episodes.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number | null} after - A unix timestamp in milliseconds. Returns all items after (but not including) this
 *                          cursor position. If after is specified, before must not be specified.
 * @param {number | null} before - A unix timestamp in milliseconds. Returns all items before (but not including) this
 *                          cursor position. If before is specified, after must not be  specified.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getRecentlyPlayedTracks = async (accessToken, limit= 20, after= null, before= null) => {
    let queryParams = {}
    if (before != null) {
        queryParams.before = before
        queryParams.after = null
    } else if (after != null) {
        queryParams.before = null
        queryParams.after = after
    }

    const response = await WebRequest.builder()
        .withPath('me/player/shuffle')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            limit,
            ...queryParams
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get the User's Queue
 * Get the list of object that make up the user's queue
 * @async
 * @param accessToken - The access token for authentication with the Spotify API.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserQueue = async (accessToken) => {
    const response = await WebRequest.builder()
        .withPath('me/player/queue')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Add Item to Playback Queue
 * Add an item to the end of the user's current playback queue.
 *
 * Note: This API only works for users who have Spotify Premium. The order of execution is not guaranteed when
 * you use this API with other Player API endpoints.
 * @async
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} uri - The uri of the item to add to the queue. Must be a track or an episode uri.
 * @param {string} id - The id of the device this command is targeting. If not supplied, the user's currently
 *                          active device is the target.
 * @returns {Promise<Object>} - A promise that resolves to the JSON object containing the information of a set
 *                          of genres.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const addItemToPlaybackQueue = async (accessToken, uri, id= '') => {
    const response = await WebRequest.builder()
        .withPath('me/player/queue')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.POST)
        .withQueryParameters({
            uri,
            device_id: id
        })
        .build()
        .fetch()

    return response.json()
}
