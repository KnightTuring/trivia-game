export const fetchFromApi = (setLoading, callback) => {
    let url = 'https://opentdb.com/api.php?amount=5&encode=base64'
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
        }, (err) => {
            console.log("Encountered error while invoking the API"+err)
        })
}

export const shuffleArray = (arr) => {
    // https://bost.ocks.org/mike/shuffle/
    // Fisher-Yates shuffle
    let iterations = arr.length - 1
    while(iterations) {
        // pick a random index between 0 and whatever iterations remain
        let randomIndex = Math.floor(Math.random() * iterations)

        // swap it with the current element
        let temp = arr[iterations]
        arr[iterations] = arr[randomIndex]
        arr[randomIndex] = temp

        // decrement iterations
        iterations--
    }
    return arr
}