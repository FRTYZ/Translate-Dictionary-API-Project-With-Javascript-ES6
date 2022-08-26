class Request{
    constructor ()  { 
        // For Transalte 
        this.apikey = "<YOUR_KEY>";              
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



