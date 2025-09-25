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

    // Physics variables
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastTime = performance.now();
    const springStrength = 0.2;
    const drag = 0.85;
    const maxStretch = 2;
    const rotationFactor = 15;

    // Cursor tracking with physics
    function updateCursor(timestamp) {
        const deltaTime = (timestamp - lastTime) / 16; // Normalize to 60fps
        lastTime = timestamp;

        // Update position with spring physics
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Apply spring force
        velocityX += dx * springStrength;
        velocityY += dy * springStrength;
        
        // Apply drag
        velocityX *= drag;
        velocityY *= drag;
        
        // Update current position
        currentX += velocityX * deltaTime;
        currentY += velocityY * deltaTime;

        // Calculate stretching based on velocity
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const stretch = Math.min(1 + (speed * 0.01), maxStretch);
        
        // Calculate rotation based on movement direction
        const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
        
        // Apply transforms
        cursor.style.transform = `translate(${currentX}px, ${currentY}px) 
                                rotate(${angle * 0.5}deg)
                                scale(${1 + (speed * 0.001)})
                                scaleX(${stretch})`;

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        // Calculate instantaneous velocity
        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            velocityX = dx / dt * 16; // Scale to roughly match 60fps
            velocityY = dy / dt * 16;
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    // Start animation loop
    requestAnimationFrame(updateCursor);

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
    let ticking = false;

    function updateScrollElements() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        
        const scrollDiff = window.scrollY - lastScrollY;
        gearRotation += scrollDiff * 0.5;
        scrollGear.style.transform = `rotate(${gearRotation}deg)`;
        lastScrollY = window.scrollY;
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }, { passive: true });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, img, .social-btn');
    interactiveElements.forEach(el => {
        el.style.cursor = 'none';
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