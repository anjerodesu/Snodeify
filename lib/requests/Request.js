'use strict'

import qs from 'qs'

export const ContentType = {
    ApplicationJSON: 'application/json',
    ApplicationURLEncodedForm: 'application/x-www-form-urlencoded'
}

export const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
}

export const AuthorizationType = {
    Basic: 'Basic',
    Bearer: 'Bearer'
}

const filterEmptyString = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([_, value]) => {
        if (typeof value === 'string' || value instanceof String) {
            if (!value || value.trim().length <= 0) {
                return false
            }
        }
        return true
    }));
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

Request.prototype.headers = function() {
    return {
        'Authorization': this.headerParameters.authorization,
        'Content-Type': this.headerParameters.contentType
    }
}

Request.prototype.get = function() {
    return {
        method: Method.GET,
        headers: this.headers()
    }
}

Request.prototype.post = function() {
    return {
        method: Method.POST,
        headers: this.headers(),
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
            options = {
                headers: request.headers()
            }
            break
    }
    this.options = options
    return this
}

Builder.prototype.fetch = async function() {
    return await fetch(this.getFullURI(), this.options)
}

// getter methods
Builder.prototype.getFullURI = function() {
    var params = ''
    if (this.queryParameters != null) {
        const queryParams = filterEmptyString(this.queryParameters)
        params += `?${qs.stringify(queryParams, { skipNulls: true })}`
    }
    return this.baseURI + this.path + params
}

Builder.prototype.getAuthorizationURI = function() {
    const queryString = qs.stringify(this.queryParameters)
    return this.getFullURI() + queryString
}

export const builder = function() {
    return new Builder()
}
