const allTabs = document.querySelectorAll('.tab')
allTabs.forEach(elem => {
    hide(elem)
})
setFooter(2024)
setTabs(['info', 'home', null, 'ballpit'])
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
    hide('content')
    switch (globalTab) {
        case 'home':
            show('homeTab')
            break
        case 'info':
            show('infoTab')
            break
        case 'ballpit':
            show('content')
            generateBallpit()
            break
    }
}
function generateBallpit() {
    document.getElementById('content').innerHTML = `<div id='ballpit'></div>`
    websites = [
        ['myekuldex', 'royalblue'],
        ['pikmin-place', 'limegreen'],
        ['run-recap', 'mediumpurple'],
        ['star-haven', 'deepskyblue'],
        ['roster-realm', 'darkgray']
    ]
    let HTMLContent = ''
    HTMLContent += `<div class='ball cuphead container' style='border-radius:50%;height:100px;width:100px'><img src="https://myekul.com/shared-assets/images/myekul.png" class='myekul' style='height:80px;width:auto'></div>`
    HTMLContent += `<div class='ball nmg container' style='border-radius:50%;height:100px;width:100px'><img src="https://myekul.com/runner-resources/images/kettle.png" style='height:80px'></div>`
    websites.forEach(website => {
        HTMLContent += `<div class='ball container' style='background-color:${website[1]};border-radius:50%;height:100px;width:100px'><img src="https://myekul.com/${website[0]}/images/favicon.png" style='height:80px'></div>`
    })
    setBallpit(HTMLContent)
}