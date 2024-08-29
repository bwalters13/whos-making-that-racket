let correct = false;
let num_guess = 0;

const answer = {
    name: 'Rafael Nadal',
    country: 'ESP',
    age: 38,
    continent: 'Europe',
};

const yellow_shade = '#ffd32c';

function getData() {
    return new Promise((resolve, reject) => {
        Papa.parse('data/players_atp.csv', {
            dynamicTyping: true,
            download: true,
            header: true,
            complete: function (results, file) {
                resolve(results.data);
            },
            error: function (error) {
                reject(error);
            },
        });
    });
}

let data;
let allPlayers = [];
getData().then((response) => {
    data = response;
    let playerList = document.getElementById('player-names');
    data.forEach((player) => {
        const option = document.createElement('option');
        option.value = player.NAME_P;
        playerList.appendChild(option);
        allPlayers.push(player.NAME_P);
    });
    this.document.getElementById('loading-container').style.display = 'none';
    this.document.getElementById('content-container').style.display = 'flex';
});

function handleGuess() {
    const guessInput = document.getElementById('player-guess').value;
    const playerInfo = data.find((obj) => obj['NAME_P'] === guessInput);
    if (playerInfo) {
        console.log(playerInfo);
        const playerImage = document.createElement('img');
        playerImage.src = `assets/images/atp/${playerInfo.ID_P.toString().padStart(
            6,
            '0'
        )}.jpg`;
        // document.getElementById('content-container').appendChild(playerImage);
        createRow(playerInfo);
    }

    document.getElementById('player-guess').value = '';

    if (correct) {
        document.getElementById(
            'num_guesses'
        ).innerText = `You guessed in ${num_guess} tries`;
        document.getElementById('winner').style.display = 'block';
    }
}

function createRow(playerInfo) {
    const playerAge = getAge(playerInfo.DATE_P);
    num_guess += 1;

    if (playerInfo.NAME_P === answer.name) {
        name_color = 'green';
        country_color = 'green';
        age_color = 'green';
        correct = true;
    } else {
        if (playerInfo.COUNTRY_P === answer.country) {
            country_color = 'green';
        } else if (playerInfo.continent === answer.continent) {
            country_color = yellow_shade;
        } else {
            country_color = 'red';
        }
        if (playerAge === answer.age) {
            age_color = 'green';
        } else if (Math.abs(playerAge - answer.age) <= 5) {
            age_color = yellow_shade;
        } else {
            age_color = 'red';
        }

        name_color = 'red';
    }

    const newRow = document.createElement('div');
    newRow.className = 'table t-body';
    newRow.innerHTML = `<div class='t-cell' style='flex: 1 1 33%; background-color: ${name_color};'><span>${playerInfo.NAME_P}</span></div><div class='t-cell' style='flex: 1 1 33%; background-color: ${country_color};'><span>${playerInfo.COUNTRY_P}</span></div>
                        <div class='t-cell' style='flex: 1 1 33%; background-color: ${age_color};'><span>${playerAge}</span></div>`;
    document.getElementById('guesses').appendChild(newRow);
}

function getAge(dob_str) {
    let dob = new Date(dob_str);
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function showCountryTT() {
    console.log('hi');
    document.getElementById('country').classList.toggle('show');
}
