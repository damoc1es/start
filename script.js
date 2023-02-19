let disabled = false;

document.documentElement.addEventListener('keydown', (event) => {
    if(event.key == 'x') {
        document.getElementById('Tree').classList.add("disabled");
        disabled = true;
    }
    else if(event.key == 'Escape') {
        document.getElementById('Tree').classList.remove("disabled");
        disabled = false;
        document.getElementById('SearchInput').blur();
    }
});

document.documentElement.addEventListener('keyup', (event) => {
    if(event.key == 'x') {
        document.getElementById('SearchInput').focus();
    }
});