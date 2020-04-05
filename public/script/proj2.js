import { getJSON } from './utilities.js';
import { getLocation } from './utilities.js';
import { key } from './keys.js';

const baseUrl = 'https://api.greatschools.org/schools/';


/*function getPosition() {
    let lat = 0;
    let lon = 0;
    try {
        const posFull = await getLocation();
        lat = posFull.coords.latitude;
        lon = posFull.coords.longitude;
        //if (lat != 0) {
            let pos = `&lat=${lat}&lon=${lon}`;
            console.log(pos);
            return pos;
        /*}
        else {
            let city = document.getElementById('city').value;
            let pos = `&city=${city}`;
            console.log(pos)
            return pos;
        }*
    } catch (error) {
        console.log(error);
    }

};
document.getElementById('location').addEventListener('click', getPosition);*/
document.getElementById('search').addEventListener('click', search);

function buildQuery() {
    let getState = document.getElementById('state').value;
    let state = `&state=${getState}`;
    //const pos = getPosition();
    let city = document.getElementById('city').value;
    city.replace(/\s/g, '+');
    /*if (city === '') {
        console.log('if' + pos);
    }
    else {
        pos = `&city=${city}`;
        console.log('else' + pos);
    }*/
    let pos = `&city=${city}`;
    let schoolType = '&schoolType=';
    if (document.getElementById('schoolType1').checked &&
        document.getElementById('schoolType2').checked &&
        document.getElementById('schoolType3').checked) {
        schoolType += 'public-charter-private';
    }
    else if (document.getElementById('schoolType1').checked && document.getElementById('schoolType2').checked) {
        schoolType += 'public-charter';
    }
    else if (document.getElementById('schoolType1').checked && document.getElementById('schoolType3').checked) {
        schoolType += 'public-private';
    }
    else if (document.getElementById('schoolType2').checked && document.getElementById('schoolType3').checked) {
        schoolType += 'charter-private';
    }
    else if (document.getElementById('schoolType1').checked) {
        schoolType += 'public';
    }
    else if (document.getElementById('schoolType2').checked) {
        schoolType += 'charter';
    }
    else if (document.getElementById('schoolType3').checked) {
        schoolType += 'private';
    }
    else {
        schoolType = '';
    }

    //console.log(state + pos + schoolType);
    //let test = '&state=CA&city=oakland&limit=2';
    let url = baseUrl + 'nearby?key=' + key + state + pos + schoolType;
    //let url = baseUrl + 'nearby?key=' + key + test;

    return url;
}


async function nearby(url) {
    const geoLocation = `&lat=${lat}&lon=${lon}`;
    url = url + 'nearby?key=' + key + geoLocation;
    //if (document.getElementById('schoolType1').checked) {
    console.log(location);

    //} 
    //url += location;
    return await getJSON(url);
}

//console.log(nearby(baseUrl));
//document.getElementById('search').addEventListener('click', nearby);
/*function renderList(list) {
    document.getElementById('results').style = "visibility:visible";
    document.getElementById('list').innerHTML = list.map((item) => {
        return `<li>${item.description}</li>`;
    }).join('');
}*/

async function search() {
    const url = buildQuery();
    await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/xml'
        }
    }).then(function(resp) {
        return resp.text();
    })
    .then(function(data) {
        let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data, 'text/xml');
        console.log(xmlDoc);
    })
}
