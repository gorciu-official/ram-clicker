import { formatDigit } from "./util/formatDigit.js";

let total_ram = 0;
let ram_count = 0;
let total_ram_ascention = 0;
let ram_gen = 1;

const ram_counter = document.querySelector<HTMLSpanElement>('.ram-counter');
const ram_gen_counter = document.querySelector<HTMLSpanElement>('.ram-generation');
const ram_button = document.querySelector<HTMLImageElement>('img.ram-main-button');
const upgrades_wrapper = document.querySelector<HTMLDivElement>('.upgrades');

interface Building {
    name: string,
    desc: string,
    base_price: number,
    how_much_owned: number,
    how_much_gives: number
}

let upgrades: Building[] = [
    {
        name: "Cursor",
        desc: "Autoclicks one bit per 10 seconds",
        base_price: 15,
        how_much_owned: 0,
        how_much_gives: 0.1
    },
    {
        name: "Floppy drive",
        desc: "More things to store in the RAM",
        base_price: 100,
        how_much_owned: 0,
        how_much_gives: 1
    }
];

if (localStorage.getItem('gamedata')) {
    let gamedata = JSON.parse(localStorage.getItem('gamedata'));
    upgrades = gamedata.upgrades ?? upgrades;
    total_ram = gamedata.total_ram ?? total_ram;
    ram_count = gamedata.ram_count ?? ram_count;
    total_ram_ascention = gamedata.total_ram_ascention ?? total_ram_ascention;
    ram_gen = gamedata.ram_gen;
}

for (const upgrade of upgrades) {
    const upgrade_element = document.createElement('div');
    upgrade_element.classList.add('upgrade');
    upgrade_element.innerHTML = `
        <h2>${upgrade.name}</h2>
        <p>${upgrade.desc} | for <span class="upgrade-price">${formatDigit(upgrade.base_price)}</span></p>
    `;
    const upgrade_price_wrapper = upgrade_element.querySelector('.upgrade-price')!;
    upgrade_element.addEventListener('click', () => {
        if (ram_count <= (upgrade.base_price * (1 + (0.1 * upgrade.how_much_owned)))) return alert('Not anough money');
        ram_count -= (upgrade.base_price * (1 + (0.1 * upgrade.how_much_owned)));
        upgrade.how_much_owned += 1;
        upgrade_price_wrapper.innerHTML = formatDigit((upgrade.base_price * (1 + (0.1 * upgrade.how_much_owned))));
    });
    upgrades_wrapper.appendChild(upgrade_element);
}

function addRam(amount: number) {
    total_ram += amount;
    ram_count += amount;
    total_ram_ascention += amount;
}

setInterval(() => {
    ram_counter.innerText = formatDigit(ram_count);
}, 100);

setInterval(() => {
    for (const upgrade of upgrades) {
        if (upgrade.how_much_owned > 0) addRam(upgrade.how_much_owned * upgrade.how_much_gives);
    }
}, 1000);

ram_button.addEventListener('click', () => {
    addRam(1);
});

setInterval(() => {
    window.localStorage.setItem('gamedata', JSON.stringify({
        total_ram,
        ram_count,
        total_ram_ascention,
        ram_gen,
        upgrades
    }, undefined, 0));
}, 10_000);