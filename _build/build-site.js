/* Генератор статической вёрстки для site/.
 *
 * Нужен только чтобы шапка, подвал и карточки товаров были одинаковыми на всех
 * страницах. Результат — обычные HTML-файлы: их можно править руками и отдавать
 * кому угодно, генератор для этого не требуется.
 *
 * Запуск:  node _build/build-site.js
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'site');

const WA = '77712736525';
const PHONE_MOBILE = '+7 771 273 65 25';
const PHONE_OFFICE = '8 (7232) 50-15-37';
const EMAIL = 'elevator.kz@mail.ru';
const PRICE_DATE_RU = '25 августа 2026';
const PRICE_DATE_KK = '2026 жылғы 25 тамызға';

/* ------------------------------------------------------------------ данные */

const PRODUCTS = [
    {
        slug: 'muka-vysshiy-sort',
        type: 'wheat',
        color: 'var(--vysshiy)',
        colorLight: '#d7ecfa',
        gradeRu: 'Высший сорт', gradeKk: 'Жоғары сұрып',
        nameRu: 'Мука пшеничная хлебопекарная', nameKk: 'Наубайханалық бидай ұны',
        fullRu: 'Мука пшеничная высший сорт', fullKk: 'Жоғары сұрыпты бидай ұны',
        standard: '26574-2017',
        stock: 'in',
        hit: true,
        leadRu: 'Самая белая и тонкая мука из нашей линейки. Даёт светлый мякиш и стабильный подъём теста — берут пекарни, кондитерские и магазины.',
        leadKk: 'Біздің желідегі ең ақ әрі ұсақ тартылған ұн. Наны ақ, қамыры тұрақты көтеріледі — наубайханалар, кондитерлік цехтар мен дүкендер алады.',
        packs: [
            { ru: 'Мешок 50 кг', kk: '50 кг қап', price: 10500, per: 210 },
            { ru: 'Пакет 10 кг', kk: '10 кг қаптама', price: 2400, per: 240 },
            { ru: 'Пакет 5 кг', kk: '5 кг қаптама', price: 1300, per: 260 },
        ],
        nutrition: { protein: '12', fat: '1', carbs: '67', energy: '1360 кДж / 325 ккал' },
        usesRu: [
            'Формовой и подовый белый хлеб',
            'Сдоба, булочки, слоёное и дрожжевое тесто',
            'Кондитерские изделия, бисквиты, печенье',
            'Панировка, соусы, домашняя лапша',
        ],
        usesKk: [
            'Қалыпты және пеште пісірілген ақ нан',
            'Тәтті нан, тоқаш, қатпарлы және ашытқылы қамыр',
            'Кондитерлік өнімдер, бисквит, печенье',
            'Панировка, тұздықтар, үй кеспесі',
        ],
    },
    {
        slug: 'muka-pervyy-sort',
        type: 'wheat',
        color: 'var(--pervyy)',
        colorLight: '#fbe0cf',
        gradeRu: 'Первый сорт', gradeKk: 'Бірінші сұрып',
        nameRu: 'Мука пшеничная хлебопекарная', nameKk: 'Наубайханалық бидай ұны',
        fullRu: 'Мука пшеничная первый сорт', fullKk: 'Бірінші сұрыпты бидай ұны',
        standard: '26574-2017',
        stock: 'in',
        hit: false,
        leadRu: 'Рабочая мука для массовой выпечки. Хлеб получается ароматнее и дольше не черствеет, а цена ниже, чем у высшего сорта.',
        leadKk: 'Көпшілік нан өндірісіне арналған негізгі ұн. Наны хош иісті, ұзақ уақыт қатпайды, ал бағасы жоғары сұрыптан арзан.',
        packs: [
            { ru: 'Мешок 50 кг', kk: '50 кг қап', price: 9800, per: 196 },
            { ru: 'Пакет 10 кг', kk: '10 кг қаптама', price: 2250, per: 225 },
            { ru: 'Пакет 5 кг', kk: '5 кг қаптама', price: 1220, per: 244 },
        ],
        nutrition: { protein: '12', fat: '1', carbs: '67', energy: '1360 кДж / 325 ккал' },
        usesRu: [
            'Массовые сорта хлеба и лепёшки',
            'Баурсаки, самса, манты, чебуреки',
            'Блины, оладьи, домашняя выпечка',
            'Панировка и загустители',
        ],
        usesKk: [
            'Көпшілік нан сұрыптары мен таба нан',
            'Бауырсақ, самса, манты, шебурек',
            'Құймақ, оладьи, үй печеньесі',
            'Панировка және қоюлатқыштар',
        ],
    },
    {
        slug: 'muka-vtoroy-sort',
        type: 'wheat',
        color: 'var(--vtoroy)',
        colorLight: '#dcefd6',
        gradeRu: 'Второй сорт', gradeKk: 'Екінші сұрып',
        nameRu: 'Мука пшеничная хлебопекарная', nameKk: 'Наубайханалық бидай ұны',
        fullRu: 'Мука пшеничная второй сорт', fullKk: 'Екінші сұрыпты бидай ұны',
        standard: '26574-2017',
        stock: 'order',
        hit: false,
        leadRu: 'Мука с наибольшим содержанием оболочек зерна: тёмный мякиш, выраженный вкус. Берут под серый и ржано-пшеничный хлеб.',
        leadKk: 'Дән қабығының үлесі ең көп ұн: наны қоңырлау, дәмі айқын. Сұр және қара бидай-бидай наны үшін алынады.',
        packs: [
            { ru: 'Мешок 50 кг', kk: '50 кг қап', price: 8900, per: 178 },
        ],
        nutrition: { protein: '12', fat: '1', carbs: '67', energy: '1360 кДж / 325 ккал' },
        usesRu: [
            'Серый и ржано-пшеничный хлеб',
            'Пряники, галеты, коврижки',
            'Недорогая массовая выпечка',
        ],
        usesKk: [
            'Сұр және қара бидай-бидай наны',
            'Пряник, галета, коврижка',
            'Арзан көпшілік нан-тоқаш өнімдері',
        ],
    },
    {
        slug: 'muka-rzhanaya',
        type: 'rye',
        color: 'var(--rzhanaya)',
        colorLight: '#eddcc4',
        gradeRu: 'Ржаная', gradeKk: 'Қара бидай',
        nameRu: 'Мука ржаная хлебопекарная', nameKk: 'Наубайханалық қара бидай ұны',
        fullRu: 'Мука ржаная', fullKk: 'Қара бидай ұны',
        standard: '7045-2017',
        stock: 'in',
        hit: false,
        leadRu: 'Для ржаного и заварного хлеба, а также для заквасок. Даёт плотный влажный мякиш и характерный кисловатый вкус.',
        leadKk: 'Қара бидай наны мен қайнатылған қамырға, сондай-ақ ашытқыға арналған. Наны тығыз әрі дымқыл, дәмі қышқылдау.',
        packs: [
            { ru: 'Мешок 50 кг', kk: '50 кг қап', price: 9500, per: 190 },
            { ru: 'Пакет 10 кг', kk: '10 кг қаптама', price: 2150, per: 215 },
            { ru: 'Пакет 5 кг', kk: '5 кг қаптама', price: 1180, per: 236 },
        ],
        nutrition: { protein: '8,9', fat: '1,7', carbs: '61,0', energy: '1238 кДж / 296 ккал' },
        usesRu: [
            'Ржаной и ржано-пшеничный хлеб',
            'Заварной и бородинский хлеб',
            'Домашние закваски',
            'Пряники и постная выпечка',
        ],
        usesKk: [
            'Қара бидай және қара бидай-бидай наны',
            'Қайнатылған қамырлы нан',
            'Үй ашытқысы',
            'Пряник және майсыз нан-тоқаш',
        ],
    },
];

/* ------------------------------------------------------------- хелперы */

const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Двуязычный кусок: оба варианта лежат в разметке, CSS показывает нужный. */
const t = (ru, kk) => `<span lang="ru">${ru}</span><span lang="kk">${kk}</span>`;

const STOCK = {
    in: () => `<span class="badge badge--stock">${t('В наличии', 'Қоймада бар')}</span>`,
    order: () => `<span class="badge badge--order">${t('Под заказ', 'Тапсырыс бойынша')}</span>`,
    out: () => `<span class="badge badge--out">${t('Нет в наличии', 'Қоймада жоқ')}</span>`,
};

const NAV = [
    { href: 'catalog.html', ru: 'Каталог', kk: 'Каталог', key: 'catalog' },
    { href: 'price.html', ru: 'Прайс', kk: 'Бағалар', key: 'price' },
    { href: 'delivery.html', ru: 'Доставка', kk: 'Жеткізу', key: 'delivery' },
    { href: 'about.html', ru: 'О компании', kk: 'Компания туралы', key: 'about' },
    { href: 'contacts.html', ru: 'Контакты', kk: 'Байланыс', key: 'contacts' },
];

const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.25.69-1.45 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07s.77-2.18 1.04-2.48c.27-.3.59-.37.79-.37.2 0 .39 0 .57.01.18.01.42-.07.66.5.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.71.81 2.01.96.3.15.49.22.56.35.07.12.07.72-.18 1.41z"/></svg>';

/* ------------------------------------------------------------- каркас */

function layout(opts) {
    const nav = NAV.map((item) => {
        const current = item.key === opts.active ? ' aria-current="page"' : '';
        return `            <a href="${item.href}"${current}>${t(item.ru, item.kk)}</a>`;
    }).join('\n');

    const waAttrs = opts.waItemRu
        ? `data-wa-ru="${opts.waItemRu}" data-wa-kk="${opts.waItemKk}"`
        : 'data-wa-general';

    return `<!DOCTYPE html>
<html lang="ru" data-lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${opts.titleRu}</title>
<meta name="description" content="${opts.descRu}">
<meta property="og:type" content="${opts.ogType || 'website'}">
<meta property="og:title" content="${opts.titleRu}">
<meta property="og:description" content="${opts.descRu}">
<meta property="og:image" content="assets/img/${opts.ogImage || 'muka-vysshiy-sort.jpg'}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/site.css">
</head>
<body
    data-title-ru="${opts.titleRu}"
    data-title-kk="${opts.titleKk}"${opts.bodyStyle ? `\n    style="${opts.bodyStyle}"` : ''}>

<div class="demo-bar">
    ${t('<strong>Демонстрационная версия.</strong> Цены, режим работы и часть текстов — предварительные и требуют подтверждения.',
        '<strong>Демонстрациялық нұсқа.</strong> Бағалар, жұмыс уақыты және кейбір мәтіндер — алдын ала берілген, расталуы қажет.')}
</div>

<header class="header">
    <div class="wrap header__inner">
        <a class="logo" href="index.html">
            <img class="logo__mark" src="assets/img/logo-mark.svg" width="29" height="46" alt="" aria-hidden="true">
            <span>
                <span class="logo__name">Защитинский элеватор</span><br>
                <span class="logo__since">${t('основан 1928', '1928 жылы құрылған')}</span>
            </span>
        </a>

        <nav class="nav" id="nav">
${nav}
        </nav>

        <div class="header__side">
            <div class="lang" role="group" aria-label="Язык / Тіл">
                <button type="button" data-lang="ru" aria-pressed="true">RU</button>
                <button type="button" data-lang="kk" aria-pressed="false">ҚАЗ</button>
            </div>
            <a class="header__phone" href="tel:+${WA}">${PHONE_MOBILE}</a>
            <a class="btn btn--wa btn--sm" href="https://wa.me/${WA}" data-wa-general>WhatsApp</a>
            <button class="burger" type="button" aria-label="Меню" aria-expanded="false" aria-controls="nav">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                    <path d="M1 1h18M1 8h18M1 15h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    </div>
</header>

<main>
${opts.content}
</main>

<footer class="footer">
    <div class="wrap">
        <div class="footer__grid">
            <div>
                <h4>${t('Компания', 'Компания')}</h4>
                <p class="small">
                    ${t('ТОО «Защитинский элеватор»<br>Республика Казахстан, ВКО,<br>г. Усть-Каменогорск, ул. Элеваторная, 2',
                        '«Защитинский элеватор» ЖШС<br>Қазақстан Республикасы, ШҚО,<br>Өскемен қ., Элеваторная к-сі, 2')}
                </p>
            </div>
            <div>
                <h4>${t('Контакты', 'Байланыс')}</h4>
                <ul>
                    <li><a href="tel:+77232501537">${PHONE_OFFICE}</a></li>
                    <li><a href="tel:+${WA}">${PHONE_MOBILE}</a></li>
                    <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
                </ul>
            </div>
            <div>
                <h4>${t('Разделы', 'Бөлімдер')}</h4>
                <ul>
                    <li><a href="catalog.html">${t('Каталог', 'Каталог')}</a></li>
                    <li><a href="price.html">${t('Прайс-лист', 'Баға тізімі')}</a></li>
                    <li><a href="delivery.html">${t('Доставка и оплата', 'Жеткізу және төлем')}</a></li>
                    <li><a href="about.html">${t('О компании', 'Компания туралы')}</a></li>
                    <li><a href="contacts.html">${t('Контакты', 'Байланыс')}</a></li>
                </ul>
            </div>
        </div>
        <div class="footer__bottom">
            ${t('Информация на сайте не является публичной офертой. Цены уточняйте у менеджера.',
                'Сайттағы ақпарат жария оферта болып табылмайды. Бағаны менеджерден нақтылаңыз.')}
            <span>© 2026</span>
        </div>
    </div>
</footer>

<div class="mobile-bar">
    <a class="btn btn--wa" href="https://wa.me/${WA}" ${waAttrs}>
        ${t('Написать в WhatsApp', 'WhatsApp-қа жазу')}
    </a>
    <a class="btn btn--ghost" href="tel:+${WA}">
        ${t('Позвонить', 'Қоңырау шалу')}
    </a>
</div>

<script src="assets/js/site.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------- блоки */

function productCard(p) {
    const badges = [STOCK[p.stock]()];
    if (p.hit) badges.push(`<span class="badge badge--hit">${t('Хит', 'Танымал')}</span>`);

    const packsList = p.packs.map((x) => x.ru.replace(/\D*(\d+)\s*кг/, '$1')).join(', ');

    return `            <a class="card" href="${p.slug}.html" data-type="${p.type}" style="--sort:${p.color};--sort-light:${p.colorLight}">
                <div class="card__media">
                    <div class="card__badges">
                        ${badges.join('\n                        ')}
                    </div>
                    <img src="assets/img/${p.slug}.jpg" width="700" height="1216" loading="lazy"
                         alt="${p.fullRu}, мешок 50 кг">
                </div>
                <div class="card__body">
                    <div class="card__grade">${t(p.gradeRu, p.gradeKk)}</div>
                    <h3 class="card__name">${t(p.nameRu, p.nameKk)}</h3>
                    <div class="card__meta">${t(`ГОСТ ${p.standard} · ${packsList} кг`, `МЕМСТ ${p.standard} · ${packsList} кг`)}</div>
                    <div class="card__foot">
                        <div class="card__price">${money(p.packs[0].price)} ₸ <span>${t('/ мешок 50 кг', '/ 50 кг қап')}</span></div>
                        <div class="card__link">${t('Подробнее →', 'Толығырақ →')}</div>
                    </div>
                </div>
            </a>`;
}

function managerBlock(p) {
    const waAttrs = p
        ? `data-wa-ru="${p.fullRu}" data-wa-kk="${p.fullKk}"`
        : 'data-wa-general';

    return `        <div class="manager">
            <img class="manager__photo" src="assets/img/manager.svg" width="132" height="132" alt="Фото менеджера">
            <div>
                <div class="manager__role">${t('Менеджер по продажам', 'Сату жөніндегі менеджер')}</div>
                <p class="manager__name">Айдос</p>
                <p class="muted">
                    ${t('Подберу муку под вашу рецептуру, посчитаю доставку и отгружу со склада. Пишите в WhatsApp — отвечаю быстро, прайс присылаю сразу.',
                        'Рецептураңызға сай ұн таңдап беремін, жеткізу құнын есептеп, қоймадан тиеп жіберемін. WhatsApp-қа жазыңыз — тез жауап беремін, бағаны бірден жіберемін.')}
                </p>
            </div>
            <div class="manager__actions">
                <a class="btn btn--wa" href="https://wa.me/${WA}" ${waAttrs}>
                    ${t('Написать в WhatsApp', 'WhatsApp-қа жазу')}
                </a>
                <a class="btn btn--ghost" href="tel:+${WA}">${PHONE_MOBILE}</a>
            </div>
        </div>`;
}

function specRow(labelRu, labelKk, valueRu, valueKk) {
    return `                <tr>
                    <th>${t(labelRu, labelKk)}</th>
                    <td>${t(valueRu, valueKk)}</td>
                </tr>`;
}

/* ------------------------------------------------------------- страницы */

function pageProduct(p) {
    const rows = p.packs.map((pack) => `                        <tr>
                            <td class="pack__name">${t(pack.ru, pack.kk)}</td>
                            <td class="pack__price">${money(pack.price)} ₸</td>
                            <td class="pack__per">${pack.per} ₸/${t('кг', 'кг')}</td>
                            <td class="pack__cta">
                                <a class="btn btn--wa btn--sm" href="https://wa.me/${WA}"
                                   data-wa-ru="${p.fullRu}, ${pack.ru.toLowerCase()}"
                                   data-wa-kk="${p.fullKk}, ${pack.kk}">
                                    ${t('Заказать', 'Тапсырыс беру')}
                                </a>
                            </td>
                        </tr>`).join('\n');

    const packsList = p.packs.map((x) => x.ru.replace(/\D*(\d+)\s*кг/, '$1')).join(', ');

    const badges = [STOCK[p.stock]()];
    if (p.hit) badges.push(`<span class="badge badge--hit">${t('Хит продаж', 'Танымал')}</span>`);
    badges.push(`<span class="badge badge--sort">${t(`ГОСТ ${p.standard}`, `МЕМСТ ${p.standard}`)}</span>`);

    const uses = p.usesRu.map((ru, i) => `                    <li>${t(ru, p.usesKk[i])}</li>`).join('\n');

    const content = `<div class="wrap">

    <nav class="crumbs">
        <a href="index.html">${t('Главная', 'Басты бет')}</a><span>/</span>
        <a href="catalog.html">${t('Каталог', 'Каталог')}</a><span>/</span>
        ${t(p.fullRu, p.fullKk)}
    </nav>

    <div class="product">
        <div class="product__media">
            <img src="assets/img/${p.slug}.jpg" width="700" height="1216"
                 alt="${p.fullRu}, мешок 50 кг">
        </div>

        <div class="product__info">
            <div class="product__head">
                <div class="product__grade">${t(p.gradeRu, p.gradeKk)}</div>
                <h1>${t(p.nameRu, p.nameKk)}</h1>
                <div class="product__badges">
                    ${badges.join('\n                    ')}
                </div>
                <p class="lead">${t(p.leadRu, p.leadKk)}</p>
            </div>

            <div class="packs">
                <h3>${t('Фасовка и цены', 'Қаптамасы және бағасы')}</h3>
                <table class="pack-table">
                    <thead>
                        <tr>
                            <th>${t('Фасовка', 'Қаптамасы')}</th>
                            <th>${t('Цена', 'Бағасы')}</th>
                            <th>${t('За кг', 'Кг үшін')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
${rows}
                    </tbody>
                </table>
                <p class="price-note">
                    ${t(`Прайс актуален на ${PRICE_DATE_RU}. Цены указаны за единицу фасовки и не являются публичной офертой. При заказе от тонны цена обсуждается отдельно.`,
                        `Бағалар ${PRICE_DATE_KK} өзекті. Баға бір қаптама үшін көрсетілген және жария оферта болып табылмайды. Тоннадан асатын тапсырыс бойынша баға бөлек келісіледі.`)}
                </p>
            </div>

            <h3>${t('Характеристики', 'Сипаттамалары')}</h3>
            <table class="specs">
${specRow('Стандарт', 'Стандарт', `ГОСТ ${p.standard}`, `МЕМСТ ${p.standard}`)}
${specRow('Сорт', 'Сұрыбы', p.gradeRu, p.gradeKk)}
${specRow('Фасовка', 'Қаптамасы', `${packsList} кг`, `${packsList} кг`)}
${specRow('Срок хранения', 'Сақтау мерзімі', '12 месяцев', '12 ай')}
${specRow('Условия хранения', 'Сақтау шарттары',
        'Температура не более ±25 °C, влажность воздуха не более 70 %',
        'Температурасы ±25 °C-тан жоғары емес, ауаның ылғалдылығы 70 %-дан жоғары емес')}
${specRow('Минимальный заказ', 'Ең аз тапсырыс', 'От 1 мешка', '1 қаптан бастап')}
${specRow('Производитель', 'Өндіруші',
        'ТОО «Защитинский элеватор», Усть-Каменогорск',
        '«Защитинский элеватор» ЖШС, Өскемен')}
            </table>

            <h3 style="margin-top:26px">${t('Пищевая ценность на 100 г', '100 г өнімнің тағамдық құндылығы')}</h3>
            <table class="specs">
${specRow('Белок', 'Ақуыздар', `${p.nutrition.protein} г`, `${p.nutrition.protein} г`)}
${specRow('Жир', 'Майлар', `${p.nutrition.fat} г`, `${p.nutrition.fat} г`)}
${specRow('Углеводы', 'Көмірсулар', `${p.nutrition.carbs} г`, `${p.nutrition.carbs} г`)}
${specRow('Энергетическая ценность', 'Энергетикалық құндылығы', p.nutrition.energy, p.nutrition.energy)}
            </table>

            <div class="prose">
                <h3>${t('Для чего подходит', 'Не үшін қолайлы')}</h3>
                <ul>
${uses}
                </ul>
            </div>

            <p class="notice" style="margin-top:22px">
                ${t('Нужны показатели по клейковине и зольности под вашу рецептуру? Напишите менеджеру — пришлём документы о качестве на текущую партию.',
                    'Рецептураңызға желімше мен күлділік көрсеткіштері қажет пе? Менеджерге жазыңыз — ағымдағы партияға сапа құжаттарын жібереміз.')}
            </p>
        </div>
    </div>

    <section class="section">
${managerBlock(p)}
    </section>

</div>`;

    return layout({
        titleRu: `${p.fullRu} — Защитинский элеватор`,
        titleKk: `${p.fullKk} — Защитинский элеватор`,
        descRu: `${p.fullRu} по ГОСТ ${p.standard}. Фасовка ${packsList} кг. Усть-Каменогорск, доставка по городу и области.`,
        ogType: 'product',
        ogImage: `${p.slug}.jpg`,
        bodyStyle: `--sort:${p.color};--sort-light:${p.colorLight}`,
        active: 'catalog',
        waItemRu: p.fullRu,
        waItemKk: p.fullKk,
        content,
    });
}

function pageIndex() {
    const features = [
        ['С 1928 года', '1928 жылдан бері',
            'Предприятие работает в Усть-Каменогорске почти сто лет.',
            'Кәсіпорын Өскемен қаласында жүз жылға жуық жұмыс істеп келеді.'],
        ['По ГОСТ', 'МЕМСТ бойынша',
            'Пшеничная мука — ГОСТ 26574-2017, ржаная — ГОСТ 7045-2017.',
            'Бидай ұны — МЕМСТ 26574-2017, қара бидай ұны — МЕМСТ 7045-2017.'],
        ['Фасовка 5, 10, 50 кг', 'Қаптамасы 5, 10, 50 кг',
            'Мешки 50 кг для пекарен и мелкая фасовка для магазинов.',
            'Наубайханаларға 50 кг қап, дүкендерге ұсақ қаптама.'],
        ['Доставка по ВКО', 'ШҚО бойынша жеткізу',
            'Самовывоз со склада или доставка по городу и области.',
            'Қоймадан өзіңіз алып кетуге немесе қала мен облысқа жеткізуге болады.'],
    ].map(([tRu, tKk, dRu, dKk]) => `            <div class="feature">
                <div class="feature__title">${t(tRu, tKk)}</div>
                <p class="feature__text">${t(dRu, dKk)}</p>
            </div>`).join('\n');

    const steps = [
        ['Выберите муку', 'Ұнды таңдаңыз',
            'Сорт, фасовку и количество. Цены и характеристики — в карточке каждого товара.',
            'Сұрыбын, қаптамасын және мөлшерін. Бағасы мен сипаттамасы — әр өнімнің бетінде.'],
        ['Напишите в WhatsApp', 'WhatsApp-қа жазыңыз',
            'Кнопка на странице товара уже подставит название и фасовку — останется указать количество.',
            'Өнім бетіндегі түйме атауы мен қаптамасын өзі қояды — мөлшерін жазсаңыз болды.'],
        ['Заберите или получите', 'Алып кетіңіз немесе жеткіземіз',
            'Самовывоз со склада на Элеваторной, 2 или доставка по Усть-Каменогорску и области.',
            'Элеваторная көшесі, 2 мекенжайындағы қоймадан өзіңіз аласыз немесе Өскемен мен облысқа жеткіземіз.'],
    ].map(([hRu, hKk, pRu, pKk]) => `            <div class="step">
                <h3>${t(hRu, hKk)}</h3>
                <p>${t(pRu, pKk)}</p>
            </div>`).join('\n');

    const content = `<section class="hero">
    <div class="wrap hero__inner">
        <div class="hero__text">
            <img class="seal" src="assets/img/logo.svg" width="84" height="84" alt="Логотип Защитинского элеватора">
            <h1>${t('Мука пшеничная и ржаная от производителя', 'Өндірушіден бидай және қара бидай ұны')}</h1>
            <p class="lead">
                ${t('Защитинский элеватор работает в Усть-Каменогорске с 1928 года. Мука высшего, первого и второго сорта, а также ржаная. Фасовка 5, 10 и 50 кг, отгрузка со склада на Элеваторной, 2.',
                    'Защитинский элеватор Өскемен қаласында 1928 жылдан бері жұмыс істейді. Жоғары, бірінші және екінші сұрыпты бидай ұны, сондай-ақ қара бидай ұны. Қаптамасы 5, 10 және 50 кг, Элеваторная көшесі, 2 мекенжайындағы қоймадан тиеу.')}
            </p>

            <div class="hero__actions">
                <a class="btn btn--primary" href="catalog.html">${t('Смотреть каталог', 'Каталогты қарау')}</a>
                <a class="btn btn--wa" href="https://wa.me/${WA}" data-wa-general>
                    ${WA_ICON}
                    ${t('Написать в WhatsApp', 'WhatsApp-қа жазу')}
                </a>
            </div>

            <span class="price-stamp">${t(`Прайс актуален на ${PRICE_DATE_RU}`, `Бағалар ${PRICE_DATE_KK} өзекті`)}</span>
        </div>

        <div class="hero__media">
            <img src="assets/img/muka-vysshiy-sort.jpg" width="700" height="1216"
                 alt="Мешок муки пшеничной высшего сорта Защитинского элеватора, 50 кг">
        </div>
    </div>
</section>

<section class="section section--tight">
    <div class="wrap">
        <div class="features">
${features}
        </div>
    </div>
</section>

<section class="section section--surface">
    <div class="wrap">
        <div class="section-head">
            <h2>${t('Наша продукция', 'Біздің өнім')}</h2>
            <a class="btn btn--ghost btn--sm" href="price.html">${t('Весь прайс одной таблицей', 'Барлық бағалар бір кестеде')}</a>
        </div>

        <div class="grid-products">
${PRODUCTS.map(productCard).join('\n\n')}
        </div>
    </div>
</section>

<section class="section">
    <div class="wrap">
        <h2>${t('Ваш менеджер', 'Сіздің менеджеріңіз')}</h2>
${managerBlock(null)}
    </div>
</section>

<section class="section section--sand">
    <div class="wrap">
        <h2>${t('Как заказать', 'Қалай тапсырыс беруге болады')}</h2>
        <div class="steps">
${steps}
        </div>
    </div>
</section>`;

    return layout({
        titleRu: 'Защитинский элеватор — мука пшеничная и ржаная в Усть-Каменогорске',
        titleKk: 'Защитинский элеватор — Өскемендегі бидай және қара бидай ұны',
        descRu: 'Мука пшеничная высшего, первого и второго сорта и мука ржаная от Защитинского элеватора. Фасовка 5, 10 и 50 кг. Усть-Каменогорск, доставка по городу и ВКО.',
        active: '',
        content,
    });
}

function pageCatalog() {
    const content = `<section class="section">
    <div class="wrap">
        <h1>${t('Каталог продукции', 'Өнім каталогы')}</h1>
        <p class="lead" style="max-width:760px">
            ${t('Мука пшеничная хлебопекарная трёх сортов и мука ржаная. Фасовка 5, 10 и 50 кг, отгрузка со склада в Усть-Каменогорске.',
                'Үш сұрыпты наубайханалық бидай ұны және қара бидай ұны. Қаптамасы 5, 10 және 50 кг, Өскемендегі қоймадан тиеу.')}
        </p>

        <div class="filters" style="margin-top:22px" role="group" aria-label="Фильтр">
            <button type="button" data-filter="all" aria-pressed="true">${t('Все', 'Барлығы')}</button>
            <button type="button" data-filter="wheat" aria-pressed="false">${t('Пшеничная', 'Бидай ұны')}</button>
            <button type="button" data-filter="rye" aria-pressed="false">${t('Ржаная', 'Қара бидай ұны')}</button>
        </div>

        <div class="grid-products">
${PRODUCTS.map(productCard).join('\n\n')}
        </div>

        <p class="price-note" style="margin-top:22px">
            ${t(`Прайс актуален на ${PRICE_DATE_RU}. Указана цена за мешок 50 кг — цены на мелкую фасовку смотрите в карточке товара.`,
                `Бағалар ${PRICE_DATE_KK} өзекті. 50 кг қаптың бағасы көрсетілген — ұсақ қаптама бағасын өнім бетінен қараңыз.`)}
        </p>
    </div>
</section>

<section class="section section--sand">
    <div class="wrap">
${managerBlock(null)}
    </div>
</section>`;

    return layout({
        titleRu: 'Каталог — мука пшеничная и ржаная | Защитинский элеватор',
        titleKk: 'Каталог — бидай және қара бидай ұны | Защитинский элеватор',
        descRu: 'Мука пшеничная высшего, первого и второго сорта и мука ржаная. Фасовка 5, 10 и 50 кг. Усть-Каменогорск.',
        active: 'catalog',
        content,
    });
}

function pagePrice() {
    const groups = PRODUCTS.map((p) => {
        const head = `                <tr class="grp"><td colspan="4">${t(`${p.fullRu} · ГОСТ ${p.standard}`, `${p.fullKk} · МЕМСТ ${p.standard}`)}</td></tr>`;
        const rows = p.packs.map((pack) => `                <tr>
                    <td>${t(pack.ru, pack.kk)}</td>
                    <td class="num">${money(pack.price)} ₸</td>
                    <td class="num">${pack.per} ₸</td>
                    <td>${STOCK[p.stock]()}</td>
                </tr>`).join('\n');
        return `${head}\n${rows}`;
    }).join('\n');

    const content = `<section class="section">
    <div class="wrap">
        <div class="section-head">
            <div>
                <h1 style="margin-bottom:10px">${t('Прайс-лист', 'Баға тізімі')}</h1>
                <span class="price-stamp">${t(`Актуален на ${PRICE_DATE_RU}`, `${PRICE_DATE_KK} өзекті`)}</span>
            </div>
            <div class="no-print" style="display:flex;gap:10px;flex-wrap:wrap">
                <button class="btn btn--ghost btn--sm" type="button" onclick="window.print()">
                    ${t('Распечатать', 'Басып шығару')}
                </button>
                <a class="btn btn--wa btn--sm" href="https://wa.me/${WA}" data-wa-general>
                    ${t('Запросить прайс в WhatsApp', 'WhatsApp арқылы сұрау')}
                </a>
            </div>
        </div>

        <table class="price-table">
            <thead>
                <tr>
                    <th>${t('Фасовка', 'Қаптамасы')}</th>
                    <th class="num" style="text-align:right">${t('Цена', 'Бағасы')}</th>
                    <th class="num" style="text-align:right">${t('За кг', 'Кг үшін')}</th>
                    <th>${t('Наличие', 'Бар-жоғы')}</th>
                </tr>
            </thead>
            <tbody>
${groups}
            </tbody>
        </table>

        <p class="price-note">
            ${t('Цены указаны в тенге за единицу фасовки и не являются публичной офертой. Стоимость доставки в цену не входит. При заказе от тонны цена обсуждается отдельно.',
                'Бағалар теңгемен, бір қаптама үшін көрсетілген және жария оферта болып табылмайды. Жеткізу құны бағаға кірмейді. Тоннадан асатын тапсырыс бойынша баға бөлек келісіледі.')}
        </p>
    </div>
</section>

<section class="section section--sand no-print">
    <div class="wrap">
${managerBlock(null)}
    </div>
</section>`;

    return layout({
        titleRu: 'Прайс-лист на муку — Защитинский элеватор',
        titleKk: 'Ұн бағасының тізімі — Защитинский элеватор',
        descRu: 'Актуальные цены на муку пшеничную высшего, первого и второго сорта и ржаную. Фасовка 5, 10 и 50 кг.',
        active: 'price',
        content,
    });
}

function pageAbout() {
    const content = `<section class="section">
    <div class="wrap" style="max-width:900px">
        <h1>${t('О компании', 'Компания туралы')}</h1>

        <div class="about-intro">
            <img class="seal" src="assets/img/logo.svg" width="150" height="150" alt="Логотип Защитинского элеватора">
            <p class="lead">
                ${t('«Защитинский элеватор» — зерноперерабатывающее предприятие в Усть-Каменогорске. На нашей упаковке стоит год основания — 1928.',
                    '«Защитинский элеватор» — Өскемен қаласындағы астық өңдеу кәсіпорны. Қаптамамызда құрылған жылы көрсетілген — 1928.')}
            </p>
        </div>

        <div class="prose">
            <h3>${t('Что мы производим', 'Не өндіреміз')}</h3>
            <p>
                ${t('Муку пшеничную хлебопекарную высшего, первого и второго сорта по ГОСТ 26574-2017 и муку ржаную хлебопекарную по ГОСТ 7045-2017. Фасуем в мешки по 50 кг для пекарен и производств, а также в пакеты по 10 и 5 кг для магазинов и розницы.',
                    'Жоғары, бірінші және екінші сұрыпты наубайханалық бидай ұнын МЕМСТ 26574-2017 бойынша және наубайханалық қара бидай ұнын МЕМСТ 7045-2017 бойынша өндіреміз. Наубайханалар мен өндірістерге 50 кг қапқа, дүкендер мен бөлшек саудаға 10 және 5 кг қаптамаға саламыз.')}
            </p>

            <h3>${t('Кто у нас покупает', 'Бізден кім сатып алады')}</h3>
            <ul>
                <li>${t('Пекарни и хлебозаводы', 'Наубайханалар мен нан зауыттары')}</li>
                <li>${t('Кондитерские цеха', 'Кондитерлік цехтар')}</li>
                <li>${t('Магазины и оптовые базы', 'Дүкендер мен көтерме базалар')}</li>
                <li>${t('Кафе, столовые и общепит', 'Дәмханалар, асханалар мен қоғамдық тамақтандыру')}</li>
            </ul>

            <h3>${t('Качество и документы', 'Сапа және құжаттар')}</h3>
            <p>
                ${t('Продукция выпускается по государственным стандартам, указанным на упаковке. На отгружаемую партию предоставляем документы о качестве — запросите их у менеджера вместе с прайсом.',
                    'Өнім қаптамада көрсетілген мемлекеттік стандарттар бойынша шығарылады. Тиелетін партияға сапа құжаттарын береміз — оларды менеджерден баға тізімімен бірге сұраңыз.')}
            </p>

            <h3>${t('Где нас найти', 'Бізді қайдан табуға болады')}</h3>
            <p>
                ${t('Склад и отгрузка — Усть-Каменогорск, улица Элеваторная, 2. Самовывоз или доставка по городу и Восточно-Казахстанской области.',
                    'Қойма және тиеу — Өскемен қаласы, Элеваторная көшесі, 2. Өзіңіз алып кетуге немесе қала мен Шығыс Қазақстан облысына жеткізуге болады.')}
            </p>
        </div>

        <div class="info-grid" style="margin-top:30px">
            <div class="info-card">
                <h3>${t('Пшеничная мука', 'Бидай ұны')}</h3>
                <p class="muted">${t('Высший, первый и второй сорт. ГОСТ 26574-2017.', 'Жоғары, бірінші және екінші сұрып. МЕМСТ 26574-2017.')}</p>
                <a class="btn btn--ghost btn--sm" href="catalog.html" style="margin-top:12px">${t('Смотреть', 'Қарау')}</a>
            </div>
            <div class="info-card">
                <h3>${t('Ржаная мука', 'Қара бидай ұны')}</h3>
                <p class="muted">${t('Для ржаного, заварного хлеба и заквасок. ГОСТ 7045-2017.', 'Қара бидай наны, қайнатылған қамыр және ашытқы үшін. МЕМСТ 7045-2017.')}</p>
                <a class="btn btn--ghost btn--sm" href="muka-rzhanaya.html" style="margin-top:12px">${t('Смотреть', 'Қарау')}</a>
            </div>
        </div>
    </div>
</section>

<section class="section section--sand">
    <div class="wrap">
${managerBlock(null)}
    </div>
</section>`;

    return layout({
        titleRu: 'О компании — Защитинский элеватор, Усть-Каменогорск',
        titleKk: 'Компания туралы — Защитинский элеватор, Өскемен',
        descRu: 'Защитинский элеватор — зерноперерабатывающее предприятие в Усть-Каменогорске. Мука пшеничная и ржаная по ГОСТ.',
        active: 'about',
        content,
    });
}

function pageDelivery() {
    const content = `<section class="section">
    <div class="wrap" style="max-width:900px">
        <h1>${t('Доставка и оплата', 'Жеткізу және төлем')}</h1>

        <div class="info-grid" style="margin-top:20px">
            <div class="info-card">
                <h3>${t('Самовывоз', 'Өзіңіз алып кету')}</h3>
                <p>${t('Склад: Усть-Каменогорск, ул. Элеваторная, 2. Загрузка своим транспортом, отгрузка в день обращения при наличии на складе.',
                        'Қойма: Өскемен қаласы, Элеваторная көшесі, 2. Өз көлігіңізбен тиеу, қоймада бар болса — сол күні тиеп жіберіледі.')}</p>
            </div>
            <div class="info-card">
                <h3>${t('Доставка по городу', 'Қала бойынша жеткізу')}</h3>
                <p>${t('Доставляем по Усть-Каменогорску. Стоимость зависит от объёма заказа и адреса — уточните у менеджера.',
                        'Өскемен бойынша жеткіземіз. Құны тапсырыс көлемі мен мекенжайға байланысты — менеджерден нақтылаңыз.')}</p>
            </div>
            <div class="info-card">
                <h3>${t('Доставка по области', 'Облыс бойынша жеткізу')}</h3>
                <p>${t('Отправляем по Восточно-Казахстанской области. Сроки и стоимость рассчитываем по направлению и объёму.',
                        'Шығыс Қазақстан облысы бойынша жөнелтеміз. Мерзімі мен құнын бағыт пен көлемге қарай есептейміз.')}</p>
            </div>
            <div class="info-card">
                <h3>${t('Оплата', 'Төлем')}</h3>
                <p>${t('Наличными при получении, переводом на карту или по счёту для юридических лиц и ИП.',
                        'Қолма-қол, картаға аудару немесе заңды тұлғалар мен ЖК үшін шот бойынша.')}</p>
            </div>
        </div>

        <p class="notice" style="margin-top:24px">
            ${t('Условия доставки и оплаты предварительные. Точную стоимость доставки, сроки и способ оплаты уточните у менеджера — рассчитаем под ваш заказ.',
                'Жеткізу мен төлем шарттары алдын ала берілген. Нақты жеткізу құнын, мерзімін және төлем тәсілін менеджерден нақтылаңыз — тапсырысыңызға есептеп береміз.')}
        </p>

        <div class="prose" style="margin-top:30px">
            <h3>${t('Как оформить заказ', 'Тапсырысты қалай ресімдеу керек')}</h3>
            <ol>
                <li>${t('Выберите сорт муки и фасовку в каталоге.', 'Каталогтан ұн сұрыбы мен қаптамасын таңдаңыз.')}</li>
                <li>${t('Нажмите «Заказать» — откроется WhatsApp с готовым текстом.', '«Тапсырыс беру» түймесін басыңыз — дайын мәтінмен WhatsApp ашылады.')}</li>
                <li>${t('Укажите количество и адрес — менеджер посчитает доставку.', 'Мөлшері мен мекенжайды жазыңыз — менеджер жеткізуді есептейді.')}</li>
                <li>${t('Согласуйте оплату и время отгрузки.', 'Төлем мен тиеу уақытын келісіңіз.')}</li>
            </ol>
        </div>
    </div>
</section>

<section class="section section--sand">
    <div class="wrap">
${managerBlock(null)}
    </div>
</section>`;

    return layout({
        titleRu: 'Доставка и оплата — Защитинский элеватор',
        titleKk: 'Жеткізу және төлем — Защитинский элеватор',
        descRu: 'Самовывоз со склада на Элеваторной, 2, доставка по Усть-Каменогорску и ВКО. Оплата наличными, переводом или по счёту.',
        active: 'delivery',
        content,
    });
}

function pageContacts() {
    const content = `<section class="section">
    <div class="wrap">
        <h1>${t('Контакты', 'Байланыс')}</h1>

        <div style="margin:24px 0">
${managerBlock(null)}
        </div>

        <div class="info-grid">
            <div class="info-card">
                <h3>${t('Реквизиты и адрес', 'Деректемелер және мекенжай')}</h3>
                <ul class="contact-list">
                    <li><span class="k">${t('Компания', 'Компания')}</span><span class="v">${t('ТОО «Защитинский элеватор»', '«Защитинский элеватор» ЖШС')}</span></li>
                    <li><span class="k">${t('Адрес', 'Мекенжайы')}</span><span class="v">${t('ВКО, г. Усть-Каменогорск, ул. Элеваторная, 2', 'ШҚО, Өскемен қ., Элеваторная к-сі, 2')}</span></li>
                    <li><span class="k">${t('Телефон', 'Телефон')}</span><span class="v"><a href="tel:+77232501537">${PHONE_OFFICE}</a></span></li>
                    <li><span class="k">${t('Мобильный', 'Ұялы')}</span><span class="v"><a href="tel:+${WA}">${PHONE_MOBILE}</a></span></li>
                    <li><span class="k">E-mail</span><span class="v"><a href="mailto:${EMAIL}">${EMAIL}</a></span></li>
                    <li><span class="k">${t('Режим работы', 'Жұмыс уақыты')}</span><span class="v">${t('Пн–Пт 9:00–18:00', 'Дс–Жм 9:00–18:00')}</span></li>
                </ul>
                <p class="tiny muted" style="margin-top:12px">
                    ${t('Режим работы указан предварительно — уточните у менеджера.', 'Жұмыс уақыты алдын ала көрсетілген — менеджерден нақтылаңыз.')}
                </p>
            </div>

            <div class="info-card">
                <h3>${t('Склад и отгрузка', 'Қойма және тиеу')}</h3>
                <p>${t('Отгрузка со склада на улице Элеваторной, 2 в Усть-Каменогорске. Приезжайте своим транспортом или закажите доставку по городу и области.',
                        'Өскемен қаласындағы Элеваторная көшесі, 2 мекенжайындағы қоймадан тиеу. Өз көлігіңізбен келіңіз немесе қала мен облысқа жеткізуге тапсырыс беріңіз.')}</p>
                <a class="btn btn--ghost btn--sm" style="margin-top:14px" target="_blank" rel="noopener"
                   href="https://2gis.kz/oskemen/search/%D0%AD%D0%BB%D0%B5%D0%B2%D0%B0%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F%202">
                    ${t('Открыть в 2ГИС', '2ГИС-те ашу')}
                </a>
                <p class="tiny muted" style="margin-top:12px">
                    ${t('Точку на карте нужно подтвердить у клиента.', 'Картадағы нүктені клиенттен растау қажет.')}
                </p>
            </div>
        </div>
    </div>
</section>`;

    return layout({
        titleRu: 'Контакты — Защитинский элеватор, Усть-Каменогорск',
        titleKk: 'Байланыс — Защитинский элеватор, Өскемен',
        descRu: 'Адрес склада, телефоны и WhatsApp менеджера Защитинского элеватора в Усть-Каменогорске.',
        active: 'contacts',
        content,
    });
}

/* ------------------------------------------------------------- сборка */

const files = {
    'index.html': pageIndex(),
    'catalog.html': pageCatalog(),
    'price.html': pagePrice(),
    'about.html': pageAbout(),
    'delivery.html': pageDelivery(),
    'contacts.html': pageContacts(),
};

PRODUCTS.forEach((p) => { files[`${p.slug}.html`] = pageProduct(p); });

Object.entries(files).forEach(([name, html]) => {
    fs.writeFileSync(path.join(OUT, name), html, 'utf8');
    console.log('written: site/' + name);
});
