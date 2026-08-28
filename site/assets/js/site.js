/* Защитинский элеватор — минимальный скрипт статической вёрстки.
   Всё работает и при открытии файла напрямую (file://), без сервера. */

(function () {
    'use strict';

    var WHATSAPP = '77712736525';

    /* Шаблоны сообщения в WhatsApp: подставляется название товара с фасовкой */
    var WA_TEXT = {
        ru: {
            item: 'Здравствуйте! Пишу с сайта. Интересует: {item}. Подскажите, пожалуйста, цену и наличие.',
            general: 'Здравствуйте! Пишу с сайта Защитинского элеватора. Хочу уточнить цены и наличие муки.'
        },
        kk: {
            item: 'Сәлеметсіз бе! Сайт арқылы жазып отырмын. Қызықтырады: {item}. Бағасы мен бар-жоғын айтып жіберіңізші.',
            general: 'Сәлеметсіз бе! Защитинский элеватор сайты арқылы жазып отырмын. Ұнның бағасы мен бар-жоғын білгім келеді.'
        }
    };

    /* ---------- Хранилище (на file:// localStorage может быть недоступен) ---------- */

    function readLang() {
        try { return window.localStorage.getItem('lang'); } catch (e) { return null; }
    }

    function saveLang(value) {
        try { window.localStorage.setItem('lang', value); } catch (e) { /* не критично */ }
    }

    /* ---------- Ссылки в WhatsApp ---------- */

    function refreshWhatsAppLinks(lang) {
        var pack = WA_TEXT[lang] || WA_TEXT.ru;
        var links = document.querySelectorAll('[data-wa-ru], [data-wa-general]');

        Array.prototype.forEach.call(links, function (link) {
            var text;

            if (link.hasAttribute('data-wa-general')) {
                text = pack.general;
            } else {
                var item = link.getAttribute(lang === 'kk' ? 'data-wa-kk' : 'data-wa-ru');
                if (!item) { item = link.getAttribute('data-wa-ru'); }
                text = pack.item.replace('{item}', item);
            }

            link.setAttribute('href', 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text));
        });
    }

    /* ---------- Переключение языка ---------- */

    function applyLang(lang) {
        var root = document.documentElement;

        root.setAttribute('data-lang', lang);
        root.setAttribute('lang', lang === 'kk' ? 'kk' : 'ru');

        var title = document.body.getAttribute(lang === 'kk' ? 'data-title-kk' : 'data-title-ru');
        if (title) { document.title = title; }

        Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (btn) {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
        });

        refreshWhatsAppLinks(lang);
    }

    /* ---------- Мобильное меню ---------- */

    function initBurger() {
        var burger = document.querySelector('.burger');
        var nav = document.querySelector('.nav');
        if (!burger || !nav) { return; }

        burger.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', String(open));
        });
    }

    /* ---------- Фильтр каталога ---------- */

    function initFilters() {
        var buttons = document.querySelectorAll('.filters button');
        if (!buttons.length) { return; }

        Array.prototype.forEach.call(buttons, function (btn) {
            btn.addEventListener('click', function () {
                var filter = btn.getAttribute('data-filter');

                Array.prototype.forEach.call(buttons, function (other) {
                    other.setAttribute('aria-pressed', String(other === btn));
                });

                Array.prototype.forEach.call(document.querySelectorAll('[data-type]'), function (card) {
                    var show = filter === 'all' || card.getAttribute('data-type') === filter;
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    /* ---------- Запуск ---------- */

    function init() {
        applyLang(readLang() === 'kk' ? 'kk' : 'ru');

        Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (btn) {
            btn.addEventListener('click', function () {
                var lang = btn.getAttribute('data-lang');
                saveLang(lang);
                applyLang(lang);
            });
        });

        initBurger();
        initFilters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
