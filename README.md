# Snodeify

*Snodeify* is a Node.js package that provides a simplified interface to interact with the Spotify Web API.

# Installation

To install the *Snodeify*, open your terminal or command prompt and run the following command:
```node
npm i snodeify
```

# Usage

Import the package
```javascript
import Snodeify from 'snodeify'
```

Create a config file as JS object
```javascript
const snodeify = Snodeify.withConfig({
    redirectURL,
    clientID,
    clientSecret,
    responseType,
    scopes
})
```

# Spotify Official API documentation
Please refer to the [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/reference/) for
detailed information about the available endpoints and their parameters.

# License
Distributed under ISC. See `LICENSE.md` for more information.