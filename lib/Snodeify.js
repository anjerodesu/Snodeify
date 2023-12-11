import { getLoginURI, getSpotifyAccessToken } from './auth.js'

class Snodeify {
    constructor(config) {
        this.authEndpoint = 'https://accounts.spotify.com/authorize?'
        this.redirectURL = config.redirectURL
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
Snodeify.prototype.getSpotifyAccessToken = getSpotifyAccessToken

export default Snodeify
