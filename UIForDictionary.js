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