class MockHttpClient {
    constructor() {
        this.requests = [];
    }

    async get(url) {
        this.requests.push({ method: 'GET', url });
    }

    async post(url, data) {
        this.requests.push({ method: 'POST', url, data });
    }


    clearRequests() {
        this.requests = [];
    }
}

module.exports = MockHttpClient;
