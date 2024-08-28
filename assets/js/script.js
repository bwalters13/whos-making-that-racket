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
getData().then((response) => {
    data = response;
    let playerList = document.getElementById('player-names');
    data.forEach((player) => {
        const option = document.createElement('option');
        option.value = player.NAME_P;
        playerList.appendChild(option);
    });
});
