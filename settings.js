let textarea = document.getElementById("linksTextarea");
let focusSetting = document.getElementById("reverseFocus");
let searchSelect = document.getElementById("searchEngineSelect");
let searchForm = document.getElementById("searchForm");
let linksDisabled = false;

const colorNames = ["background", "color", "background-alt", "color-alt", "link-hover"];
const colorDefault = ["#1A1423", "#E5BE9E", "#3D314A", "#B4A6AB", "#E56A75"];


loadFromLocalStorage();

if(focusSetting.checked) {
    disableLinks();
    document.getElementById('searchInput').focus();
}

switch(searchSelect.value) {
    case 'Google':
        searchForm.action = 'https://google.com/search?q=';
        break;
    case 'Bing':
        searchForm.action = 'https://bing.com/search?q=';
        break;
    default:
        searchForm.action = 'https://duckduckgo.com/?q=';
}


function loadFromLocalStorage() {
    // links yaml textarea
    let y = localStorage.getItem("startpageLinks");
    if(y != null)
        textarea.value = y;

    // reverse focus setting
    focusSetting.checked = (localStorage.getItem("startpageFocusSetting") == "true");

    // search engine setting
    let x = localStorage.getItem("startpageSearchSetting");
    if(x != null)
        searchSelect.value = x;

    // color scheme
    let groot = document.querySelector(":root");
    for(let i=0; i<colorNames.length; i++) {
        var color = localStorage.getItem("startpage-" + colorNames[i]);

        if(color != null) {
            groot.style.setProperty('--' + colorNames[i], color);
            document.getElementById(colorNames[i]).value = color;
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem("startpageLinks", textarea.value);
    localStorage.setItem("startpageFocusSetting", focusSetting.checked);
    localStorage.setItem("startpageSearchSetting", searchSelect.value);
    for(let i=0; i<colorNames.length; i++) {
        localStorage.setItem("startpage-" + colorNames[i], document.getElementById(colorNames[i]).value);
    }
    location.reload();
}

function disableLinks() {
    document.getElementById('tree').classList.add("disabled");
    linksDisabled = true;
}

function enableLinks() {
    document.getElementById('tree').classList.remove("disabled");
    linksDisabled = false;
    document.getElementById('searchInput').blur();
}

function resetColors() {
    for(let i=0; i<colorNames.length; i++) {
        localStorage.setItem("startpage-" + colorNames[i], colorDefault[i]);
    }
    location.reload();
}

document.documentElement.addEventListener('keydown', (event) => {
    if(event.key == 'x') {
        disableLinks();
    }
    else if(event.key == 'Escape') {
        enableLinks();
    }
});

document.documentElement.addEventListener('keyup', (event) => {
    if(event.key == 'x') {
        document.getElementById('searchInput').focus();
    }
});
