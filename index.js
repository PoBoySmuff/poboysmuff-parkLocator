'use strict';

const apiKey = 'texitWx13V3IpqWbd25yccDNOlsltSEVlBw6ybKT';
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getParks(query, maxResults) {
    const params = {
        stateCode: query,
        language: 'en',
        limit: maxResults
    };

    const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString;
    console.log(url);

    const options = {
        headers: new Headers({
            'X-Api-Key': apiKey,
            'Access-Control-Request-Method': 'GET',
            'Origin': 'https://developer.nps.gov/api/v1/parks',
            'Access-Control-Request-Headers': 'Content-Type'
        })/* Need to figure out CORS headers*/
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);