// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select all <section> elements, except for the #hero
    const sections = document.querySelectorAll('section:not(#hero)');

    // Set up the Intersection Observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1, // triggers when 10% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the section is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the .visible class to trigger the CSS transition
                entry.target.classList.add('visible');
                
                // Stop observing this element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tell the observer to watch each of the selected sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // =============================================
    // ===== NOVO CÓDIGO DA FUNÇÃO MODAL =====
    // =============================================

    // 1. Seleciona todos os elementos que precisamos
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.modal-close');

    // 2. Adiciona um "escutador" de clique para CADA card
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Pega a imagem *dentro* do card que foi clicado
            const img = card.querySelector('img');
            
            // Pega o caminho (src) da imagem
            const imgSrc = img.getAttribute('src');
            
            // Define o caminho (src) da imagem do modal
            modalImg.setAttribute('src', imgSrc);
            
            // Mostra o modal adicionando a classe .modal-open
            modal.classList.add('modal-open');
        });
    });

    // 3. Função para fechar o modal
    const closeModal = () => {
        modal.classList.remove('modal-open');
    };

    // 4. Adiciona eventos para fechar o modal
    
    // Fecha ao clicar no 'X'
    closeModalBtn.addEventListener('click', closeModal);

    // Fecha também ao clicar fora da imagem (no fundo preto)
    modal.addEventListener('click', (e) => {
        // Verifica se o clique foi no fundo (modal) e não na imagem (modalImg)
        if (e.target === modal) {
            closeModal();
        }
    });
});