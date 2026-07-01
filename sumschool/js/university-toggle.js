function toggleUniversitySection(headerElement) {
    const accordion = headerElement.nextElementSibling;
    if (!accordion || !accordion.classList.contains('university-accordion')) return;
    const isExpanded = accordion.classList.toggle('expanded');
    headerElement.setAttribute('aria-expanded', String(isExpanded));
    const firstCard = accordion.querySelector('.university-card');
    if (firstCard) {
        firstCard.setAttribute('tabindex', isExpanded ? '0' : '-1');
    }
}

function buttonRollUp(button) {
    const accordion = button.closest('.university-accordion');
    if (!accordion) return;

    accordion.classList.remove('expanded');

    const header = accordion.previousElementSibling;
    if (header && header.classList.contains('university-header')) {
        header.setAttribute('aria-expanded', 'false');

        const target = header.querySelector('.university-section-title');
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - 350;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: 'auto'
            });
        }
    }
}