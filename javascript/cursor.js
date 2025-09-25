document.addEventListener('DOMContentLoaded', () => {
    // Check if the device supports touch (mobile device)
    if (!('ontouchstart' in window)) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        let dotVelX = 0;
        let dotVelY = 0;
        let speed = 0.15; // Main cursor follow speed
        let springStrength = 0.1; // How strongly the dot is pulled to the center
        let friction = 0.8; // Friction to slow down the dot

    // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Add velocity to the dot based on mouse movement
            dotVelX += (e.movementX || 0) * 0.3;
            dotVelY += (e.movementY || 0) * 0.3;
        });

        // Add click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Hover effect for clickable elements
        const clickableElements = document.querySelectorAll('a, button, input, textarea');
        clickableElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                cursor.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Animation loop for smooth cursor and dot movement
        function animate() {
            // Update main cursor position
            let dx = mouseX - cursorX;
            let dy = mouseY - cursorY;
            cursorX += dx * speed;
            cursorY += dy * speed;

            // Update dot physics
            // Calculate spring force towards center
            let springX = (0 - dotX) * springStrength;
            let springY = (0 - dotY) * springStrength;

            // Apply spring force to velocity
            dotVelX += springX;
            dotVelY += springY;

            // Apply friction
            dotVelX *= friction;
            dotVelY *= friction;

            // Update dot position
            dotX += dotVelX;
            dotY += dotVelY;

            // Apply transforms
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursor.style.setProperty('--dot-x', `${dotX}px`);
            cursor.style.setProperty('--dot-y', `${dotY}px`);

            requestAnimationFrame(animate);
        }

        // Add CSS variable for dot position
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor::after {
                transform: translate(calc(-50% + var(--dot-x, 0px)), calc(-50% + var(--dot-y, 0px))) !important;
            }
        `;
        document.head.appendChild(style);

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

        animate();
    }
});