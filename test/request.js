import { expect } from 'chai'
import * as Request from '../lib/requests/Request.js'

describe('Create request', () => {
    it('Should create a request with base uri', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')

        expect(builder.baseURI).to.equal('https://ten.tickles/')
    })

    it('Should create a request with base uri and end point', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.path).to.not.equal('much/wow')
    })

    it('Should create a request with base uri, end point, and content type URL Encoded Form', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationURLEncodedForm)

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/x-www-form-urlencoded')
    })

    it('Should create a request with base uri, end point, and content type JSON', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
    })

    it('Should create a request with base uri, end point, content type, and code', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
    })

    it('Should create a request with base uri, end point, content type, code, and grant type', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')
            .withGrantType('client_credentials')

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
        expect(builder.grantType).to.equal('client_credentials')
    })

    it('Should create a request with base uri, end point, content type, code, grant type, and redirect uri', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')
            .withGrantType('client_credentials')
            .withRedirectURI('https://rick.roll.ed')

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
        expect(builder.grantType).to.equal('client_credentials')
        expect(builder.redirectURI).to.equal('https://rick.roll.ed')
    })

    it('Should create a request with base uri, end point, content type, code, grant type, redirect uri, and method', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')
            .withGrantType('client_credentials')
            .withRedirectURI('https://rick.roll.ed')
            .withMethod(Request.Method.GET)

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
        expect(builder.grantType).to.equal('client_credentials')
        expect(builder.redirectURI).to.equal('https://rick.roll.ed')
        expect(builder.method).to.equal('GET')
    })

    it('Should create a request with base uri, end point, content type, code, grant type, redirect uri, method, and mocked token', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')
            .withGrantType('client_credentials')
            .withRedirectURI('https://rick.roll.ed')
            .withMethod(Request.Method.GET)
            .withAccessToken(`${Request.AuthorizationType.Bearer} A8gBfSbHiAnamvf1_D7Sfdi7YrRYgje3BcW1BDhiVPLFy3VHj3svSEvDSEx3IZCY3ZyIc1-RamGjIJLMd24h6605qCxrkVWeaBzVfP1ejk12V9EzMTdxpoXmr0hxXWEPGL-Vi629_DmkmaHCP4DQjfwnw7pHuF5xhTt0dfrRWQ4mIS_CGS8txPdrnuCC4LqQaH8L3GN8Fsa3BMZyOZ648GKTv5Xx_4wgy3sEKKVUhncBN-a-GwMGAhR4MmkeUHz850aJTHRbGsBc21vS27sYy9K0CdfBJjZEF05X4YUoqFtQKSQUrLzUPX03w0mZEFHHePONyQLSacBVRczNTaMOYFIMPWpaKE6XwuBQYAeP7k-mKehu]pEjX1jz9jAMZEyGuorjT4tRvvVxwWpQaOufrIeHThS95F3qYGD77MoxzjDswiUyMUIGzZ96NrNjJv15z6WIXM6S2051A6D6YwivVZfT]G2eFnv8Tol`)

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
        expect(builder.grantType).to.equal('client_credentials')
        expect(builder.redirectURI).to.equal('https://rick.roll.ed')
        expect(builder.method).to.equal('GET')
        expect(builder.authorization).to.equal('Bearer A8gBfSbHiAnamvf1_D7Sfdi7YrRYgje3BcW1BDhiVPLFy3VHj3svSEvDSEx3IZCY3ZyIc1-RamGjIJLMd24h6605qCxrkVWeaBzVfP1ejk12V9EzMTdxpoXmr0hxXWEPGL-Vi629_DmkmaHCP4DQjfwnw7pHuF5xhTt0dfrRWQ4mIS_CGS8txPdrnuCC4LqQaH8L3GN8Fsa3BMZyOZ648GKTv5Xx_4wgy3sEKKVUhncBN-a-GwMGAhR4MmkeUHz850aJTHRbGsBc21vS27sYy9K0CdfBJjZEF05X4YUoqFtQKSQUrLzUPX03w0mZEFHHePONyQLSacBVRczNTaMOYFIMPWpaKE6XwuBQYAeP7k-mKehu]pEjX1jz9jAMZEyGuorjT4tRvvVxwWpQaOufrIeHThS95F3qYGD77MoxzjDswiUyMUIGzZ96NrNjJv15z6WIXM6S2051A6D6YwivVZfT]G2eFnv8Tol')
    })

    it('Should build with all the necessary options', () => {
        const builder = Request.builder()
            .withURI('https://ten.tickles/')
            .withPath('api/v1')
            .withContentType(Request.ContentType.ApplicationJSON)
            .withCode('code')
            .withGrantType('client_credentials')
            .withRedirectURI('https://rick.roll.ed')
            .withMethod(Request.Method.POST)
            .withAccessToken(`${Request.AuthorizationType.Bearer} A8gBfSbHiAnamvf1_D7Sfdi7YrRYgje3BcW1BDhiVPLFy3VHj3svSEvDSEx3IZCY3ZyIc1-RamGjIJLMd24h6605qCxrkVWeaBzVfP1ejk12V9EzMTdxpoXmr0hxXWEPGL-Vi629_DmkmaHCP4DQjfwnw7pHuF5xhTt0dfrRWQ4mIS_CGS8txPdrnuCC4LqQaH8L3GN8Fsa3BMZyOZ648GKTv5Xx_4wgy3sEKKVUhncBN-a-GwMGAhR4MmkeUHz850aJTHRbGsBc21vS27sYy9K0CdfBJjZEF05X4YUoqFtQKSQUrLzUPX03w0mZEFHHePONyQLSacBVRczNTaMOYFIMPWpaKE6XwuBQYAeP7k-mKehu]pEjX1jz9jAMZEyGuorjT4tRvvVxwWpQaOufrIeHThS95F3qYGD77MoxzjDswiUyMUIGzZ96NrNjJv15z6WIXM6S2051A6D6YwivVZfT]G2eFnv8Tol`)
            .build()

        expect(builder.baseURI).to.equal('https://ten.tickles/')
        expect(builder.path).to.equal('api/v1')
        expect(builder.contentType).to.equal('application/json')
        expect(builder.code).to.equal('code')
        expect(builder.grantType).to.equal('client_credentials')
        expect(builder.redirectURI).to.equal('https://rick.roll.ed')
        expect(builder.method).to.equal('POST')
        expect(builder.authorization).to.equal('Bearer A8gBfSbHiAnamvf1_D7Sfdi7YrRYgje3BcW1BDhiVPLFy3VHj3svSEvDSEx3IZCY3ZyIc1-RamGjIJLMd24h6605qCxrkVWeaBzVfP1ejk12V9EzMTdxpoXmr0hxXWEPGL-Vi629_DmkmaHCP4DQjfwnw7pHuF5xhTt0dfrRWQ4mIS_CGS8txPdrnuCC4LqQaH8L3GN8Fsa3BMZyOZ648GKTv5Xx_4wgy3sEKKVUhncBN-a-GwMGAhR4MmkeUHz850aJTHRbGsBc21vS27sYy9K0CdfBJjZEF05X4YUoqFtQKSQUrLzUPX03w0mZEFHHePONyQLSacBVRczNTaMOYFIMPWpaKE6XwuBQYAeP7k-mKehu]pEjX1jz9jAMZEyGuorjT4tRvvVxwWpQaOufrIeHThS95F3qYGD77MoxzjDswiUyMUIGzZ96NrNjJv15z6WIXM6S2051A6D6YwivVZfT]G2eFnv8Tol')
        expect(JSON.stringify(builder.options)).to.equal('{"method":"POST","headers":{"Authorization":"Bearer A8gBfSbHiAnamvf1_D7Sfdi7YrRYgje3BcW1BDhiVPLFy3VHj3svSEvDSEx3IZCY3ZyIc1-RamGjIJLMd24h6605qCxrkVWeaBzVfP1ejk12V9EzMTdxpoXmr0hxXWEPGL-Vi629_DmkmaHCP4DQjfwnw7pHuF5xhTt0dfrRWQ4mIS_CGS8txPdrnuCC4LqQaH8L3GN8Fsa3BMZyOZ648GKTv5Xx_4wgy3sEKKVUhncBN-a-GwMGAhR4MmkeUHz850aJTHRbGsBc21vS27sYy9K0CdfBJjZEF05X4YUoqFtQKSQUrLzUPX03w0mZEFHHePONyQLSacBVRczNTaMOYFIMPWpaKE6XwuBQYAeP7k-mKehu]pEjX1jz9jAMZEyGuorjT4tRvvVxwWpQaOufrIeHThS95F3qYGD77MoxzjDswiUyMUIGzZ96NrNjJv15z6WIXM6S2051A6D6YwivVZfT]G2eFnv8Tol","Content-Type":"application/json"},"body":{}}')
    })

})
