#Translate & Dictionary API Project With Javascript ES6

## Hello Everyone
It was a project that I loved. I developed using Javascript ES6 structure and OOP (API requests received with async and await). Both translate and dictionary API requests work together. If the language to be translated is English and a single word is written, the dictionary API works.

Translated Words can be added to LocalStorage and then the history can be viewed

I developed the interface using Bootstrap V5.2
### Features
* [Google Translate API](https://cloud.google.com/translate/docs/reference/rest/?apix=true)
* [Dictionary API](https://dictionaryapi.dev/)
*  Translate History with LocalStorage
* History Search , Delete , Delete All (Modal)
* Bootstrap alert operation that gives a warning and disappears with the SetInterval() function


[![Watch the video](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/main.PNG)](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/video.mp4)




## Home Page (index.html)
![alt text](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/main.PNG?raw=true)

## Translate & Dictionary API
![alt text](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/dictionary.PNG?raw=true)

## Translate History
![alt text](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/history.png?raw=true)

## Bootstrap alert
(It disappears after 2.5 seconds)
![alt text](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/warning.png?raw=true)
![alt text](https://github.com/FRTYZ/Translate-Dictionary-API-Project-With-Javascript-ES6/blob/main/images/warning1.png?raw=true)


# Source Code
Necessary explanations are written as a comment line in the codes.

#### İmportant Note
Js files must be included in our "index.html" page
```
<!-- Required JS files included -->

  <script src="UIForDictionary.js"></script>
  <script src="UIForTranslate.js"></script>
  <script src="storage.js"></script>
  <script src="ApiRequest.js"></script>
  <script src="app.js"></script>
  <script src="project.js"></script>
```


#### app.js
* General Class
```
class LSTranslate{
    constructor(slanguage,language,word,translated){
        // Created our constructive function and provided data exchange
        this.slanguage = slanguage;  
        this.language = language;
        this.word = word;
        this.translated = translated;
    }
}
```
#### ApiRequest.js
```
class Request{
    constructor ()  { 
        // For Transalte 
        // You need to get your own API KEY
        this.apikey = "<YOUR API KEY>";              
    }   

    async getTranslateWord(word,language,slanguage){        
        let url = `https://translation.googleapis.com/language/translate/v2?key=${this.apikey}`;      
        
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                target:language,
                source:slanguage,
                format: "text",
                q: word
            }),
        });
        const data = await response.json();
        return data;
    }  

    async getDictionary(dictonaryword){               
        let beforeurl = convertURL(dictonaryword);
        let url =  `https://api.dictionaryapi.dev/api/v2/entries/en/${beforeurl}`;        
       
        const response = await fetch(url,{
            method: 'GET',  
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }                     
        });
        const data = await response.json();
        return data;
    }   
}
// Converting value from "project.js" to url structure
function convertURL(value) {    
    var a = value;
    var b = a.toLowerCase().replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
   return b
}




```


#### project.js
* File to which general operations are directed and sent

```
// All input and div selected
const form = document.getElementById("translate-form");
const languageElement = document.getElementById("language");
const sourceLanguage = document.getElementById("sourceLanguage");
const wordElement = document.getElementById("word");
const translatedElement = document.getElementById("translated");
const filter = document.querySelector("#filter");
const tbody = document.querySelector("tbody");
const clear = document.querySelector("#clear-historys");

// eventListeners() function was run
eventListeners();

const request = new Request()
const ui = new UI();

function eventListeners() {
    form.addEventListener("submit", translateWord);
    document.addEventListener("DOMContentLoaded", function () {
        // When uploaded all data, UI class sent data to Storage get data
        let historys = Storage.getHistoryFromStorage();
        ui.loadAllHistory(historys);
    });
    filter.addEventListener("keyup", filterHistory);
    tbody.addEventListener("click", deleteHistory);
    clear.addEventListener("click", clearAllHistorys);
}

function translateWord(e) {
    const word = wordElement.value;
    const language = languageElement.value;
    const slanguage = sourceLanguage.value;

    if (word === "" || language === "") {
        // Error
        ui.displayMessages("Enter Your Text...", "danger"); // sent alert message        
    }
    else if (language === slanguage) {
        ui.displayMessages("No two languages should be the same...", "danger");
    }
    else {
        // --------------------------(Request for Translate API)-----------------------------

        request.getTranslateWord(word, language, slanguage)
            .then(response => {
                if (response.data.message === "Not Found") {
                    ui.displayMessages("No Data...", "danger");
                }
                else {
                    //To write the translated word in the input textContent field named "translated"
                    ui.displayTranslate(response.data.translations[0].translatedText);

                // --------------------------(LocalStorage)-----------------------------
    
                    // For LocalStorage
                    const translated = translatedElement.value;
                    const slanguage = response.data.translations[0].detectedSourceLanguage || sourceLanguage.value;
                    
                    // Created object data type named "NewTranslate" for LocalStorage
                    const newTranslate = new LSTranslate(slanguage, language, word, translated);

                    Storage.addHistoryToStorage(newTranslate);
                    ui.addHistoryToUI(newTranslate); // Add Translate to UI. sent data


                    // --------------------------(Request for Dictionary API)-----------------------------
                    if (language === "en") { // The dictionary only supports English language

                        request.getDictionary(translated)
                            .then(response => {
                                // For adding values from API to UI
                                Dictionary.dictonaryData(response)

                            })
                            .catch(err => {
                                console.log(err)
                            }
                            )
                    }
                }
            })
            .catch(err => console.log(err))

    }
    e.preventDefault();
}

function filterHistory(e) {
    // Target value sent UI class for filter
    ui.filterHistorys(e.target.value.toLowerCase())
}
function deleteHistory(e) {
    // target clicked in "tbody" class checked
    if (e.target.className === "fa fa-remove") {
        ui.deleteHistoryFromUI(e.target);// sent target the UI class

        // Sending title of translate clicked on storage class. deleting by this title
        Storage.deleteHistoryFromStorage(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent);
    }
}
function clearAllHistorys() {
    if (confirm(" Are you sure to all data want delete ? ")) {
         // running its two function
        ui.clearAllHistorysFromUI();
        Storage.clearAllHistorysFromStorage();
    }
}

var currentButton;  // global scope track the song playing
var audioPlaying = false; // global scope toggle audio state on/off

var playAudio = function (filePath) {
    if (audioPlaying == false) {
        audio.src = "" + filePath;
        audioPlaying = true;
    } else if (currentButton == this && audioPlaying == true) {
        audio.pause();
        audioPlaying = false;
    } else if (currentButton != this) {
        audio.src = "" + filePath;
        currentButton.classList.toggle("paused")
        audioPlaying = true;
    }

    currentButton = this;
    currentButton.classList.toggle("paused")
} 

```

#### storage.js
Necessary actions for Local Storage
```
class Storage {
    static addHistoryToStorage(newTranslate) {
        //Executing the "get History From Storage" function and transferring the data with the return to the "history" variable
        let history = this.getHistoryFromStorage();

        // We combined the new data with the data from the "getHistoryFromStorage()" function and added it to the LocalStorage database.
        history.unshift(newTranslate);
        localStorage.setItem("Thistory", JSON.stringify(history));
    }
    static getHistoryFromStorage() {
        let history;

        if (localStorage.getItem("Thistory") === null) {
            history = []; // If our "history" key is empty, we initialize the array as empty
        }
        else {
            // If our "history" key is array full, we split the data into two with Json.parse.
            // The data we separated with the return operation has been sent
            history = JSON.parse(localStorage.getItem("Thistory"))
        }
        return history;
    }
    static deleteHistoryFromStorage(historyword) {
        //Executing the "get Notes From Storage()" function and transferring the data with the return to the "notes" variable
        let historys = this.getHistoryFromStorage();
        // splice
        historys.forEach(function (history, index) {
            if (history.word === historyword) { //If the title of the note from the "project.js" file and the data from localstorage are equal
                historys.splice(index, 1); //Deleted data with splice function
            }
        });
        // adding our new array to localstorage database
        localStorage.setItem("Thistory", JSON.stringify(historys))

    }
    static clearAllHistorysFromStorage() {
        //notes key deleted so "Thistory" key and data is deleted
        localStorage.removeItem("Thistory");
    }
}
```

#### UIForDictionary.js
Necessary actions for UIForDictionary 
```
class Dictionary{
    static dictonaryData(response) {  
        
        const dictonary = document.querySelector("#dictionary"); 
         if (response.title !== "No Definitions Found") {       
             // Changed property of "#dictionary" div if there is no error
            dictonary.setAttribute("style", "display : inline-block");

            /*
                The " word.innerHTML = ""; " code between the codes to prevent the new incoming data from being added to the old data.
            */ 
            
            const word = document.querySelector(".word");
            word.innerHTML = "";
            word.innerHTML = `
                <h4> Word : ${response[0].word}</h4>
                <h5> ${response[0].phonetic === undefined ? `` : `${response[0].phonetic}`}</h5>
            `;

            // For Phonetics

            const cardphonetic = document.querySelector(".cardphonetic");
            if (response[0].phonetics === undefined) {
                // If there is no key named phonetics in the array
                cardphonetic.setAttribute("style", "display : none");
            }
            else{               
                const phoneticList = document.querySelector(".tbodyPhonetic");
                phoneticList.innerHTML = "";
                response[0].phonetics.forEach(function (phonetics) {
                    phoneticList.innerHTML += `
                      <tr style="${phonetics.audio === '' ? `display:none` : ``}">
                      <th>
                        <img src="images/${phonetics.audio.includes("uk") === true ? `uk-flag.jpg` : `usa-flag.jpg`}" id="outputImage" height="30px" width="30px">
                      </th>
                      <td>
                          ${phonetics.text === undefined ? `-` : `${phonetics.text}`}
                      </td>
                      <td>
                        <span class="btnContainer">
                          <input type="button" class='phoneticbutton'
                            onclick="playAudio.call(this,'${phonetics.audio}')"
                            id="btn_385">
                        </span>
                      </td>
                      <td>
                      ${phonetics.audio.includes("noun") === true ? `Noun` : `Verb`}
                      </td>                
                    </tr>         
                      `;
                    if(phonetics.audio === ''){
                        cardphonetic.setAttribute("style", "display : none");
                    }
                    else{
                        cardphonetic.setAttribute("style", "");
                    }
                });    
            }


            //-----------------( partOfSpeech 1  (example noun) )------------------------



            //  Synonyms for partOfSpeech 1               

            if (response[0].meanings[0] === undefined) {
                const speech1 = document.querySelector(".partOfSpeech1");
                speech1.setAttribute("style", "display : none");
            }
            else {
                // Speech1 Title

                const speech1Title = document.querySelector(".speech1Title");
                speech1Title.innerHTML = "";
                speech1Title.innerHTML += `
                <h4>--${response[0].meanings[0].partOfSpeech}</h4>`;

                // Speech1 List

                const speech1List = document.querySelector(".speech1");
                speech1List.innerHTML = "";
                response[0].meanings[0].definitions.forEach(function (speech) {                    
                        speech1List.innerHTML += `
                      <ul>
                          <li><a><strong>${speech.definition}</strong></a></li>                         
                          <li><a>${speech.example === undefined ? `` : `" ${speech.example} "`}</a></li>
                      </ul>                      
                      `;   
                })

                // Speech1 For synonyms
                const speech1synonymsList = document.querySelector(".speech1synonyms");
                if (response[0].meanings[0].synonyms.length === 0) {   
                    // If array named Synonyms is empty             
                    speech1synonymsList.setAttribute("style", "display : none");                    
                }
                else{                   
                    speech1synonymsList.innerHTML = ""; 
                    response[0].meanings[0].synonyms.forEach(function (synonyms) {
                        if (synonyms.length !== 0) {
                            speech1synonymsList.innerHTML += `
                      <span class="badge bg-secondary">${synonyms}</span>
                    `;
                        }
                    });

                    const synonymsTitle1 = document.querySelector(".synonymsTitle1");
                    synonymsTitle1.innerHTML = "";
                    synonymsTitle1.innerHTML =`
                    <h5>SynymsList</h5>`; 
                }
            }


            //-----------------( partOfSpeech 2  (example verb) )------------------------


            if (response[0].meanings[1] === undefined) {
                const speech2 = document.querySelector(".partOfSpeech2");
                speech2.setAttribute("style", "display : none");
            }
            else {
                // Speech2 Title
                const speech2Title = document.querySelector(".speech2Title");
                speech2Title.innerHTML = "";
                speech2Title.innerHTML += `<br/>
                <h4>--${response[0].meanings[1].partOfSpeech}</h4>`;

                // Speech 2 lists

                const speech2List = document.querySelector(".speech2");
                speech2List.innerHTML = "";
                response[0].meanings[1].definitions.forEach(function (speech2) {                    
                        speech2List.innerHTML += `
                        <ul>
                            <li>
                            <a><strong>${speech2.definition}</strong></a>
                            </li>
                            <li><a>${speech2.example === undefined ? `` : `" ${speech2.example} "`}</a></li>
                        </ul>`;                    
                });

                // Speech 2  For Synonymos
                const speech2synonymsList = document.querySelector(".speech2synonyms");
                if (response[0].meanings[1].synonyms.length === 0) {                   
                    speech2synonymsList.setAttribute("style", "display : none");                    
                }
                else{
                    speech2synonymsList.innerHTML ="";
                    response[0].meanings[1].synonyms.forEach(function (synonyms) {
                        if (synonyms.length !== 0) {
                            speech2synonymsList.innerHTML += `
                      <span class="badge bg-secondary">${synonyms}</span>
                    `;
                        }
                    });
                    const synonymsTitle2 = document.querySelector(".synonymsTitle2");
                    synonymsTitle2.innerHTML = "";
                    synonymsTitle2.innerHTML =`
                    <h5>SynymsList</h5>`; 
                }



            }

        



            //-----------------( partOfSpeech 3 (example adverb) )------------------------

            if (response[0].meanings[2] === undefined) {
                const speech3 = document.querySelector(".partOfSpeech3");
                speech3.setAttribute("style", "display : none");
            }
            else {
                // Speech3 Title
                const speech3Title = document.querySelector(".speech3Title");
                speech3Title.innerHTML = "";
                speech3Title.innerHTML += `<br/>
                <h4>--${response[0].meanings[2].partOfSpeech}</h4>`;

                // Speech 3 lists

                const speech3List = document.querySelector(".speech3");
                speech3List.innerHTML = "";
                response[0].meanings[2].definitions.forEach(function (speech3) {                   
                        speech3List.innerHTML += `
                        <ul>
                            <li>
                            <a><strong>${speech3.definition}</strong></a>
                            </li>
                            <li><a>${speech3.example === undefined ? `` : `" ${speech3.example} "`}</a></li>
                        </ul>                  
                  `;
                    
                });

                // Speech 3  For Synonymos
                const speech3synonymsList = document.querySelector(".speech3synonyms");
                if (response[0].meanings[2].synonyms.length === 0) {                    
                    speech3synonymsList.setAttribute("style", "display : none");                    
                }
                else{
                    
                    response[0].meanings[2].synonyms.forEach(function (synonyms) {                        
                        if (synonyms.length !== 0) {
                            speech3synonymsList.innerHTML = "";
                            speech3synonymsList.innerHTML += `
                      <span class="badge bg-secondary">${synonyms}</span>`;
                        }
                    });
                    const synonymsTitle3 = document.querySelector(".synonymsTitle3");
                    speech3synonymsList.innerHTML = "";
                    synonymsTitle3.innerHTML =`
                    <h5>SynymsList</h5>`; 
                }



            }



             //-----------------( partOfSpeech 4 (example Conj) )------------------------

             if (response[0].meanings[3] === undefined) {
                const speech4 = document.querySelector(".partOfSpeech4");
                speech4.setAttribute("style", "display : none");
            }
            else {
                // Speech4 Title
                const speech4Title = document.querySelector(".speech4Title");
                speech4Title.innerHTML = "";
                speech4Title.innerHTML += `<br/>
                <h4>--${response[0].meanings[3].partOfSpeech}</h4>`;

                // Speech 4 lists

                const speech4List = document.querySelector(".speech4");
                speech4List.innerHTML = "";
                response[0].meanings[3].definitions.forEach(function (speech4) {                
                speech4List.innerHTML += `
                  <ul>
                      <li>
                      <a><strong>${speech4.definition}</strong></a>
                      </li>
                      <li><a> ${speech4.example === undefined ? `` : `" ${speech4.example} "`}</a></li>
                  </ul>                  
                  `;                    
                });

                // Speech 4  For Synonymos
                const speech4synonymsList = document.querySelector(".speech4synonyms");
                if (response[0].meanings[3].synonyms.length === 0) {                    
                    speech4synonymsList.setAttribute("style", "display : none");                    
                }
                else{
                    speech4synonymsList.innerHTML = "";
                    response[0].meanings[3].synonyms.forEach(function (synonyms) {
                        if (synonyms.length !== 0) {
                            speech4synonymsList.innerHTML += `
                      <span class="badge bg-secondary">${synonyms}</span>
                    `;
                        }
                    });
                    const synonymsTitle4 = document.querySelector(".synonymsTitle4");
                    speech4synonymsList.innerHTML = "";
                    synonymsTitle4.innerHTML =`
                    <h5>SynymsList</h5>`; 
                }               
            }    
        }
        else{
            const dictonary = document.querySelector("#dictionary"); 
            dictonary.setAttribute("style", "display : none");
            
        }        

    }
}

```


#### UIForTranslate.js
Necessary actions for UIForDictionary
```
class UI {
    constructor() {       
        this.outputLanguage = document.getElementById("outputLanguage");
        this.outputWord = document.getElementById("translated");
        this.languageList = document.getElementById("language");
    }    
    displayTranslate(word) {
        this.outputWord.textContent = word;
    }
    addHistoryToUI(newTranslate) {      
        const historyForModal = document.querySelector("tbody");
         /*
            It took the values from our parameters that came with the "newTranslate" function and transferred 
            our data to the card div via "Template Literal"   
        */

        historyForModal.innerHTML += `      

            <tr>                
                <td>${newTranslate.word}</td>
                <td>${newTranslate.translated}</td>
                <td>${newTranslate.slanguage}-${newTranslate.language}</td>
                <td><a href = "#" class ="delete-item">
                        <i class = "fa fa-remove"></i>
                    </a>
                </td>
            </tr>
       `;
    }
    displayMessages(message, type) {
        // We chose our diva to show the alert div at the relevant location
        const contact = document.querySelector("#contact");

        // alert div created
        const div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = message;

        contact.appendChild(div); // added alert div

        setTimeout(function () {
            div.remove();

        }, 2500);
    }
    loadAllHistory(historys) {  
         // in this static feature we take data from "tbody" and load data with the foreach loop         
        const historyForModal = document.querySelector("tbody");

        historys.forEach(function (history) {
            historyForModal.innerHTML += `
            <tr>               
                <td>${history.word}</td>
                <td>${history.translated}</td>
                <td>${history.slanguage}-${history.language}</td>
                <td><a href = "#" class ="delete-item">
                        <i class = "fa fa-remove"></i>
                    </a>
                </td>
            </tr>
           
            `;
        })

    }
    filterHistorys(value) {
        //We got the general div class of cards in the "historyFilt" variable, then we got the data based on the most basic div that makes up the cards
        const historyFilt = document.querySelectorAll("tr");

        const filterValue = value;

        historyFilt.forEach(function (listItem) {
            const text = listItem.textContent.toLowerCase();

            /*
            The search has been carried out with the IndexOf function, our value from the "project.js" file. 
            If our index value is -1, we have changed the element's style Attribute properties
            */ 

            if (text.indexOf(filterValue) === -1) {
                listItem.setAttribute("style", "display : none !important");
            }
            else {
                listItem.setAttribute("style", "");
            }
        })
    }
    deleteHistoryFromUI(element) {
          // To delete data from the UI, we take and delete the biggest parent element of our target from project.js
        element.parentElement.parentElement.parentElement.remove();
    }

    clearAllHistorysFromUI() {
        const historyList = document.querySelector("tbody");

        // With the while loop, the largest parents of our data are taken and deleted individually
        while (historyList.firstElementChild !== null) {
            historyList.firstElementChild.remove();
        }
        
    }    
}

```

Good Encodings





