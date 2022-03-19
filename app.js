var data = JSON.parse(localStorage.getItem('player_data')) || {
    "coin": 1000,
    "price": 50,
    "lv_tahu": 1,
    "lv_telur": 1,
    "lv_minyak": 1
} 

var lvTahu = [3000, 10000, 15000, 25000, 50000]
var lvTelur = [15000, 25000, 30000, 50000, 70000]
var lvMinyak = [15000, 35000, 80000, 100000, 150000]
var sfx = ['1.mp3', '2.mp3', '3.mp3', '4.mp3']

const tahu = document.getElementById('tahu')
const coin = document.getElementById('coin')
const price = document.getElementById('price')
const btnTahu = document.getElementById('btn_tahu')
const btnTelur = document.getElementById('btn_telur')
const btnMinyak = document.getElementById('btn_minyak')
const priceTahu = document.getElementById('price_tahu')
const priceTelur = document.getElementById('price_telur')
const priceMinyak = document.getElementById('price_minyak')

let current = 0;

function Render() {
    coin.innerText = kFormatter(data.coin)
    price.innerText = data.price
    priceTahu.innerText = data.lv_tahu >= lvTahu.length ? "Max" : lvTahu[data.lv_tahu - 1]
    priceTelur.innerText = data.lv_telur >= lvTelur.length ? "Max" : lvTelur[data.lv_telur - 1]
    priceMinyak.innerText = data.lv_minyak >= lvMinyak.length ? "Max" : lvMinyak[data.lv_minyak - 1]

    if(data.coin < lvTahu[data.lv_tahu]) {
        btnTahu.style.backgroundColor = "#FF4E6E"
    } else {
        btnTahu.style.backgroundColor = "#73EA5F"
    }

    if(data.coin < lvTelur[data.lv_telur]) {
        btnTelur.style.backgroundColor = "#FF4E6E"
    } else {
        btnTelur.style.backgroundColor = "#73EA5F"
    }

    if(data.coin < lvMinyak[data.lv_minyak]) {
        btnMinyak.style.backgroundColor = "#FF4E6E"
    } else {
        btnMinyak.style.backgroundColor = "#73EA5F"
    }
}

Render()

tahu.addEventListener('click', getCoin)
btnTahu.addEventListener('click', upgradeTahu)
btnTelur.addEventListener('click', upgradeTelur)
btnMinyak.addEventListener('click', upgradeMinyak)

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function getCoin() {
    storeData()
    document.getElementById('instruction').style.display = 'none'
    tahu.classList.toggle('active')
    data.coin += data.price
    Render()

    current += 1

    if(current <= sfx.length) {
        const music = new Audio()
        music.src = "assets/"+sfx[current - 1]
        music.currentTime = 0
        music.play()
    } else {
        current = 0
    }

}

function upgradeTahu() {
    if(data.lv_tahu >= lvTahu.length) {
        return alert('Level Max')
    }

    if(data.coin < lvTahu[data.lv_tahu - 1]) {
        return alert('Uang Lo Ga Cukup')
    }
    
    data.lv_tahu += 1   
    data.coin -= lvTahu[data.lv_tahu - 1]
    data.price += 50
    storeData()
    Render()
    SFX()
}

function upgradeTelur() {
    if(data.lv_telur >= lvTelur.length) {
        return alert('Level Max')
    }

    if(data.coin < lvTelur[data.lv_telur - 1]) {
        return alert('Uang Lo Ga Cukup')
    }

    data.lv_telur += 1  
    data.coin -= lvTelur[data.lv_telur - 1]
    data.price += 75
    storeData()
    Render()
    SFX()
}

function upgradeMinyak() {
    if(data.lv_minyak >= lvMinyak.length) {
        return alert('Level Max')
    }

    if(data.coin < lvMinyak[data.lv_minyak - 1]) {
        return alert('Uang Lo Ga Cukup')
    }

    data.lv_minyak += 1  
    data.coin -= lvMinyak[data.lv_minyak - 1]
    data.price += 100

    storeData()
    Render()
    SFX()
}

function storeData() {
    localStorage.setItem('player_data', JSON.stringify(data))
}

function SFX() {
    const music = new Audio()
    music.src = "assets/y.mp3"
    music.currentTime = 0
    music.play()
}