const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const highlight =  ( text)  => '<span class="highlight">' + text + '</span>';
// const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
 
class Translator {

      translate(text, locale) {
    let translation = text;
    let timeRegex = /(\d{1,2}):(\d{2})/g;
    let timeReplacement = "$1.$2";
    let timeRegex2 = /(\d{1,2}).(\d{2})/g;
    let timeReplacement2 = "$1:$2";

    if (locale === "american-to-british") {
      for (let key in americanOnly) {
        translation = translation.replace(new RegExp("\\b" + key + "\\b", "gi"), highlight(americanOnly[key]));
      }
      for (let key in americanToBritishSpelling) {
        translation = translation.replace(new RegExp("\\b" + key + "\\b", "gi"), highlight(americanToBritishSpelling[key]));
      }
      for (let key in americanToBritishTitles) {
        let arr = translation.split(" ")
        translation.split(' ').forEach((word, index) => {
          if (word === key) {
            arr[index] = highlight(americanToBritishTitles[key]);
          }
      })
      translation = arr.join(" ");
    }
      translation = translation.replace(timeRegex, highlight(timeReplacement));
    } else if (locale === "british-to-american") {
      for (let key in britishOnly) {
        translation = translation.replace(new RegExp("\\b" + key + "\\b", "gi"), highlight(britishOnly[key]));
      }
      for (let key in americanToBritishSpelling) {
        translation = translation.replace(new RegExp("\\b" + americanToBritishSpelling[key] + "\\b", "gi"), highlight(key));
      }
      for (let key in americanToBritishTitles) {
          let arr = translation.split(" ")
          translation.split(" ").forEach((word, index) => {
            if (word === americanToBritishTitles[key]) {
              arr[index] = highlight(key);
            }
        });

        translation = arr.join(" ");
      }
      translation = translation.replace(timeRegex2, highlight(timeReplacement2));
    }


    return translation;
  }


}
module.exports = Translator;