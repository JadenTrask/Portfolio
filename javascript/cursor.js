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
    
    // Constants for cursor physics
    const springStrength = 0.3;
    const drag = 0.75;
    const maxStretch = 8;
    const minWidth = 0.2;

    function updateCursor(timestamp) {
        const deltaTime = Math.min((timestamp - lastTime) / 16, 2);
        lastTime = timestamp;

        // Initialize position if needed
        if (currentX === 0 && currentY === 0) {
            currentX = targetX;
            currentY = targetY;
        }

        // Calculate velocities from mouse movement
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Apply spring physics
        velocityX += dx * springStrength;
        velocityY += dy * springStrength;
        velocityX *= drag;
        velocityY *= drag;
        
        // Update position
        currentX += velocityX;
        currentY += velocityY;

        // Calculate speed and direction
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const angle = Math.atan2(velocityY, velocityX);

        // Calculate stretch based on speed
        const stretch = Math.min(1 + (speed * 0.03), maxStretch);
        const squeeze = Math.max(minWidth, 1 / Math.sqrt(stretch));

        // Apply transforms
        cursor.style.transform = `translate(${currentX}px, ${currentY}px)
                                translate(-50%, -50%)
                                rotate(${angle}rad)
                                scale(${stretch}, ${squeeze})`;

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Update velocities
        velocityX = (e.clientX - lastMouseX) * 2;
        velocityY = (e.clientY - lastMouseY) * 2;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    // Start animation
    requestAnimationFrame(updateCursor);

    // Click animation
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Scroll elements
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

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, img, .social-btn');
    interactiveElements.forEach(el => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Window events
    document.addEventListener('mouseleave', () => cursor.style.display = 'none');
    document.addEventListener('mouseenter', () => cursor.style.display = 'block');
});