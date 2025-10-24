function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const buttons = document.querySelectorAll('.sidebar .btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const screenMap = {
        'home': 'homeScreen',
        'laticinios': 'laticiniosScreen',
        'cereais': 'cereaisScreen',
        'hortifruti': 'hortigrutiScreen',
        'carnes': 'carnesScreen',
        'frios': 'friosScreen',
        'mercearia': 'merceariaScreen',
        'padaria': 'padariaScreen',
        'bebidas': 'bebidasScreen',
        'higiene': 'higieneScreen',
        'petshop': 'petshopScreen'
    };

    const screenId = screenMap[screenName];
    if (screenId) {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }
}

function showProduct(productName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    if (productName === 'leite') {
        document.getElementById('leiteScreen').classList.add('active');
    } else {
        alert('Tela do produto: ' + productName);
    }
}

document.querySelector('.accessibility-btn').addEventListener('click', function () {
    alert('Recursos de acessibilidade');
});