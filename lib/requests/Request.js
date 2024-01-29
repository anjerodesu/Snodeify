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
    this.builder = builder
}

// getter methods
Request.prototype.getFullURI = function() {
    let params = ''
    if (this.builder.queryParameters != null) {
        const queryParams = filterEmptyString(this.builder.queryParameters)
        params += `?${qs.stringify(queryParams, { skipNulls: true })}`
    }
    return this.builder.baseURI + this.builder.path + params
}

Request.prototype.getAuthorizationURI = function() {
    const queryString = qs.stringify(this.builder.queryParameters)
    return this.getFullURI() + queryString
}

Request.prototype.fetch = async function() {
    let options = {
        method: this.builder.method,
        headers: {
            'Authorization': this.builder.authorization,
            'Content-Type': this.builder.contentType
        }
    }
    if (this.builder.bodyParameters != null && !(this.builder.bodyParameters instanceof URLSearchParams)) {
        const bodyParams = filterEmptyString(this.builder.bodyParameters)
        options = {
            ...options,
            body: bodyParams
        }
    }
    return await fetch(this.getFullURI(), options)
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

Builder.prototype.withBodyParameters = function(parameters) {
    this.bodyParameters = parameters
    return this
}

Builder.prototype.withQueryParameters = function(parameters) {
    this.queryParameters = parameters
    return this
}

Builder.prototype.build = function() {
    return new Request(this)
}

export const builder = function() {
    return new Builder()
}
