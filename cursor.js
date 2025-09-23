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

    // Update cursor and light position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        mouseLight.style.left = e.clientX + 'px';
        mouseLight.style.top = e.clientY + 'px';
    });

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