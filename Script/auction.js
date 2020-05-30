const fs = require("fs");
const filePath = "./input.txt";
function fileToJSON(fileContent){
        let rows = fileContent.split("\n");
        // Get Number of Available Items from 1st row
        let items = rows.splice(0, 1);
        items = items[0].split('\t');
        let noOfItems = items[1];
        // Convert other rows to objects
        let json = rows.map(row => {
            const r = row.split('\t');
            let key = r[0];
            let value = parseInt(r[1]);
            let obj = {};
            obj.name = key;
            obj.money = value;
            return obj;
        })
        return { json , noOfItems } ;  
}
function compare(a,b){
    if (a.money > b.money) return -1 ;
    else if (a.money < b.money) return 1 ;

    /** Tie-breaker: Who comes first in alphabetical order  */
    else if (a.money === b.money){
        if (a.name.toLowerCase() > b.name.toLowerCase()){return 1;}
        else {return -1;}
    }
}
function auction(bidders,noOfItems){
    bidders.sort(compare);
    let shifted = bidders.map((obj,index,arr)=>{
        let newObj = {};
        let newIndex = index;
        newObj.name = obj.name;
        if (index === arr.length-1){newIndex = -1;}
        if (index > noOfItems-1){
            newObj.money = 'Lost';
            return newObj;
        }
        newObj.money = arr[newIndex+1]['money'];
        return newObj;   
    });
    return shifted;
}

const fileContent = fs.readFileSync(filePath, "utf8");
let {json : bidders, noOfItems} = fileToJSON(fileContent);
if (bidders.length === 0){
    /** In case of no bids show the message No Winners  */
    fs.writeFile('output.txt', "No Winners ...!", (err)=>{ 
        if( err ) { 
            throw err; 
        }
        console.log("No Winners ...!");
    }); 
}
else {
    let auctionResult = auction(bidders,noOfItems);
    let resultString ="";
    auctionResult.forEach(bidder => {
        resultString += `${bidder.name}\t${bidder.money}\n`;
    });
    fs.writeFile('output.txt', resultString, (err)=>{ 
        if( err ) { 
            throw err; 
        }
        console.log("Winners were picked in output.txt file ..!") 
    }); 
}
