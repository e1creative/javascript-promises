
axios.get('http://numbersapi.com/42?json')
    .then(resp => {
        let container = document.getElementById('single-fact')
        let newItem = document.createElement('p');
        newItem.innerText = resp.data.text
        container.appendChild(newItem)
})
    .catch(e => console.log(e.code));


axios.get('http://numbersapi.com/1..3,10?json')
    .then(resp => {
        let container = document.getElementById('multiple-facts')
        for (let i in resp.data) {
            let newItem = document.createElement('p');
            newItem.innerText = resp.data[i];
            container.appendChild(newItem);
        }
    })
    .catch(err => console.log(err));


let favNumFacts = []
for (let i=1; i<5; i++ ) {
    favNumFacts.push(axios.get('http://numbersapi.com/13?json'));
}
Promise.all(favNumFacts)
    .then(favNumFactsArr => {
        let container = document.getElementById('favorite-num-facts');
        favNumFactsArr.forEach(val => {
            let newItem = document.createElement('p');
            newItem.innerText = val.data.text;
            container.appendChild(newItem);
        })
    })
    .catch(e => console.log(e));


// Part 2.1
axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(resp => {
        // after deck is shuffled
        axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
            .then(val => {
                console.log(`${val.data.cards[0].value} of ${val.data.cards[0].suit}`)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

// Part 2.2
let cardsInHand = []
axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(resp => {
        // after deck is shuffled
        axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
            .then(val => {
                cardsInHand.push(val.data.cards[0])
                return axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
            })
            .then(val => {
                cardsInHand.push(val.data.cards[0])
                for (let card of cardsInHand){
                    console.log(`${card.value} of ${card.suit}`)
                }
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

// Part 2.3
const getACardButton = document.getElementById('get-a-card');
const cardPile = document.getElementById('cards');
let deckID;

axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(resp => {
        deckID = resp.data.deck_id
        // clicksRemaining = resp.data.
        getACardButton.addEventListener('click', getACard)
        function getACard(e){
            e.preventDefault();

            axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
                .then(val => {
                    let newCard = document.createElement('img');
                    newCard.setAttribute('src', val.data.cards[0].image)
                    cardPile.appendChild(newCard)
                    if (val.data.remaining == 0){
                        getACardButton.style.display = "none";
                    }
                })
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

