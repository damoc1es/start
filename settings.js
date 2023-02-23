let textarea = document.getElementById("linksTextarea");
let focusSetting = document.getElementById("reverseFocus");
let searchSelect = document.getElementById("searchEngineSelect");
let searchForm = document.getElementById("searchForm");
let linksDisabled = false;

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
}

function saveToLocalStorage() {
    console.log(textarea);
    localStorage.setItem("startpageLinks", textarea.value);
    localStorage.setItem("startpageFocusSetting", focusSetting.checked);
    localStorage.setItem("startpageSearchSetting", searchSelect.value);
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
