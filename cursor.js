document.addEventListener('DOMContentLoaded', () => {
    // Create elements
    const cursor = document.createElement('div');
    const progressBar = document.createElement('div');
    const scrollGear = document.createElement('div');

    cursor.classList.add('custom-cursor');
    progressBar.classList.add('progress-bar');
    scrollGear.classList.add('scroll-gear');

    document.body.appendChild(cursor);
    document.body.appendChild(progressBar);
    document.body.appendChild(scrollGear);

    // Cursor tracking
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add click animation to cursor
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    


    // Update progress bar and gear rotation
    let lastScrollY = window.scrollY;
    let gearRotation = 0;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
        
        // Calculate gear rotation based on scroll direction and amount
        const scrollDiff = window.scrollY - lastScrollY;
        gearRotation += scrollDiff * 0.5; // Adjust this multiplier to control rotation speed
        scrollGear.style.transform = `rotate(${gearRotation}deg)`;
        lastScrollY = window.scrollY;
        
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