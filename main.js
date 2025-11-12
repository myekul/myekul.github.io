const allTabs = document.querySelectorAll('.tab')
allTabs.forEach(elem => {
    hide(elem)
})
setFooter('2025')
setTabs(['home', 'info'])
initializeHash('home')
action()
setResources()
document.addEventListener('DOMContentLoaded', function () {
    show('bodyContent')
})
document.getElementById('runRecap').style.gap = 0
function action() {
    allTabs.forEach(tab => {
        hide(tab)
    })
    switch (globalTab) {
        case 'home':
            show('homeTab')
            break
        case 'info':
            show('infoTab')
            break
    }
}