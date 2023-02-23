let txtarea = document.getElementById("linksTextarea");
let focusSetting = document.getElementById("reverseFocus");
let searchSelect = document.getElementById("searchEngineSelect");
let linksDisabled = false;

loadTextarea();
loadSettings();

let links = jsyaml.load(txtarea.value);
if(focusSetting.checked) {
    disableLinks();
    document.getElementById('SearchInput').focus();
}

let searchForm = document.getElementById("SearchForm");

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

function loadTextarea() {
    var x = localStorage.getItem("startpageLinks");
    if(x != null)
        txtarea.value = x;
}

function loadSettings() {
    var x = localStorage.getItem("startpageFocusSetting");
    focusSetting.checked = (x == "true");
    x = localStorage.getItem("startpageSearchSetting");
    if(x != null)
        searchSelect.value = x; 
}

function saveSettings() {
    console.log(txtarea);
    localStorage.setItem("startpageLinks", txtarea.value);
    localStorage.setItem("startpageFocusSetting", focusSetting.checked);
    localStorage.setItem("startpageSearchSetting", searchSelect.value);
    location.reload();
}


function disableLinks() {
    document.getElementById('Tree').classList.add("disabled");
    linksDisabled = true;
}

function enableLinks() {
    document.getElementById('Tree').classList.remove("disabled");
    linksDisabled = false;
    document.getElementById('SearchInput').blur();
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
        document.getElementById('SearchInput').focus();
    }
});

let currentPath = '';
let tree = document.getElementById('Tree');

function openLink(link) {
    window.open(link, "_self");
}

function openPath(path) {
    let linksList = "", i=0;
    
    if(currentPath.length != 0)
        linksList += `<li class="backspace" onclick="backPath()">back</li>`;
    else linksList += `<li class="backspace start">back</li>`;

    path.forEach(element => {
        let name = Object.keys(element);
        let link = element[name];

        if(typeof(link) == 'string')
            linksList += `<li><a href="${link}">${name}</a></li>`;
        else linksList += `<li><span onclick="newPath(${i});">${name}</span></li>`;
        i++;
    });

    tree.innerHTML = linksList;
}

function showByPath(decimal) {
    [...decimal].forEach(element => {
        console.log(element)
    });
}

function parsePath(tree, s) {
    if(s.length == 0)
        openPath(tree);

    if(!tree)
        return;

    let c = parseInt(s[0]);

    if(!tree[c]) {
        if(currentPath.length >= 1)
            currentPath = currentPath.slice(0, -1);

        return;
    }

    let k = Object.keys(tree[c]);
    
    if(!tree[c][k])
        return;

    if(s.length == 1) {
        if(typeof(tree[c][k]) == 'string') {
            openLink(tree[c][k]);
        } else {
            openPath(tree[c][k]);
        }
        return;
    }

    if(typeof(tree[c][k]) != 'object') {
        if(currentPath.length >= 1)
            currentPath = currentPath.slice(0, -1);
        
        return;
    }
    
    parsePath(tree[c][k], s.slice(1));
}

function newPath(c) {
    currentPath += c;
    parsePath(links, currentPath);
}

function backPath() {
    if(currentPath.length >= 1)
        currentPath = currentPath.slice(0, -1);
    parsePath(links, currentPath);
}

const possibleKeys = ['Backspace', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
document.documentElement.addEventListener('keydown', (event) => {
    if(!linksDisabled && possibleKeys.includes(event.key)) {
        if(event.key == 'Backspace')
            backPath();
        else {
            newPath(event.key);
        }
    }
});

parsePath(links, currentPath);
