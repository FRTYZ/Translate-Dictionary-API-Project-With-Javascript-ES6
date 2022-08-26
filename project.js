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
