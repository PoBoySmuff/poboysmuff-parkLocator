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
        limit: maxResults
    };

    const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString;
    console.log(url);

    const options = {
        method: 'GET',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': true,
        headers: new Headers({
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'

            
        })/* Need to figure out CORS headers*/
    };

    fetch(url,options)
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