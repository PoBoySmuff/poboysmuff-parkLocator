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
        headers: new Headers({
            'X-Api-Key': apiKey

            
        })/* Need to figure out CORS headers*/
    };
    console.log(url);
    fetch(("https://cors-anywhere.herokuapp.com/"+url),options)
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
    $('#results-list').empty();
    $('#js-error-message').empty();
    for (let i=0; i<responseJson.limit && i<responseJson.data.length; i++) {
        $('#results-list').append(`
        <li><h3><a href=${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p></li>`)
    };
    if (responseJson.data.length === 0) {
        $('#results-list').append(`
        <li><p>No results found</p></li>`);
    }
    $('#results').removeClass('hidden');
};

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);