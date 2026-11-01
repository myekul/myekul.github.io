const allTabs = document.querySelectorAll('.tab')
allTabs.forEach(elem => {
    hide(elem)
})
setFooter(2024)
setTabs(['info', 'home', [specialTab()], 'adventures', null, 'ballpit'])
initializeHash('home')
action()
document.addEventListener('DOMContentLoaded', async function () {
    await setHTML('html/info.html', 'infoTab')
    await setHTML('html/cuphead.html', 'cupheadTab')
    await setHTML('html/adventures.html', 'adventuresTab')
    const r = await fetch('buttons/combined-leaderboard.html');
    const t = await r.text();
    document.querySelectorAll('.combined-leaderboard').forEach(elem => {
        elem.insertAdjacentHTML("afterbegin", t)
    })
    const r2 = await fetch('buttons/runner-resources.html');
    const t2 = await r2.text();
    document.querySelectorAll('.runner-resources').forEach(elem => {
        elem.insertAdjacentHTML("afterbegin", t2)
    })
    const r3 = await fetch('buttons/run-recap.html');
    const t3 = await r3.text();
    document.querySelectorAll('.run-recap').forEach(elem => {
        elem.insertAdjacentHTML("afterbegin", t3)
    })
    document.getElementById('runRecap').style.gap = 0
    setResources()
    ILWRs()
    document.querySelectorAll('#cupheadButtons button').forEach(button => {
        button.classList.add('button')
        button.addEventListener('click', () => {
            playSound('category_select')
            showCupheadTab(button.id.split('Button')[0])
        });
    })
    show('bodyContent')
})
function showCupheadTab(tabId) {
    document.querySelectorAll('#cupheadButtons button').forEach(button => {
        button.classList.remove('cuphead')
        button.style.color = 'var(--cuphead)'
    })
    const currentButton = document.getElementById(`${tabId}Button`)
    currentButton.classList.add('cuphead')
    currentButton.style.color = 'black'
    const currentTab = document.getElementById(`${tabId}Tab`)
    document.querySelectorAll('#cupheadTabs > div').forEach(tab => {
        tab.style.display = 'none'
    })
    currentTab.style.display = ''
}
function specialTab() {
    return `
    <button id='cupheadButton' onclick="playSound('category_select');showTab('cuphead')" class="button" style="width:40px">
        <div class="cupheadIcon"></div>
    </button>`
}
function action() {
    allTabs.forEach(tab => {
        hide(tab)
    })
    hide('content')
    switch (globalTab) {
        case 'home':
            show('homeTab')
            break
        case 'cuphead':
            show('cupheadTab')
            break
        case 'adventures':
            show('adventuresTab')
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
        ['combined-leaderboard', 'var(--cuphead)'],
        ['run-recap', 'mediumpurple'],
        ['dr-kahls-sav-inspector', 'lightgreen'],
        ['inkwell-ils', 'dodgerblue'],
        ['myekuldex', 'royalblue'],
        ['pikmin-place', 'limegreen'],
        ['star-haven', 'deepskyblue'],
        ['roster-realm', 'darkgray'],
    ]
    let HTMLContent = `<div class='ball nmg container' style='border-radius:50%;height:100px;width:100px'><img src="https://myekul.com/runner-resources/images/kettle.png" style='height:80px'></div>`
    websites.forEach(website => {
        HTMLContent += `<div class='ball container' style='background-color:${website[1]};border-radius:50%;height:100px;width:100px'><img src="https://myekul.com/${website[0]}/images/favicon.png" style='height:80px'></div>`
    })
    setBallpit(HTMLContent)
}
function buyCuphead() {
    const iframe = `<iframe src="https://store.steampowered.com/widget/268910/" frameborder="0" width="646" height="190" style='margin:20px'></iframe>`
    openModal(iframe, 'BUY NOW!')
}
function ILWRs() {
    let HTMLContent = `
    <div class='container' style='gap:10px'>
    <table>`
    HTMLContent += `<tr>`
    bosses.forEach((boss, index) => {
        if (!boss.plane) {
            if (boss.isle != bosses[index - 1]?.isle) {
                HTMLContent += `</table><table>`
            }
            HTMLContent += `
            <tr>
            <td class='container ${boss.id}'>${getImage(boss)}</td>`
            for (let i = 0; i < (boss.time > 129 ? 4 : 6); i++) {
                HTMLContent += `<td><img src='https://myekul.com/combined-leaderboard/images/trophy/cuphead/1.png' style='height:16px'></td>`
            }
            HTMLContent += `</tr>`
        }
    })
    HTMLContent += `</table>
    </div>`
    document.getElementById('ILWRs').innerHTML = HTMLContent
}
function getImage(boss, size = 24) {
    return `<img src='https://myekul.com/shared-assets/cuphead/images/${boss.id}.png' style='height:${size}px'>`
}