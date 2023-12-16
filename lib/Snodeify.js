'use strict'

import { getLoginURI, getAccessToken, setAccessToken } from './auth.js'
import { getUserSavedAlbums } from './album.js'

class Snodeify {
    constructor(config) {
        this.redirectURI = config.redirectURI
        this.clientID = config.clientID
        this.clientSecret = config.clientSecret
        this.responseType = config.responseType
        this.scopes = config.scopes
    }

    static withConfig(config) {
        const snodeify = new Snodeify(config)
        return snodeify
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
Snodeify.prototype.getUserSavedAlbums = getUserSavedAlbums

export default Snodeify
