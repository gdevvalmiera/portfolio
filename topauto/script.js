
const phoneInput = document.querySelector('input[name="telefons"]');
phoneInput.addEventListener('input', function () {
    let digits = this.value.replace(/\D/g, '');
    if (digits.startsWith('371')) {
        digits = digits.slice(3);
    }
    digits = digits.slice(0, 8);
    let formatted = '+371';
    if (digits.length > 0) {
        formatted += ' ' + digits;
    }
    this.value = formatted;
});
const dateInput = document.getElementById('datums');
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
}
setTodayDate();
const form = document.querySelector('form');
const successMessage = document.getElementById('success-message');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Sūta...';
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                form.reset();
                setTodayDate();
                phoneInput.value = '+371';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                alert('Kļūda! Pieteikumu neizdevās nosūtīt.');
            }
        })
        .catch(() => {
            alert('Kļūda! Pārbaudi interneta savienojumu.');
        })
        .finally(() => {
            button.disabled = false;
            button.textContent = 'Pieteikt vizīti';
        });
});
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});