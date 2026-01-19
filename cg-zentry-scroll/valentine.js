document.addEventListener('DOMContentLoaded', function() {
    const questionContainer = document.querySelector(".question-container");
    const resultContainer = document.querySelector(".result-container");
    const gifResult = document.querySelector(".gif-result");
    const heartLoader = document.querySelector(".cssload-main");
    const yesBtn = document.querySelector(".yes-btn");
    const noBtn = document.querySelector(".no-btn");

    // Change the position of no button within container bounds
    noBtn.addEventListener("mouseover", () => {
        const containerRect = questionContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate bounds within the container
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);
        
        // Position relative to container
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });

    // Yes button functionality - Show result then navigate to gallery
    yesBtn.addEventListener("click", () => {
        questionContainer.style.display = "none";
        heartLoader.style.display = "inherit";

        const timeoutId = setTimeout(() => {
            heartLoader.style.display = "none";
            resultContainer.style.display = "inherit";
            
            // Result iframe will load automatically
            
            // Navigate to gallery after showing result with fade animation
            setTimeout(() => {
                // Add fade out effect
                document.body.style.transition = "opacity 1s ease-out";
                document.body.style.opacity = "0";
                
                // Navigate after fade completes
                setTimeout(() => {
                    window.location.href = "index-gallery.html";
                }, 1000);
            }, 2000); // Show result for 2 seconds then fade and redirect
        }, 3000);
    });
});