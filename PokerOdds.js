const submitButton = document.getElementById("submit");
var temp;
var pick;
var deck = [];
var suits = ["spade", "heart", "club", "diamond"];
var flop;
var turn;
var river;
var pair = 0;
var twoPair = 0;
var threeOfAKind = 0;
var quads = 0;
var fullHouse = 0;
var flush = 0;
var straight = 0;
var pairBefore = 0;
var suitmatches;
var combinedDeck = [];
var copy;
var communal;
var simLength;
var hand;
var uniquePair = 0;
var unique2Pair = 0;
var unique3kind = 0;
var straightFlush = 0;
var royalFlush = 0;
var twoPairBefore = 0;
var matches;
var matches2;
var clown;

function textUpdate() {
    document.getElementById("pokerHeader").innerHTML = "Simulation is running!";
}
//textUpdate();

function prepDeck(){
    deck = [];
    suits = ["spade", "heart", "club", "diamond"];
    combinedDeck = [];

    //creates an unshuffled poker deck
    for (var i = 1; i <= 13; i++){
        for (var n = 0; n < suits.length; n++){
            deck.push({
                suit:suits[n],
                number: i,
            });
        }
    }

    //removes the cards in the hand from the deck.
    for (var n = 0; n < hand.length; n++) {
        for (var i = 0; i < deck.length; i++){
            if(deck[i].number == hand[n].number && deck[i].suit == hand[n].suit){
                deck.splice(i, 1);
            }
        }
    }

    //shuffles the deck
    for(var i = (deck.length - 1); i >= 0; i--){
        pick = Math.floor(Math.random() * (deck.length));
        temp = deck[i];
        deck [i] = deck[pick];
        deck[pick] = temp;
    }

    //picks out the 5 cards needs
    flop = [];
    for (var i = 0; i < 3; i++) {
        pick = Math.floor(Math.random() * (deck.length));
        flop.push(deck[pick]);
        deck.splice(pick, 1);
    }
    turn = [];
        pick = Math.floor(Math.random() * (deck.length));
        turn.push(deck[pick]);
        deck.splice(pick, 1);
    river = [];
        pick = Math.floor(Math.random() * (deck.length));
        river.push(deck[pick]);
        deck.splice(pick, 1);
    communal = [flop[0], flop[1], flop[2], turn[0], river[0],];

    combinedDeck = [];
    for(var i = 0; i < hand.length; i++){
        combinedDeck.push(hand[i]);
    } 
    for(var i = 0; i < communal.length; i++){
        combinedDeck.push(communal[i]);
    } 
    console.log("---------------------------------------------------");
    console.log(combinedDeck);
}

//check for fullhouses 2xpairs and pairs
function checkForMatches() {
    pairBefore = pair;
    twoPairBefore = twoPair;
    //sorts the combined deck
    for(var i = 0; i < (combinedDeck.length - 1); i += 0){
        i = 0;
        for (var n = 0; n < (combinedDeck.length - 1); n++) {
            if(combinedDeck[n].number > combinedDeck[n + 1].number) {
                temp = combinedDeck[n];
                combinedDeck[n] = combinedDeck[n + 1];
                combinedDeck[n + 1] = temp;
            } 
            else {
                i++;
            }
        }
    }

    //checks for pairs and fullhouse
    for (var i = 0; i < (combinedDeck.length - 1); i++){
        if (combinedDeck[i].number == combinedDeck[i + 1].number){
            pair++;
            console.log("pair");
            for (var n = (i+2); n < (combinedDeck.length - 1); n++){
                if (combinedDeck[n].number == combinedDeck[n + 1].number){
                    twoPair++;
                    console.log("TwoPair!");
                    if (n < 5){ 
                        if (combinedDeck[n].number == combinedDeck[n+2].number){
                            fullHouse++;
                            console.log("Full House!!");
                            }
                        }
                    }
                }
            }
    }

    //makes sure only 1 2 pair and pair are registered
    if ((pair - pairBefore) > 1){
        pair -= (pair- pairBefore - 1);
    }
    if ((twoPair - twoPairBefore) > 1){
        twoPair -= (twoPair- twoPairBefore - 1);
    }

    //checks for 3 of a kinds and fullhouse
    for (var i = 0; i < (combinedDeck.length - 2); i++){
        if (combinedDeck[i].number == combinedDeck[i + 1].number && combinedDeck[i].number == combinedDeck[i + 2].number){
            threeOfAKind++;
            console.log("THREE OF A KIND!");
            for (var n = (i+3); n < (combinedDeck.length - 2); n++){
                if (combinedDeck[n].number == combinedDeck[n + 1].number){
                    fullHouse++;
                    console.log("Full House!!");
                }
            }
        }
        
    }
    //checks for quads
    for (var i = 0; i < (combinedDeck.length - 3); i++){
        if (combinedDeck[i].number == combinedDeck[i + 1].number && combinedDeck[i].number == combinedDeck[i + 2].number && combinedDeck[i].number == combinedDeck[i + 3].number){
            quads++;
            console.log("QUADS");
        }
    }
    //checks for unique stuff for pocket pairs
    matches = 0;
    matches2 = 0;
    if (hand[0].number == hand[1].number){
        for (var n = 0; n < communal.length; n++){
            if(hand[0].number == communal[n].number){
                matches++;
            }
        }
        uniquePair++;
        if (matches > 0){
            unique3kind++;
        }
        unique2Pair = twoPair;
    } else {
        //checks for noncommunal pairs, 2 pairs, and 3 of a kinds
        for (var n = 0; n < communal.length; n++){
            if(hand[0].number == communal[n].number){
                matches++;
            }
        }
        for (var n = 0; n < communal.length; n++){
            if(hand[1].number == communal[n].number){
                matches2++;
            }
        }
        if (matches > 0){
            uniquePair++;
            console.log("unique pair");
            if (matches2 > 0){
                unique2Pair++;
                console.log("unique 2 pair!");
            }
        }
        else{
            if (matches2 > 0){
                uniquePair++;
                console.log("unique pair");
            }
        }
        if (matches > 1){
            unique3kind++;
            console.log("unique 3 of a kind");
        }
        if (matches2 > 1){
            unique3kind++;
            console.log("unique 3 of a kind");
        }
    }
}


function checkForFlush() {
suitmatches = [0,0,0,0];
    for (var i = 0; i < combinedDeck.length; i++) {
        if(combinedDeck[i].suit == "heart"){
            suitmatches[0]++;
        }
        if(combinedDeck[i].suit == "spade"){
            suitmatches[1]++;
        }
        if(combinedDeck[i].suit == "diamond"){
            suitmatches[2]++;
        }
        if(combinedDeck[i].suit == "club"){
            suitmatches[3]++;
        }
    }
    for (var i = 0; i < suitmatches.length; i++){
        if (suitmatches[i] >= 5){
            flush++;
            console.log("flush");
        }
    }
}

function checkForStraight() {
    copy = [];
    for (var i = 0; i <combinedDeck.length; i++){
        copy.push(combinedDeck[i])
    }
    inARow = 0;
    //sorts the combined deck
    for(var i = 0; i < (copy.length - 1); i += 0){
        i = 0;
        for (var n = 0; n < (copy.length - 1); n++) {
            if(copy[n].number > copy[n + 1].number) {
                temp = copy[n];
                copy[n] = copy[n + 1];
                copy[n + 1] = temp;
            } 
            else {
                i++;
            }
        }
    }
    //removes duplicates
    for (var i = 0; i < (copy.length - 1); i++) {
        if (copy[i].number == copy[i + 1].number) {
            copy.splice(i, 1);
            i--;
        }
    }
    //adds an ace to the end if necessary
    if (copy[0].number == 1){
        copy.push({suit:copy[0].suit, number:14});
    }
    //checks for straights 
    for (var i = 0; i < (copy.length - 4); i++) {
        for(var n = 0; n < 4; n++) {
            if (copy[i + n].number == copy[i + n + 1].number - 1) {
                inARow++;
            }
        }
        if (inARow >= 4) {
            straight++;
            console.log("straight!!!!");
            inARow = 0;
            if (copy[i].suit == copy[i+1].suit && copy[i].suit == copy[i+2].suit && copy[i].suit == copy[i+3].suit && copy[i].suit == copy[i+4].suit){
                straightFlush++;
                console.log("straight flush!!!!!");
                if(copy[copy.length - 1].number == 14 && copy[copy.length - 2].number == 13 && copy[copy.length - 3].number == 12 && copy[copy.length - 4].number == 11 && copy[copy.length - 5].number == 10){
                    royalFlush++;
                    console.log("ROYAL FLUSH!!!!!");
                }
                /* if (copy[i].number == 10){
                    royalFlush++;
                    console.log("ROYAL FLUSH!!!!!"); 
                } */
            }
            break;
        }
        inARow = 0;
    }

}

function sim(){

console.clear();
pair = 0;
count = 0;
twoPair = 0;
threeOfAKind = 0;
quads = 0;
fullHouse = 0;
flush = 0;
straight = 0;
pairBefore = 0;
uniquePair = 0;
unique3kind = 0;
unique2Pair = 0;
straightFlush = 0;
royalFlush = 0;
twoPairBefore = 0;

    //the users hand
    simLength = parseInt(document.getElementById("simLength").value);
    hand = [
    {suit: document.getElementById("suit1").value,
    number: parseInt(document.getElementById("card1").value)},
    {suit: document.getElementById("suit2").value,
    number: parseInt(document.getElementById("card2").value)},
];
    for(var i = 0; i < simLength; i++) {
        prepDeck();
        checkForFlush();
        checkForMatches();
        checkForStraight();
    }

    document.getElementById("pairs").innerHTML = `Pairs: ${pair}, ${((pair/simLength) * 100).toFixed(1)}%`;
    document.getElementById("2pairs").innerHTML = `2 Pairs: ${twoPair}, ${((twoPair/simLength) * 100).toFixed(1)}%`;
    document.getElementById("3kind").innerHTML = `3 of a kinds: ${threeOfAKind}, ${((threeOfAKind/simLength) * 100).toFixed(1)}%`;
    document.getElementById("uniquepairs").innerHTML = `Pairs: ${uniquePair}, ${((uniquePair/simLength) * 100).toFixed(1)}%`;
    document.getElementById("unique2pairs").innerHTML = `2 Pairs: ${unique2Pair}, ${((unique2Pair/simLength) * 100).toFixed(1)}%`;
    document.getElementById("unique3kind").innerHTML = `3 of a kinds: ${unique3kind}, ${((unique3kind/simLength) * 100).toFixed(1)}%`;
    document.getElementById("fullhouses").innerHTML = `Full Houses: ${fullHouse}, ${((fullHouse/simLength) * 100).toFixed(1)}%`;
    document.getElementById("straights").innerHTML = `Straights: ${straight}, ${((straight/simLength) * 100).toFixed(1)}%`;
    document.getElementById("flushes").innerHTML = `Flushes: ${flush}, ${((flush/simLength) * 100).toFixed(1)}%`;
    document.getElementById("quads").innerHTML = `Quads: ${quads}, ${((quads/simLength) * 100).toFixed(1)}%`;
    document.getElementById("straightflushes").innerHTML = `Straight Flushes: ${straightFlush}, ${((straightFlush/simLength) * 100).toFixed(2)}%`;
    document.getElementById("royalflushes").innerHTML = `Royal Flushes: ${royalFlush}, ${((royalFlush/simLength) * 100).toFixed(3)}%`;
    document.getElementById("pokerHeader").innerHTML = `${simLength} simulations run!`;

    console.log(`${flush} flushes.`);
    console.log(`${straight} straights.`);
    console.log(`${pair} pairs, ${twoPair} 2xpairs, ${threeOfAKind} 3 of kinds, ${fullHouse} fullhouses, and ${quads} quads.`);
    console.log(`UNIQUE: ${uniquePair} pairs, ${unique2Pair} 2xpairs, and ${unique3kind} 3 of kinds.`);

}
function go(){
    textUpdate();
    setTimeout(sim, 500);
}

submitButton.addEventListener("click",go);

