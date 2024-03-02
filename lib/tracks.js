
import * as WebRequest from './requests/WebRequest.js'
import { AuthorizationType, ContentType, Method } from './requests/Request.js'

/**
 * Get Track
 *
 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the track.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the track.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getTrack = async (accessToken, id, market) => {
    const response = await WebRequest.builder()
        .withPath(`tracks/${id}`)
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
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of a set of
 *                          tracks.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralTracks = async (accessToken, ids, market) => {
    const response = await WebRequest.builder()
        .withPath('tracks')
        .withAccessToken(`${AuthorizationType.Bearer} ${accessToken}`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: ids.join(','),
            market
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param {number} offset - The index of the first track to return. Default: 0 (the first object). Use with
 *                          limit to get the next set of tracks.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the pages
 *                          of tracks.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getUserSavedTracks = async (accessToken, market, limit = 20, offset = 0) => {
    const response = await WebRequest.builder()
        .withPath('me/tracks')
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
 * Save Tracks for User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the pages
 *                          of tracks.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const saveTracksForCurrentUser = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('me/tracks')
        .withAccessToken(`${AuthorizationType.Bearer} ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.PUT)
        .withBodyParameters({
            ids: ids.join(',')
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the tracks
 *                          removed
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const removeUserSavedTracks = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('me/tracks')
        .withAccessToken(`${AuthorizationType.Bearer} ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.DELETE)
        .withBodyParameters({
            ids: ids.join(',')
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information if the tracks
 *                          are present in array of boolean.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const checkUserSavedTracks = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath('me/tracks/contains')
        .withAccessToken(`${ AuthorizationType.Bearer } ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: ids.join(',')
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Several Track's Audio Features
 *
 * Get audio features for multiple track based on their Spotify IDs.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string[]} ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          track's audio features
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getSeveralTrackAudioFeatures = async (accessToken, ids) => {
    const response = await WebRequest.builder()
        .withPath(`audio-features`)
        .withAccessToken(`${ AuthorizationType.Bearer } ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ids: ids.join(',')
        })
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Track's Audio Features
 *
 * Get audio feature information for a single track identified by its unique Spotify ID.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the track.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          audio features of one track.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getTrackAudioFeatures = async (accessToken, id) => {
    const response = await WebRequest.builder()
        .withPath(`audio-features/${ id }`)
        .withAccessToken(`${ AuthorizationType.Bearer } ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the
 * track's structure and musical content, including rhythm, pitch, and timbre.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {string} id - The Spotify ID for the track.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          audio analysis for one track.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getTrackAudioAnalysis = async (accessToken, id) => {
    const response = await WebRequest.builder()
        .withPath(`audio-analysis/${ id }`)
        .withAccessToken(`${ AuthorizationType.Bearer } ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .build()
        .fetch()

    return response.json()
}

/**
 * Get Recommendations
 *
 * Recommendations are generated based on the available information for a given seed entity and matched against
 * similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks
 * will be returned together with pool size details.
 * For artists and tracks that are very new or obscure there might not be enough data to generate a list of
 * tracks.
 * @param {string} accessToken - The access token for authentication with the Spotify API.
 * @param {Object} options - The options to apply to the recommendations.
 * @param {string[]} options.seed_artists - A comma separated list of Spotify IDs for seed artists. Up to 5
 *                          seed values may be provided in any combination of seed_artists, seed_tracks and
 *                          seed_genres.
 *
 *                          Note: Only required if seed_genres and seed_tracks are not set.
 * @param {string[]} options.seed_genres - A comma separated list of any genres in the set of available genre
 *                          seeds. Up to 5 seed values may be provided in any combination of seed_artists,
 *                          seed_tracks and seed_genres.
 *
 *                          Note: Only required if seed_artists and seed_tracks are not set.
 * @param {string[]} options.seed_tracks - A comma separated list of Spotify IDs for a seed track. Up to 5
 *                          seed values may be provided in any combination of seed_artists, seed_tracks and
 *                          seed_genres.
 *
 *                          Note: Only required if seed_artists and seed_genres are not set.
 * @param {number} options.min_acousticness - For each tunable track attribute, a hard floor on the value of
 *                          the selected track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_acousticness - For each tunable track attribute, a hard ceiling on the value of
 *                          the selected track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_acousticness - For each tunable track attribute, a target value can be provided.
 *                          Track with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} options.min_danceability - For each tunable track attribute, a hard floor on the value of the
 *                          selected track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_danceability - For each tunable track attribute, a hard ceiling on the value of
 *                          the selected track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_danceability - For each tunable track attribute, a target value can be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} options.min_duration_ms - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided.
 * @param {number} options.max_duration_ms - For each tunable track attribute, a hard ceiling on the selected
 *                          track attribute's value can be provided.
 * @param {number} options.target_duration_ms - Target duration of the track (ms).
 * @param {number} options.min_energy - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_energy - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_energy - For each tunable track attribute, a target value can be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} options.min_instrumentalness - For each tunable track attribute, a hard floor on the selected
 *                          track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_instrumentalness - For each tunable track attribute, a hard ceiling on the
 *                          selected track attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_instrumentalness - For each tunable track attribute, a target value may be
 *                          provided. Tracks with the attribute values nearest to the target values will be
 *                          preferred. Range: 0.0 to 1.0.
 * @param {number} options.min_key - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0 to 11.
 * @param {number} options.max_key - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0 to 11.
 * @param {number} options.target_key - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0 to 11.
 * @param {number} options.min_liveness - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_liveness - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_liveness - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} options.min_loudness - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided.
 * @param {number} options.max_loudness - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided.
 * @param {number} options.target_loudness - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 * @param {number} options.min_mode - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0 to 1.
 * @param {number} options.max_mode - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0 to 1.
 * @param {number} options.target_mode - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0 to 1.
 * @param {number} options.min_popularity - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0 to 100.
 * @param {number} options.max_popularity - For each tunable track attribute, a hard ceiling on the selected
 *                          track attribute's value can be provided. Range: 0 to 100.
 * @param {number} options.target_popularity - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0 to 100.
 * @param {number} options.min_speechiness - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_speechiness - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_speechiness - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} options.min_tempo - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided.
 * @param {number} options.max_tempo - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided.
 * @param {number} options.target_tempo - Target tempo (BPM).
 * @param {number} options.min_time_signature - For each tunable track attribute, a hard floor on the selected
 *                          track attribute's value can be provided. Maximum value: 11.
 * @param {number} options.max_time_signature - For each tunable track attribute, a hard ceiling on the selected
 *                          track attribute's value can be provided.
 * @param {number} options.target_time_signature - For each tunable track attribute, a target value may be
 *                          provided. Tracks with the attribute values nearest to the target values will be
 *                          preferred.
 * @param {number} options.min_valence - For each tunable track attribute, a hard floor on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.max_valence - For each tunable track attribute, a hard ceiling on the selected track
 *                          attribute's value can be provided. Range: 0.0 to 1.0.
 * @param {number} options.target_valence - For each tunable track attribute, a target value may be provided.
 *                          Tracks with the attribute values nearest to the target values will be preferred.
 *                          Range: 0.0 to 1.0.
 * @param {number} market - An ISO-3166-1 alpha-2 country code. If a country code is specified, only content
 *                          that is available in that market will be returned.
 *                          If a valid user access token is specified in the request header, the country
 *                          associated with the user account will take priority over this parameter.
 * @param {number} limit - The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 100.
 * @returns {Promise<*>} - A Promise that resolves to the JSON object containing the information of the
 *                          set of recommendations.
 * @throws {Error} - Will throw an error if there's a networking issue.
 */
export const getRecommendations = async (accessToken, options, market, limit) => {
    const response = await WebRequest.builder()
        .withPath('recommendations')
        .withAccessToken(`${ AuthorizationType.Bearer } ${ accessToken }`)
        .withContentType(ContentType.ApplicationJSON)
        .withMethod(Method.GET)
        .withQueryParameters({
            ...options,
            market,
            limit,
        })
        .build()
        .fetch()

    return response.json()
}
