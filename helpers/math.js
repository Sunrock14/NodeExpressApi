const fs = require('fs');

function newFile(){
    fs.writeFileSync("log.txt", "test dosyası");
    console.log("dosya yaratıldı.");
    
    fs.writeFile("log2.txt", "dosya yazıldı", (err) => {})
    console.info("asenkron dosya yaratıldı.")

    let readFile = fs.readFileSync("log.txt");
    console.log(readFile);
    
    //console.log(fs);
    //Bu kütüphanenin ilgili fonksiyonlarını listelemek için kullandık
}

function mySumFunc(first, second) {
      return first + second   
}

function myLog() {
    console.log("log yazıdırıldı")
}

module.exports = {
    mySumFunc,
    myLog,
    newFile
}