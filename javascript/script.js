// Alert on site title click
document.querySelector('.site-title').addEventListener('click', function() {
    alert('Hello from Jaden!');
});

// Animated typing effect with typo and correction (variable speed)
window.addEventListener("DOMContentLoaded", function() {
    const correctText = "Software Engineer";
    const typoText = "Software Enginerr";
    const typedSpan = document.getElementById("typed");
    let i = 0;

    function randomDelay() {
        return Math.floor(Math.random() * 60) + 60; // 60-120ms
    }

    function typeWriter() {
        if (i < typoText.length) {
            typedSpan.textContent += typoText.charAt(i);
            i++;
            setTimeout(typeWriter, randomDelay());
        } else {
            setTimeout(backspaceTypo, 400);
        }
    }

    function backspaceTypo() {
        if (typedSpan.textContent.length > "Software Engine".length) {
            typedSpan.textContent = typedSpan.textContent.slice(0, -1);
            setTimeout(backspaceTypo, randomDelay());
        } else {
            typeCorrection();
        }
    }

    let j = "Software Engine".length;
    function typeCorrection() {
        if (j < correctText.length) {
            typedSpan.textContent += correctText.charAt(j);
            j++;
            setTimeout(typeCorrection, randomDelay());
        } else {
            // Hide cursor after 3 seconds when typing is complete
            setTimeout(() => {
                typedSpan.style.borderRight = 'none';
            }, 3000);
        }
    }

    typedSpan.textContent = "";
    typeWriter();
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('open');
});
