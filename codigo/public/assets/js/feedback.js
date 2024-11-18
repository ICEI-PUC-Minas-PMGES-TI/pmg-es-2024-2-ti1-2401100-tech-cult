// Avaliação por estrelas
const stars = document.querySelectorAll(".rating .star");
const ratingDisplay = document.getElementById("rating-display");
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = star.getAttribute("data-value");
        stars.forEach(s => s.classList.remove("selected"));
        star.classList.add("selected");
        ratingDisplay.textContent = `Avaliação: ${selectedRating} estrela(s)`;
    });
});

// Envio de feedback
const feedbackText = document.getElementById("feedback-text");
const submitFeedbackButton = document.getElementById("submit-feedback");

submitFeedbackButton.addEventListener("click", () => {
    const feedback = feedbackText.value.trim();

    if (!selectedRating) {
        alert("Por favor, selecione uma avaliação!");
        return;
    }

    if (!feedback) {
        alert("Por favor, insira um feedback!");
        return;
    }

    const feedbackData = {
        rating: selectedRating,
        feedback: feedback,
        timestamp: new Date().toISOString()
    };

    console.log("Feedback enviado:", feedbackData);

    // Exemplo de integração com backend (opcional)
    // fetch("/api/eventos/feedback", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(feedbackData)
    // }).then(response => {
    //     if (response.ok) {
    //         alert("Feedback enviado com sucesso!");
    //     } else {
    //         alert("Erro ao enviar feedback!");
    //     }
    // });

    feedbackText.value = "";
    stars.forEach(s => s.classList.remove("selected"));
    ratingDisplay.textContent = "";
    selectedRating = 0;
});
