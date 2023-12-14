'use strict'

import { getLoginURI, getAccessToken, setAccessToken } from './auth.js'

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

Snodeify.prototype.getLoginURI = getLoginURI
Snodeify.prototype.getAccessToken = getAccessToken
Snodeify.prototype.setAccessToken = setAccessToken

export default Snodeify
