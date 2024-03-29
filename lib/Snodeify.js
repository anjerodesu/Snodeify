'use strict'

import {getAccessToken, getLoginURI, getRefreshToken, setAccessToken} from './auth.js'
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
import {getAvailableMarkets} from "./markets.js";
import {
    addItemToPlaybackQueue,
    getAvailableDevices,
    getCurrentlyPlayingTrack,
    getPlaybackState,
    getRecentlyPlayedTracks, getUserQueue,
    pausePlayback,
    seekToPosition,
    setPlaybackVolume,
    setRepeatMode,
    skipToNext,
    skipToPrevious,
    startPlayback,
    togglePlaybackShuffle,
    transferPlayback
} from "./players.js";
import {
    addCustomPlaylistCoverImage,
    addItemsToPlaylist,
    changePlaylistDetails, createPlaylist, getCategoryPlaylists, getCurrentUserPlaylists, getFeaturedPlaylists,
    getPlaylist, getPlaylistCoverImage,
    getPlaylistItems, getUserPlaylists, removePlaylistItems,
    reorderPlaylistItems,
    replacePlaylistItems
} from './playlists.js'
import { searchForItem } from './search.js'
import {
    checkUserSavedShows,
    getSeveralShows,
    getShow,
    getShowEpisodes,
    getUserSavedShows,
    removeUserSavedShows,
    saveShowsForCurrentUser
} from './shows.js'
import {
    checkUserSavedTracks, getRecommendations, getSeveralTrackAudioFeatures,
    getSeveralTracks,
    getTrack, getTrackAudioAnalysis,
    getTrackAudioFeatures,
    getUserSavedTracks, removeUserSavedTracks,
    saveTracksForCurrentUser
} from './tracks.js'

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
Snodeify.prototype.getRefreshToken = getRefreshToken
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

/*
 * Markets methods
 */
Snodeify.prototype.getAvailableMarkets = getAvailableMarkets

/*
 * Players methods
 */
Snodeify.prototype.getPlaybackState = getPlaybackState
Snodeify.prototype.transferPlayback = transferPlayback
Snodeify.prototype.getAvailableDevices = getAvailableDevices
Snodeify.prototype.getCurrentlyPlayingTrack = getCurrentlyPlayingTrack
Snodeify.prototype.startPlayback = startPlayback
Snodeify.prototype.pausePlayback = pausePlayback
Snodeify.prototype.skipToNext = skipToNext
Snodeify.prototype.skipToPrevious = skipToPrevious
Snodeify.prototype.seekToPosition = seekToPosition
Snodeify.prototype.setRepeatMode = setRepeatMode
Snodeify.prototype.setPlaybackVolume = setPlaybackVolume
Snodeify.prototype.togglePlaybackShuffle = togglePlaybackShuffle
Snodeify.prototype.getRecentlyPlayedTracks = getRecentlyPlayedTracks
Snodeify.prototype.getUserQueue = getUserQueue
Snodeify.prototype.addItemToPlaybackQueue = addItemToPlaybackQueue

/*
 * Playlist methods
 */
Snodeify.prototype.getPlaylist = getPlaylist
Snodeify.prototype.changePlaylistDetails = changePlaylistDetails
Snodeify.prototype.getPlaylistItems = getPlaylistItems
Snodeify.prototype.reorderPlaylistItems = reorderPlaylistItems
Snodeify.prototype.replacePlaylistItems = replacePlaylistItems
Snodeify.prototype.addItemsToPlaylist = addItemsToPlaylist
Snodeify.prototype.removePlaylistItems = removePlaylistItems
Snodeify.prototype.getCurrentUserPlaylists = getCurrentUserPlaylists
Snodeify.prototype.getUserPlaylists = getUserPlaylists
Snodeify.prototype.createPlaylist = createPlaylist
Snodeify.prototype.getFeaturedPlaylists = getFeaturedPlaylists
Snodeify.prototype.getCategoryPlaylists = getCategoryPlaylists
Snodeify.prototype.getPlaylistCoverImage = getPlaylistCoverImage
Snodeify.prototype.addCustomPlaylistCoverImage = addCustomPlaylistCoverImage

/*
 * Search methods
 */
Snodeify.prototype.searchForItem = searchForItem

/*
 * Shows methods
 */
Snodeify.prototype.getShow = getShow
Snodeify.prototype.getSeveralShows = getSeveralShows
Snodeify.prototype.getShowEpisodes = getShowEpisodes
Snodeify.prototype.getUserSavedShows = getUserSavedShows
Snodeify.prototype.saveShowsForCurrentUser = saveShowsForCurrentUser
Snodeify.prototype.removeUserSavedShows = removeUserSavedShows
Snodeify.prototype.checkUserSavedShows = checkUserSavedShows

/*
 * Tracks methods
 */
Snodeify.prototype.getTrack = getTrack
Snodeify.prototype.getSeveralTracks = getSeveralTracks
Snodeify.prototype.getUserSavedTracks = getUserSavedTracks
Snodeify.prototype.saveTracksForCurrentUser = saveTracksForCurrentUser
Snodeify.prototype.removeUserSavedTracks = removeUserSavedTracks
Snodeify.prototype.checkUserSavedTracks = checkUserSavedTracks
Snodeify.prototype.getSeveralTrackAudioFeatures = getSeveralTrackAudioFeatures
Snodeify.prototype.getTrackAudioFeatures = getTrackAudioFeatures
Snodeify.prototype.getTrackAudioAnalysis = getTrackAudioAnalysis
Snodeify.prototype.getRecommendations = getRecommendations

export default Snodeify
