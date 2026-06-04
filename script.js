const starsContainer = document.querySelector('.stars');
const starsCount = 80;

for (let i = 0; i < starsCount; i++) {
    const star = document.createElement('span');

    const size = Math.random() * 3 + 1;

    star.classList.add('star');
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.opacity = Math.random() * 0.7 + 0.3;

    starsContainer.appendChild(star);
}