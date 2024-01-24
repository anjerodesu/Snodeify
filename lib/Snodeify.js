'use strict'

import {getAccessToken, getLoginURI, setAccessToken} from './auth.js'
import {
    checkUserSavedAlbums,
    getAlbum,
    getAlbumTracks,
    getNewReleases,
    getSeveralAlbums,
    getUserSavedAlbums,
    removeUserSavedAlbums,
    saveAlbumsForCurrentUser
} from './album.js'
import {getArtist, getArtistAlbums, getArtistRelatedArtists, getArtistTopTracks, getSeveralArtists} from "./artist.js";
import {
    checkUserSavedAudiobooks,
    getAudiobook,
    getAudiobookChapters,
    getSeveralAudiobooks,
    getUserSavedAudiobooks, removeUserSavedAudiobooks,
    saveAudiobooksForCurrentUser
} from "./audiobook.js";
import {getSeveralBrowseCategories, getSingleBrowseCategory} from "./categories.js";
import {getChapter, getSeveralChapters} from "./chapters.js";
import {
    checkUserSavedEpisodes,
    getEpisode,
    getSeveralEpisodes,
    getUserSavedEpisodes,
    removeUserSavedEpisodes,
    saveEpisodesForCurrentUser
} from "./episodes.js";
import {getAvailableGenreSeeds} from "./genres.js";

class Snodeify {
    constructor(config) {
        this.redirectURI = config.redirectURI
        this.clientID = config.clientID
        this.clientSecret = config.clientSecret
        this.responseType = config.responseType
        this.scopes = config.scopes
    }

    static withConfig(config) {
        return new Snodeify(config)
    }
}

/*
 * Authentication methods
 */
Snodeify.prototype.getLoginURI = getLoginURI
Snodeify.prototype.getAccessToken = getAccessToken
Snodeify.prototype.setAccessToken = setAccessToken

/*
 * Albums methods
 */
Snodeify.prototype.getAlbum = getAlbum
Snodeify.prototype.getSeveralAlbums = getSeveralAlbums
Snodeify.prototype.getAlbumTracks = getAlbumTracks
Snodeify.prototype.getUserSavedAlbums = getUserSavedAlbums
Snodeify.prototype.saveAlbumsForCurrentUser = saveAlbumsForCurrentUser
Snodeify.prototype.removeUserSavedAlbums = removeUserSavedAlbums
Snodeify.prototype.checkUserSavedAlbums = checkUserSavedAlbums
Snodeify.prototype.getNewReleases = getNewReleases

/*
 * Artists methods
 */
Snodeify.prototype.getArtist = getArtist
Snodeify.prototype.getSeveralArtists = getSeveralArtists
Snodeify.prototype.getArtistAlbums = getArtistAlbums
Snodeify.prototype.getArtistTopTracks = getArtistTopTracks
Snodeify.prototype.getArtistRelatedArtists = getArtistRelatedArtists

/*
 * Audiobooks methods
 */
Snodeify.prototype.getAudiobook = getAudiobook
Snodeify.prototype.getSeveralAudiobooks = getSeveralAudiobooks
Snodeify.prototype.getAudiobookChapters = getAudiobookChapters
Snodeify.prototype.getUserSavedAudiobooks = getUserSavedAudiobooks
Snodeify.prototype.saveAudiobooksForCurrentUser = saveAudiobooksForCurrentUser
Snodeify.prototype.removeUserSavedAudiobooks = removeUserSavedAudiobooks
Snodeify.prototype.checkUserSavedAudiobooks = checkUserSavedAudiobooks

/*
 * Categories methods
 */
Snodeify.prototype.getSeveralBrowseCategories = getSeveralBrowseCategories
Snodeify.prototype.getSingleBrowseCategory = getSingleBrowseCategory

/*
 * Chapters methods
 */
Snodeify.prototype.getChapter = getChapter
Snodeify.prototype.getSeveralChapters = getSeveralChapters

/*
 * Episodes methods
 */
Snodeify.prototype.getEpisode = getEpisode
Snodeify.prototype.getSeveralEpisodes = getSeveralEpisodes
Snodeify.prototype.getUserSavedEpisodes = getUserSavedEpisodes
Snodeify.prototype.saveEpisodesForCurrentUser = saveEpisodesForCurrentUser
Snodeify.prototype.removeUserSavedEpisodes = removeUserSavedEpisodes
Snodeify.prototype.checkUserSavedEpisodes = checkUserSavedEpisodes

/*
 * Genres methods
 */
Snodeify.prototype.getAvailableGenreSeeds = getAvailableGenreSeeds

export default Snodeify
