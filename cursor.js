document.addEventListener('DOMContentLoaded', () => {
    // Create elements
    const cursor = document.createElement('div');
    const mouseLight = document.createElement('div');
    const progressBar = document.createElement('div');
    const scrollGear = document.createElement('div');

    cursor.classList.add('custom-cursor');
    mouseLight.classList.add('mouse-light');
    progressBar.classList.add('progress-bar');
    scrollGear.classList.add('scroll-gear');

    document.body.appendChild(cursor);
    document.body.appendChild(mouseLight);
    document.body.appendChild(progressBar);
    document.body.appendChild(scrollGear);

    // Simple mouse tracking
    let mouseX = 0, mouseY = 0;
    let lightX = 0, lightY = 0;
    
    document.addEventListener('mousemove', (e) => {
        // Cursor follows mouse exactly
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Save mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth light following
    function updateLight() {
        // Simple easing
        lightX += (mouseX - lightX) * 0.1;
        lightY += (mouseY - lightY) * 0.1;
        
        // Update light position with smooth transition
        mouseLight.style.transform = 'translate(-50%, -50%)';
        mouseLight.style.left = `${lightX}px`;
        mouseLight.style.top = `${lightY}px`;
        
        // Update position with smooth transition
        mouseLight.style.left = lightX + 'px';
        mouseLight.style.top = lightY + 'px';
        
        // Momentum decay
        velocityX *= 0.92;
        velocityY *= 0.92;
        
        requestAnimationFrame(updateLight);
    }
    updateLight();
    


    // Update progress bar and gear rotation
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
        scrollGear.style.transform = `rotate(${scrollPercent * 3.6}deg)`;
        
        // Parallax effect for sections
        const sections = document.querySelectorAll('.about-section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                const scrolled = window.scrollY - rect.top + window.innerHeight / 2;
                section.style.transform = `translateY(${scrolled * 0.1}px)`;
                section.style.opacity = Math.min(1, 1 - Math.abs(rect.top / window.innerHeight));
            }
        });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, img, .social-btn');
    interactiveElements.forEach(el => {
        el.style.cursor = 'none'; // Hide the original cursor
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
});