'use strict'

import qs from 'qs'

export const ContentType = {
    ApplicationJSON: 'application/json',
    ApplicationURLEncodedForm: 'application/x-www-form-urlencoded'
}

export const Method = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE'
}

export const AuthorizationType = {
    Basic: 'Basic',
    Bearer: 'Bearer'
}

const Request = function(builder) {
    if (!builder) {
        throw new Error('Builder is not defined');
    }

    this.headerParameters = {
        authorization: builder.authorization,
        contentType: builder.contentType
    }
    this.bodyParameters = {
        code: builder.code,
        grantType: builder.grantType,
        redirectURI: builder.redirectURI
    }
}

Request.prototype.get = function() {
    return {
        method: Method.GET,
        headers: {
            'Authorization': this.headerParameters.authorization,
            'Content-Type': this.headerParameters.contentType
        }
    }
}

Request.prototype.post = function() {
    return {
        method: Method.POST,
        headers: {
            'Authorization': this.headerParameters.authorization,
            'Content-Type': this.headerParameters.contentType
        },
        body: new URLSearchParams({
            code: this.bodyParameters.code,
            grant_type: this.bodyParameters.grantType,
            redirect_uri: this.bodyParameters.redirectURI
        })
    }
}

const Builder = function() {}

/*
 * Create and setup for the builder object
 */

Builder.prototype.withContentType = function(contentType) {
    this.contentType = contentType
    return this
}

Builder.prototype.withAccessToken = function(accessToken) {
    this.authorization = accessToken
    return this
}

Builder.prototype.withURI = function(baseURI) {
    this.baseURI = baseURI
    return this
}

Builder.prototype.withPath = function(path) {
    this.path = path
    return this
}

Builder.prototype.withMethod = function(method) {
    this.method = method
    return this
}

Builder.prototype.withCode = function(code) {
    this.code = code
    return this
}

Builder.prototype.withGrantType = function(grantType) {
    this.grantType = grantType
    return this
}

Builder.prototype.withRedirectURI = function(redirectURI) {
    this.redirectURI = redirectURI
    return this
}

Builder.prototype.withQueryParameters = function(parameters) {
    this.queryParameters = parameters
    return this
}

Builder.prototype.build = function() {
    const request = new Request(this)

    var options = {}
    switch (this.method) {
        case Method.GET :
            options = request.get()
            break
        case Method.POST :
            options = request.post()
            break

        default :
            break
    }
    this.options = options
    return this
}

Builder.prototype.fetch = async function() {
    console.log(`uri: ${this.baseURI + this.path}, options: ${JSON.stringify(this.options)}`)
    const response = await fetch(this.baseURI + this.path, this.options)
    return response
}

// getter methods
Builder.prototype.getFullURI = function() {
    return this.baseURI + this.path
}

Builder.prototype.getAuthorizationURI = function() {
    const queryString = qs.stringify(this.queryParameters)
    return this.getFullURI() + queryString
}

export const builder = function() {
    return new Builder()
}
