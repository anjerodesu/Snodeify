'use strict'

import * as Request from './Request.js'

export const baseURI = 'https://accounts.spotify.com/'

export const builder = function() {
    return Request.builder().withURI(baseURI)
}
