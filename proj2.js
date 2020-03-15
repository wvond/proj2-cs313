import { getJSON } from './utilities.js';
import { key } from './keys.js';

const baseUrl = 'https://api.nal.usda.gov/fdc/v1/';

async function searchFoods(url, query) {
    url = url + '?api_key=' + key;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            generalSearchInput: query,
            includeDataTypes: {
                "Survey (FNDDS)": true,
                Foundation: true,
                Branded: false
            },
            requiredAllWords: "true"
        })
    };
    return await getJSON(url, options);
}

console.log(searchFoods(baseUrl + "search", "apple"));
document.getElementById('search').addEventListener('click', search);

async function search() {
    const searchString = document.getElementById('query').value;
    if(searchString.length > 2) {
        const response = await searchFoods(baseUrl + "search", searchString);
        renderList(response.foods);
    }
}

function renderList(list) {
    document.getElementById('list').innerHTML = list.map((item) => {
        return `<li>${item.description}</li>`;
    }).join('');
}