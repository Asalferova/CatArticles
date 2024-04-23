'use strict';

const articlesData = [
    {
        id: 1,
        category: 'Спящие коты',
        img: './img/cat1.jpg',
        heading: 'В приветливом роду кошачьем…',
        text: 'Кошки трутся об людей, чтобы пометить их как свою территорию.'
    },
    {
        id: 9,
        category: 'Милые коты',
        img: './img/cat2.jpg',
        heading: 'Живут на земле существа неземной красоты…',
        text: 'Мурлыканье кошек — это один из способов общения с окружающим миром. '
    },
    {
        id: 2,
        category: 'Милые коты',
        img: './img/cat3.jpg',
        heading: 'Киска, я тебя знаю!',
        text: 'Нормальная продолжительность жизни домашней кошки — 12–15 лет. Бывают долгожители, которые доживают до 25 лет.'
    },
    {
        id: 3,
        category: 'Спящие коты',
        img: './img/cat4.jpg',
        heading: 'Кошки — мяу — это кошки!',
        text: 'Глаза кошки расположены так, что обеспечивают ей обзор в 200° без необходимости поворачивать голову. '
    },
    {
        id: 4,
        category: 'Милые коты',
        img: './img/cat5.jpg',
        heading: 'Кошки – очарование моё…',
        text: 'Хвост кошки — своеобразный руль при прыжках. Также считается, что хвост кошек служит неким вентилятором для терморегуляции температуры тела. '
    },
    {
        id: 5,
        category: 'Несколько котов',
        img: './img/cat6.jpg',
        heading: 'Кошки не похожи на людей',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae neque reiciendis omnis impedit suscipit, fugiat autem distinctio eum? Mollitia, obcaecati quod? Optio sit quo odit?'
    },
    {
        id: 6,
        category: 'Коты в постели',
        img: './img/cat7.jpg',
        heading: 'Кошки разные нужны, кошки всякие важны…',
        text: 'У кошек более 20 различных мышц отвечают за движение ушей.'
    },
    {
        id: 7,
        category: 'Милые коты',
        img: './img/cat8.jpg',
        heading: 'Кто сказал мяу?',
        text: 'Кошки могут видеть в темноте. Это происходит благодаря наличию специального слоя в глазах, который находится за сетчаткой и отражает свет обратно на фоторецепторы.'
    },
    {
        id: 8,
        category: 'Несколько котов',
        img: './img/cat9.jpg',
        heading: 'Мой друг растрепанно-пушистый…',
        text: 'Кошки умеют прятаться и непринуждённо приспосабливаться к окружающей среде, что позволяет им оставаться независимыми существами и в то же время быть частью нашей жизни. '
    },
]

// Получение элементов DOM
const articlesEl = document.querySelector('.articles');
const selectElement = document.querySelector("#categories");
const searchInput = document.querySelector('[type="search"]');
const addBtn = document.querySelector('.article__add-button');

// Функция для сохранения данных в localStorage
function saveToLocalStorage(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
};

// Функция для создания HTML статьи
function getArticleHtml(article) {
    return `
        <div class="article" data-id=${article.id}>
            <img src="${article.img}" alt="" class="article__img">
            <p class="article__category">${article.category}</p>
            <h1 class="article__heading">${article.heading}</h1>
            <p class="article__text">${article.text.length > 50 ? article.text.slice(0, 50) + '...' : article.text}</p>
            <div class="buttons"><button class="remove">Удалить статью</button>
            <button class="edit">Редактировать статью</button></div>
            
        </div>
    `;
};

// Функция для отображения статей
function showArticles(articleList) {
    articleList.forEach((element) => {
        articlesEl.insertAdjacentHTML(
            "beforeend",
            getArticleHtml(element)
        );
    });
};

// Функция для фильтрации статей по заголовку
function contains(query) {
    return articles.filter((article) =>
        article.heading.toLowerCase().includes(query.toLowerCase())
    );
};

// Обработчик ввода в поле поиска
function handleInput(e) {
    const { value } = e.target
    articlesEl.innerHTML = "";
    contains(value).forEach((element) => {
        articlesEl.insertAdjacentHTML(
            "beforeend",
            getArticleHtml(element)
        );
    });
};

// Функция debounce для предотвращения частого вызова функции
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Обработчик событий для выбора категории
selectElement.addEventListener("change", function (e) {
    articlesEl.innerHTML = "";
    const filteredData =
        e.target.value === "all"
            ? articles
            : articles.filter((article) => article.category === e.target.value);

    showArticles(filteredData);
});

// Обработчик событий для добавления новой статьи
addBtn.addEventListener('click', function () {
    const heading = prompt('Введите заголовок статьи');
    const text = prompt('Введите текст статьи');
    const img = prompt('Введите ссылку (не файл) на картинку статьи. По желанию');
    const category = prompt('Введите категорию для статьи');
    if (heading && text && category) {
        const article = {
            id: Date.now(),
            img,
            heading,
            text,
            category
        }
        articles.push(article);
        saveToLocalStorage(localStorageKey, articles);
        articlesEl.insertAdjacentHTML('beforeend', getArticleHtml(article));
    }

});

// Обработчик событий для кликов на элементе статей
articlesEl.addEventListener('click', (e) => {
    // Если кликнутый элемент содержит класс 'remove' - удаляем статью
    if (e.target.classList.contains('remove')) {
        const parentEl = e.target.closest('.article');
        parentEl.remove();
        const id = +parentEl.dataset.id
        const indexArticle = articles.findIndex((article) => article.id === id)
        articles.splice(indexArticle, 1);
        saveToLocalStorage(localStorageKey, articles);
    } else if (e.target.classList.contains('edit')) {
       // Редактирование статьи
        const newText = prompt('Введите новый текст статьи');
        const newTitle = prompt('Введите новый заголовок для статьи');
        const newImg = prompt('Введите ссылку(не файл) на новую картинку для статьи. По желанию.');
        const newCategory = prompt('Введите новую категорию товара');
        if (newTitle && newText) {

            const parentEl = e.target.closest('.article');
            [...parentEl.children].forEach((el) => {
                if (el.classList.contains('article__heading')) {
                    el.textContent = newTitle;
                }
                if (el.classList.contains('article__text')) {
                    el.textContent = newText;
                }
                if (el.classList.contains('article__img')) {
                    el.src = newImg;
                }
            })
            const id = +parentEl.dataset.id
            console.log(id);
            const indexArticle = articles.findIndex((article) => article.id === id)
            articles[indexArticle] = { id, heading: newTitle, text: newText, img: newImg, category: newCategory };
            saveToLocalStorage(localStorageKey, articles);
        }

    } else {
        return
    }

});

// Использование debounce с handleInput и задержкой в 300 мс
searchInput.addEventListener('input', debounce(handleInput, 300));

const localStorageKey = 'articles';

let articles;
try {
    const data = localStorage.getItem(localStorageKey);
    if (!data) {
        saveToLocalStorage(localStorageKey, articlesData)
    }
    articles = JSON.parse(localStorage.getItem(localStorageKey));
} catch (error) {
    console.error('Ошибка при чтении из localStorage:', error);
    articles = [];
};

const articlesHtml = articles.map((article) => getArticleHtml(article)).join('');

articlesEl.insertAdjacentHTML('beforeend', articlesHtml);

const categories = new Set(articles.map((article) => article.category));
categories.forEach((element) => {
    selectElement.insertAdjacentHTML(
        "beforeend",
        `<option value="${element}">${element}</option>`
    );
});






