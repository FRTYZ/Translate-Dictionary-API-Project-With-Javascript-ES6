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

