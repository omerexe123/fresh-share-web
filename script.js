document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');

    // Tıklama Etkileşimi
    mainBtn.addEventListener('click', () => {
        mainBtn.innerHTML = "Hazırlanıyor...";
        setTimeout(() => {
            alert("Freshshare dünyasına adım atmak üzeresin! Kayıtlar yakında başlıyor.");
            mainBtn.innerHTML = "Hemen Başla";
        }, 800);
    });

    // Scroll Animasyonu (Kartların sırayla belirmesi için ufak bir kontrol)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
});
