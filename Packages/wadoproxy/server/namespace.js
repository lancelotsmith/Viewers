WADOProxy = {};

WADOProxy.convertURL = (wadoURL) => {
    if (!Settings.enabled) {
        return wadoURL;
    }

    return Settings.uri + '?' + querystring.stringify({url: wadoURL});
}