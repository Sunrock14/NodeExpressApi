const fs = require('fs');

function newFile(){
    fs.writeFileSync("log.txt", "test dosyası");
    console.log("dosya yaratıldı.");
    
    fs.writeFile("log2.txt", "dosya yazıldı", (err) => {})
    console.info("asenkron dosya yaratıldı.")

    let readFile = fs.readFileSync("log.txt");
    console.log(readFile);
    
    console.log("Asenkron dosya okuma işlemi başlatıldı.");
    let readFile2 = fs.readFile("log.txt", (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    });
    console.log("Asenkron dosya okuma işlemi tamamlandı.");
    readFile2.appendFile("log.txt", "Yeni şeyler eklendi", (err) => {
        if (err) throw err;
        console.log("dosya güncellendi.");
    });
    fs.unlink("log.txt", (err) => {
        if (err) throw err;
        console.log("dosya silindi.");
    });

    fs.mkdir("test", (err) => {
        if (err) throw err;
        console.log("klasör oluşturuldu.");
    });
    fs.mkdirSync("test2/test2", (err) => {
        if (err) throw err;
        console.log("klasör oluşturuldu.");
    });


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