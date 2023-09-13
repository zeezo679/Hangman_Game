//letters
let letters = "abcdefghijklmnopqrstuvwxyz"


//get array from letters
let lettersArr = Array.from(letters)

//select letters container
let lettersContainer = document.querySelector(".letters")

  //fetch the objects from json
  fetch("words.json")
  .then(response => response.json())
  .then(data => {
      let words = data

            //generate letters
        lettersArr.forEach(letter =>{
            //create span
            let span = document.createElement("span")

            //create letter text node
            let theLetter = document.createTextNode(letter)

            //append the letter to span
            span.appendChild(theLetter)

            //add class on span
            span.className = "letter-box"

            //apend span to the letters container
            lettersContainer.appendChild(span)
        })

                //get random property
        let allKeys = Object.keys(words)

        let randomPropNumber = Math.floor(Math.random() * allKeys.length)
        let randomPropName = allKeys[randomPropNumber]
        let randomPropValue = words[randomPropName]

        let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
        let randomValueValue = randomPropValue[randomValueNumber]


        //set category info
        document.querySelector(".game-info .category span").innerHTML = randomPropName

        // select letters guess element
        let lettersGuessContainer = document.querySelector(".letters-guess")

        //convert chosen word to array
        let lettersAndSpace = Array.from(randomValueValue)

        //create spans depend on word
        lettersAndSpace.forEach(letter => {
            //create empty span
            let span = document.createElement("span")

            //if letter is space
            if (letter === " "){
                //add class to the span
                span.className = "has-space"
            } else {
                span.className = "has-letter"
            }

            //append span to the letters guess container
            lettersGuessContainer.appendChild(span)

        });

        
            //select guess spans
            let guessSpans = document.querySelectorAll(".letters-guess span")

            // set wrong attempts
            let wrongAttempts = 0

            //select the draw element
            let theDraw = document.querySelector(".hangman-draw")

            //handle clicking on letters
document.addEventListener("click", (e) => {
    if (e.target.className === "letter-box"){
        e.target.classList.add("clicked")

        // set the chose status
        let theStatus = false

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()
        // console.log(lettersAndSpace) the chosen word

        //the chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase())

        lettersAndSpace.forEach((wordLetter, Wordindex) => {
            //check if the clicked letter == to one of the chosen word letter
            if (theClickedLetter == wordLetter){
                
                //set status to correct
                theStatus = true

                //loop on all gues spans
                guessSpans.forEach((span, spanIndex) =>{
                    if (Wordindex === spanIndex){
                        span.innerHTML = theClickedLetter
                    }
                })
            }
        
        })
        // if letter is wrong
        if (theStatus != true){
            //increase the wrong attempts
            wrongAttempts++

            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`)

            //play fail sound
            document.getElementById("fail").play()

            if (wrongAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished")
            } 
            
        } else {
            //play success sound
            document.getElementById("success").play()
            let allSpansFilled = true
            let spanElements = lettersGuessContainer.querySelectorAll(".has-letter")
            for (let i = 0; i < spanElements.length; i++){
                if (spanElements[i].innerHTML === ""){
                    
                    allSpansFilled = false
                    break
                }
            }
            if (allSpansFilled){
                success()
                lettersContainer.classList.add("finished")
            }
    }
}

})

//end game function

function endGame(){
    //create popup div
    let div = document.createElement("div")

    //create text
    let divText = document.createTextNode(`Game Over, The Word is ${randomValueValue}`)

    //append text to div
    div.appendChild(divText)

    //add class on div
    div.className = 'popup'
    
    //append to the bodu
    document.body.appendChild(div)
}


function success(){
    let div = document.createElement("div")

    //create text
    let divText = document.createTextNode(`Very Nice, The Word is ${randomValueValue}`)

    //append text to div
    div.appendChild(divText)

    //add class on div
    div.className = 'popupTwo'
    
    //append to the bodu
    document.body.appendChild(div)
}


  })











