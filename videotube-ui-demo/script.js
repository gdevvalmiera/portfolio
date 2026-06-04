const searchInput = document.getElementById('searchInput');
const videoCards = document.querySelectorAll('.video-card');
const videosSection = document.querySelector('.videos-section');
const noResults = document.getElementById('noResults');
const categoryLinks = document.querySelectorAll('.sidebar a');
const selectedVideo = document.getElementById('selectedVideo');
function sortVideosAlphabetically() {
    const sortedCards = Array.from(videoCards).sort(function (a, b) {
        const titleA = a.querySelector('h3').textContent.toLowerCase();
        const titleB = b.querySelector('h3').textContent.toLowerCase();

        return titleA.localeCompare(titleB);
    });

    sortedCards.forEach(function (card) {
        videosSection.insertBefore(card, noResults);
    });
}
function updateCategoryCounts() {
    categoryLinks.forEach(function (link) {
        const category = link.dataset.category;
        const countSpan = link.querySelector('.count');
        let count = 0;

        videoCards.forEach(function (card) {
            if (category === 'all' || card.dataset.category === category) {
                count++;
            }
        });

        countSpan.textContent = '(' + count + ')';
    });
}

updateCategoryCounts();

searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    let foundVideos = 0;
    categoryLinks.forEach(function (item) {
    item.classList.remove('active');
    });

    categoryLinks[0].classList.add('active');

    if (searchText !== '') {
        videosSection.classList.add('searching');
    } else {
        videosSection.classList.remove('searching');
    }

    videoCards.forEach(function (card) {
        const videoTitle = card.querySelector('h3').textContent.toLowerCase();
        const videoInfo = card.querySelector('p').textContent.toLowerCase();

        if (videoTitle.includes(searchText) || videoInfo.includes(searchText)) {
            card.classList.remove('hidden');
            foundVideos++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (foundVideos === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
});
categoryLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const selectedCategory = link.dataset.category;
        let foundVideos = 0;
        selectedVideo.classList.remove('active');
        sortVideosAlphabetically();
        categoryLinks.forEach(function (item) {
        item.classList.remove('active');
        });

        link.classList.add('active');

        searchInput.value = '';
        videosSection.classList.remove('searching');

        videoCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                card.classList.remove('hidden');
                foundVideos++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (foundVideos === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    });
});
videoCards.forEach(function (card) {
    card.addEventListener('click', function () {
        const title = card.querySelector('h3').textContent;
        const info = card.querySelector('p').textContent;

        selectedVideo.innerHTML = `
            <div class="player-box">▶</div>
            <h2>${title}</h2>
            <p>${info}</p>
        `;
        selectedVideo.classList.add('active');
    });
});
