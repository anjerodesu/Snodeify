'use strict'

import * as Request from './Request.js'

export const baseURI = 'https://api.spotify.com/v1/'

export const builder = function() {
    return Request.builder().withURI(baseURI)
}
