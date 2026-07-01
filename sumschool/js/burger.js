function burgerMenu() {
    const header = document.querySelector('.header-container');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.burger-menu');
    if (!header || !burger || !menu) return;


    function syncDesktopDropdownWidth(dropdown) {
        const toggle = dropdown.querySelector('.burger-dropdown-toggle');
        const list = dropdown.querySelector('.burger-dropdown-list');
        if (!toggle || !list) return;

        dropdown.style.removeProperty('--nav-dropdown-open-width');
        const openWidth = Math.max(toggle.scrollWidth, list.scrollWidth);
        dropdown.style.setProperty('--nav-dropdown-open-width', `${Math.ceil(openWidth)}px`);
    }

    if (burger.dataset.burgerInitialized === 'true') {
        return;
    }
    burger.dataset.burgerInitialized = 'true';

    const burgerImg = burger.querySelector('img');
    const iconOpen = burger.dataset.iconOpen || (burgerImg && burgerImg.src) || '';
    const iconClose = burger.dataset.iconClose || iconOpen;

    burger.addEventListener('click', function() {
        const isOpen = header.classList.toggle('menu-open');
        menu.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        menu.setAttribute('aria-hidden', String(!isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
        if (burgerImg) {
            burgerImg.src = isOpen ? iconClose : iconOpen;
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (!isOpen) {
            menu.querySelectorAll('.burger-dropdown.open').forEach(function(dd) {
                dd.classList.remove('open');
                const toggle = dd.querySelector('.burger-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    document.querySelectorAll('.burger-dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = toggle.closest('.burger-dropdown');
            if (!dropdown) return;

            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (dropdown.closest('.nav-links')) {
                syncDesktopDropdownWidth(dropdown);
            }
        });
    });

    window.addEventListener('resize', function() {
        document.querySelectorAll('.nav-links .burger-dropdown').forEach(syncDesktopDropdownWidth);
    });

    document.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-links .burger-dropdown.open').forEach(function(dd) {
            if (!dd.contains(e.target)) {
                dd.classList.remove('open');
                const toggle = dd.querySelector('.burger-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

burgerMenu();
