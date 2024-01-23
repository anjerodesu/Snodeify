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

export default Snodeify
