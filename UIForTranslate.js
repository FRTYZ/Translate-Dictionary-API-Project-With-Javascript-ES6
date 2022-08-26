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
