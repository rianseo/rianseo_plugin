var languageSelector={version:"1.4.1",defaultLanguage:"en",nameOfSelectorFrame:"LANGUAGE",idOfScript:"language_script",flagPath:"flags/",cookieKeyName:"languageSelectorValue",cookieExpirationDays:3650,styleId:"languageSelectorStyle",frameElementsOfSelectorFlags:null,elementsOfLanguageSelectors:null,elementOfScript:null,actualLanguage:null,languageList:{},languageArray:new Array(),languageHreflangs:{},debugMode:false,languageCoutryList:{sq:"AL",hy:"AM",ps:"AR",az:"AZ",bs:"BA",bg:"BG",be:"BY",zh:"CN",cs:"CZ",de:"DE",da:"DK",et:"EE",es:"ES",gl:"ES",fi:"FI",fo:"FO",fr:"FR",en:"GB",ka:"GE",el:"GR",hr:"HR",hu:"HU",id:"ID",he:"IL",hi:"IN",fa:"IR",is:"IS",it:"IT",ja:"JP",sw:"KE",ky:"KG",ko:"KR",kk:"KZ",lt:"LT",lv:"LV",mk:"MK",mn:"MN",mt:"MT",dv:"MV",ms:"MY",nl:"NL",nb:"NO",nn:"NO",mi:"NZ",tl:"PH",ur:"PK",pl:"PL",pt:"PT",ro:"RO",ru:"RU",sv:"SE",sl:"SI",sk:"SK",sr:"SP",sy:"SY",th:"TH",tr:"TR",uk:"UA",uz:"UZ",vi:"VN",zu:"ZA"},languageNameList:{sq:"Albanian",hy:"Armenian",ps:"Pashto",az:"Azeri",bs:"Bosnian",bg:"Bulgarian",be:"Belarusian",zh:"Chinese",cs:"Czech",de:"German",da:"Danish",et:"Estonian",es:"Spanish",gl:"Galician",fi:"Finnish",fo:"Faroese",fr:"French",en:"English",ka:"Georgian",el:"Greek",hr:"Croatian",hu:"Hungarian",id:"Indonesian",he:"Hebrew",hi:"Hindi",fa:"Farsi",is:"Icelandic",it:"Italian",ja:"Japanese",sw:"Swahili",ky:"Kyrgyz",ko:"Korean",kk:"Kazakh",lt:"Lithuanian",lv:"Latvian",mk:"FYRO Macedonian",mn:"Mongolian",mt:"Maltese",dv:"Divehi",ms:"Malay",nl:"Dutch",nb:"Norwegian",nn:"Norwegian",mi:"Maori",tl:"Tagalog",ur:"Urdu",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sv:"Swedish",sl:"Slovenian",sk:"Slovak",sr:"Serbian",sy:"Syriac",th:"Thai",tr:"Turkish",uk:"Ukrainian",uz:"Uzbek",vi:"Vietnamese",zu:"Zulu"},init:function(){languageSelector.elementOfScript=document.getElementById(languageSelector.idOfScript);languageSelector.debugMode=(typeof languageSelector.elementOfScript.dataset.debug=="string"&&languageSelector.elementOfScript.dataset.debug=="1"?true:false);languageSelector.log("languageSelector: Started");var a=(typeof languageSelector.elementOfScript.dataset.languages=="string"?languageSelector.elementOfScript.dataset.languages:"");if(a!=""){languageSelector.languageArray=a.split(",")}languageSelector.updateHreflangValues();if(languageSelector.languageArray.length>0){languageSelector.defaultLanguage=languageSelector.languageArray[0];for(var d=0;d<languageSelector.languageArray.length;d++){var b=languageSelector.validateISO6391(languageSelector.languageArray[d]);if(b==""){languageSelector.log("languageSelector: Invalid language code "+(languageSelector.languageArray[d]==""?"(empty)":languageSelector.languageArray[d])+" in script parameter (data-languages)");return}languageSelector.languageList[b]=b}languageSelector.setLanguage(languageSelector.getLang(),true);document.addEventListener("DOMContentLoaded",languageSelector.initLanguageSelectors);languageSelector.log("languageSelector: Following languages activated: "+a)}else{languageSelector.log("languageSelector: No languages defined: data-languages = "+a)}},initLanguageSelectors:function(){languageSelector.frameElementsOfSelectorFlags=document.getElementsByTagName(languageSelector.nameOfSelectorFrame);if(languageSelector.frameElementsOfSelectorFlags.length>0){languageSelector.elementsOfLanguageSelectors=[];for(var b=0;b<languageSelector.frameElementsOfSelectorFlags.length;b++){var e=languageSelector.frameElementsOfSelectorFlags[b].childNodes;var h="";var d={};if(e.length>0){languageSelector.log("languageSelector: Has found following language selector elements:");for(var g=0;g<e.length;g++){if(typeof e[g].getAttribute!="undefined"){switch(e[g].tagName){case"SELECT":e[g].addEventListener("change",languageSelector.changeLanguageSelect);languageSelector.elementsOfLanguageSelectors.push(e[g]);var a=e[g].getElementsByTagName("OPTION");if(a.length>0){for(var f=0;f<a.length;f++){d[a[f].value]=a[f]}}languageSelector.log(e[g]);break;case"IMG":h=e[g].getAttribute("lang");if(h!=null&&h!=""){d[h]=e[g];e[g].addEventListener("click",languageSelector.changeLanguageClick);languageSelector.elementsOfLanguageSelectors.push(e[g]);if(h==languageSelector.actualLanguage){e[g].className+=" selected"}languageSelector.log(e[g])}}}}}if(languageSelector.languageArray.length>0){for(var f=0;f<languageSelector.languageArray.length;f++){if(typeof d[languageSelector.languageArray[f]]=="undefined"){if(typeof languageSelector.frameElementsOfSelectorFlags[b].dataset.type=="undefined"||languageSelector.frameElementsOfSelectorFlags[b].dataset.type.toUpperCase()!="SELECT"){languageSelector.insertFlag(languageSelector.frameElementsOfSelectorFlags[b],languageSelector.languageArray[f])}else{languageSelector.insertSelectOption(languageSelector.frameElementsOfSelectorFlags[b],languageSelector.languageArray[f])}}}}}}languageSelector.setLanguage(languageSelector.getLang(),true)},insertFlag:function(b,g){if(b&&typeof g=="string"){var f=languageSelector.validateISO6391(g);if(f&&typeof languageSelector.elementOfScript.src=="string"){var d=document.createElement("IMG");d.lang=f;var c=languageSelector.elementOfScript.src;var a=c.substr(0,c.search(/\w+\.js$|\w+\.js\?.*$/));var e="";if(f.length==2){if(typeof languageSelector.languageCoutryList[f]=="string"){e=languageSelector.languageCoutryList[f]}else{languageSelector.log("languageSelector: Unsupported language code: "+f);return}}else{e=f.substring(3,6)}d.src=a+languageSelector.flagPath+e.toUpperCase()+".png";d.addEventListener("click",languageSelector.changeLanguageClick);if(g==languageSelector.actualLanguage){d.className+=" selected"}languageSelector.elementsOfLanguageSelectors.push(d);b.appendChild(d)}}},insertSelectOption:function(b,g){if(b&&typeof g=="string"){var f=languageSelector.validateISO6391(g);if(f&&typeof languageSelector.elementOfScript.src=="string"){var e=b.getElementsByTagName("SELECT");if(e.length==0){var c=document.createElement("SELECT");c.addEventListener("change",languageSelector.changeLanguageSelect);b.appendChild(c)}e=b.getElementsByTagName("SELECT");for(var d=0;d<e.length;d++){var a=document.createElement("OPTION");a.value=g;a.text=languageSelector.languageNameList[g];if(languageSelector.actualLanguage==g){a.selected=true}e[d].appendChild(a)}}}},changeLanguageClick:function(a){var b=this.getAttribute("lang");if(b==null||b==""){return}languageSelector.setLanguage(b);if(typeof languageChangeCallback=="function"){languageChangeCallback(b,this)}},changeLanguageSelect:function(a){if(typeof this.options[this.selectedIndex].value=="string"){languageSelector.setLanguage(this.options[this.selectedIndex].value);if(typeof languageChangeCallback=="function"){languageChangeCallback(this.options[this.selectedIndex].value,this)}}},setLanguage:function(d,b){d=(typeof d=="string"?languageSelector.isSupportedLanguage(d):languageSelector.getLang());b=b||false;if(d==""||(d==languageSelector.actualLanguage&&!b)){return}languageSelector.actualLanguage=d;setCookie(languageSelector.cookieKeyName,d,languageSelector.cookieExpirationDays);if(languageSelector.redirectHrefLang(d)){}else{document.documentElement.lang="";var c=document.getElementsByTagName("head");if(typeof c[0]!="undefined"){var a=c[0];a.appendChild(languageSelector.getStyleElement(languageSelector.lang));languageSelector.log("languageSelector: Language <style> has been inserted in <head>")}else{languageSelector.log("languageSelector: ERROR: No <head> available, cannot select language.")}languageSelector.setSelector()}languageSelector.log("languageSelector: Set language "+d+" on")},redirectHrefLang:function(f){var e=document.getElementsByTagName("head");if(typeof e[0]=="undefined"){languageSelector.log("LanguageSelector: No head element found on page");return false}var d=e[0].getElementsByTagName("link");if(!d||d.length==0){languageSelector.log("LanguageSelector: No Link element with hreflang found on the page head.");return false}var a="";var b=window.location.href.indexOf("?");if(b<0){b=window.location.href.length}var g=window.location.href.substring(0,b);languageSelector.log("LanguageSelector: Has found folowing link elements in head with hrefLang:");for(var c=0;c<d.length;c++){languageSelector.log("LanguageSelector: Link "+(c+1)+" : hreflang = "+d[c].hreflang);if(d[c].hreflang==f||d[c].hreflang.substring(0,f.length)==f){a=d[c].href;if(g!=a){languageSelector.log("LanguageSelector: Language match found: hreflang = "+d[c].hreflang+" href = "+d[c].href);window.location.replace(a+window.location.search);return true}}}languageSelector.log("LanguageSelector: No hreflang found.");return false},updateHreflangValues:function(){var c=document.getElementsByTagName("head");if(!c||typeof c[0]=="undefined"){languageSelector.log("LanguageSelector: No head element found on page");return false}var b=c[0].getElementsByTagName("link");if(!b||b.length==0){languageSelector.log("LanguageSelector: No Link element with hreflang found on the page head.");return false}languageSelector.languageHreflangs={};languageSelector.log("LanguageSelector: Has found folowing link elements in head with hrefLang:");for(var a=0;a<b.length;a++){if(typeof b[a].hreflang=="string"&&b[a].hreflang!=""){languageSelector.log("LanguageSelector: Link "+(a+1)+" : hreflang = "+b[a].hreflang);languageSelector.languageHreflangs[b[a].hreflang]=b[a];languageSelector.languageList[b[a].hreflang]=b[a].hreflang;languageSelector.languageArray.push(b[a].hreflang)}}},setSelector:function(){if(languageSelector.elementsOfLanguageSelectors!=null&&languageSelector.elementsOfLanguageSelectors.length>0){for(var b=0;b<languageSelector.elementsOfLanguageSelectors.length;b++){if(typeof languageSelector.elementsOfLanguageSelectors[b].tagName=="string"){switch(languageSelector.elementsOfLanguageSelectors[b].tagName){case"SELECT":languageSelector.elementsOfLanguageSelectors[b].value=languageSelector.actualLanguage;break;case"IMG":languageSelector.elementsOfLanguageSelectors[b].className=languageSelector.elementsOfLanguageSelectors[b].className.replace(/\ selected/g,"");if(languageSelector.elementsOfLanguageSelectors[b].getAttribute("lang")==languageSelector.actualLanguage){try{languageSelector.elementsOfLanguageSelectors[b].className+=" selected"}catch(a){}}else{try{languageSelector.elementsOfLanguageSelectors[b].style.opacity="1"}catch(a){}}break}}}}},getStyleElement:function(){var b=document.getElementById(languageSelector.styleId);if(b==null){b=document.createElement("style");b.id=languageSelector.styleId}if(languageSelector.languageArray!=null){var a="";if(languageSelector.actualLanguage==null){languageSelector.getLang()}for(var d=0;d<languageSelector.languageArray.length;d++){if(languageSelector.actualLanguage!=languageSelector.languageArray[d]){a+=":not("+languageSelector.nameOfSelectorFrame+")>:lang("+languageSelector.languageArray[d]+") {display: none!important;} ";a+=languageSelector.nameOfSelectorFrame+">:lang("+languageSelector.languageArray[d]+") {cursor: pointer;} "}else{a+=languageSelector.nameOfSelectorFrame+">:lang("+languageSelector.languageArray[d]+") {cursor: default;} "}}b.setAttribute("type","text/css");b.innerHTML=a}return b},getLang:function(){if(languageSelector.actualLanguage!=null&&languageSelector.actualLanguage!=""){return languageSelector.actualLanguage}var a=null;a=getCookie(languageSelector.cookieKeyName);if(typeof languageSelector.languageList[a]=="undefined"){a=null}if(typeof a!="string"||a==""){if(typeof window.navigator.languages!="undefined"&&typeof window.navigator.languages[0]=="string"){for(var b=0;b<window.navigator.languages.length;b++){a=languageSelector.isSupportedLanguage(window.navigator.languages[b]);if(a!=""&&typeof languageSelector.languageList[a]!="undefined"){return a}}}if(typeof window.navigator.language=="string"){a=languageSelector.isSupportedLanguage(window.navigator.language);if(a!=""&&typeof languageSelector.languageList[a]!="undefined"){return a}}if(typeof window.navigator.browserLanguage=="string"){a=languageSelector.isSupportedLanguage(window.navigator.browserLanguage);if(a!=""&&typeof languageSelector.languageList[a]!="undefined"){return a}}if(typeof window.navigator.userLanguage=="string"){a=languageSelector.isSupportedLanguage(window.navigator.userLanguage);if(a!=""&&typeof languageSelector.languageList[a]!="undefined"){return a}}a=languageSelector.defaultLanguage}return a},isSupportedLanguage:function(a){a=languageSelector.validateISO6391(a);if(typeof languageSelector.languageList[a]!="undefined"){return a}languageSelector.log("languageSelector warning: Found unsupported language selector in use ("+a+")");return false},validateISO6391:function(b){var a=/^[a-z]{2}$|^[a-z]{2}[-][A-Z]{2}$|^Cy-az-AZ$|^Lt-az-AZ$|^Cy-sr-SP$|^Lt-sr-SP$|^Cy-uz-UZ$|^Lt-uz-UZ$|^kok-IN$|^kok$|^zh[-]Han[st]/;languages=a.exec(b);if(languages==null){return""}return languages[0]},log:function(a){if(languageSelector.debugMode){console.log(a)}}};function setCookie(b,f,c){var e=new Date();e.setTime(e.getTime()+(c*24*60*60*1000));var a="expires="+e.toUTCString();document.cookie=b+"="+f+";"+a+";path=/"}function getCookie(d){var b=d+"=";var a=document.cookie.split(";");for(var e=0;e<a.length;e++){var f=a[e];while(f.charAt(0)==" "){f=f.substring(1)}if(f.indexOf(b)==0){return f.substring(b.length,f.length)}}return""}function checkCookie(){var a=getCookie("username");if(a!=""){alert("Welcome again "+a)}else{a=prompt("Please enter your name:","");if(a!=""&&a!=null){setCookie("username",a,365)}}}languageSelector.init();