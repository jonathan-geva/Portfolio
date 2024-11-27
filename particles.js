class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.isLightMode = false;
        this.gameMode = false;
        this.selectedItem = null;
        this.explosions = [];
        this.normalParticleCount = 0;
        this.gameParticleCount = 0;
        this.effectAnimations = [];
        this.isUIHovered = false;
        this.effectStrength = 1.0;

        // Setup canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';

        // Initialize
        this.init();
        this.animate();

        // Event listeners
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });

        // Add click handler for game mode
        this.canvas.addEventListener('click', (e) => {
            if (this.gameMode) {
                this.handleGameClick(e);
            }
        });

        // Update click handler
        window.addEventListener('click', (e) => {
            if (this.gameMode && this.selectedItem && !this.isUIHovered) {
                this.handleGameClick(e);
            }
        });
    }

    init() {
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Calculate particle counts based on screen size
        this.normalParticleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        this.gameParticleCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);

        // Create particles
        this.particles = [];
        const particleCount = this.gameMode ? this.gameParticleCount : this.normalParticleCount;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle(x, y) {
        return {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            initialAlpha: Math.random() * 0.5 + 0.2,
            alpha: Math.random() * 0.5 + 0.2
        };
    }

    createEffectAnimation(x, y, type) {
        const animation = {
            x,
            y,
            radius: 0,
            maxRadius: type === 'explosion' ? 80 : 50,
            alpha: 1,
            startTime: Date.now(),
            duration: 500,
            type
        };
        this.effectAnimations.push(animation);
    }

    updateEffectAnimations() {
        this.effectAnimations = this.effectAnimations.filter(effect => {
            const age = Date.now() - effect.startTime;
            if (age >= effect.duration) return false;

            const progress = age / effect.duration;
            effect.radius = effect.maxRadius * (effect.type === 'explosion' ? 
                Math.sin(progress * Math.PI) : 
                (1 - Math.exp(-progress * 4)));
            effect.alpha = 1 - progress;

            // Draw effect animation
            this.ctx.beginPath();
            this.ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
            
            let gradient;
            if (effect.type === 'explosion') {
                gradient = this.ctx.createRadialGradient(
                    effect.x, effect.y, 0,
                    effect.x, effect.y, effect.radius
                );
                gradient.addColorStop(0, `rgba(255, 100, 50, ${effect.alpha})`);
                gradient.addColorStop(1, `rgba(255, 50, 0, 0)`);
            } else if (effect.type === 'attractor') {
                gradient = this.ctx.createRadialGradient(
                    effect.x, effect.y, 0,
                    effect.x, effect.y, effect.radius
                );
                gradient.addColorStop(0, `rgba(74, 144, 226, ${effect.alpha})`);
                gradient.addColorStop(1, `rgba(74, 144, 226, 0)`);
            } else {
                gradient = this.ctx.createRadialGradient(
                    effect.x, effect.y, 0,
                    effect.x, effect.y, effect.radius
                );
                gradient.addColorStop(0, `rgba(50, 255, 100, ${effect.alpha})`);
                gradient.addColorStop(1, `rgba(50, 255, 0, 0)`);
            }

            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Add particles for explosion
            if (effect.type === 'explosion' && Math.random() < 0.3) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * effect.radius;
                const x = effect.x + Math.cos(angle) * distance;
                const y = effect.y + Math.sin(angle) * distance;
                this.particles.push(this.createParticle(x, y));
            }

            return true;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameMode) {
            this.updateExplosions();
            this.updateEffectAnimations();
            this.slowDownParticles();
        }

        // Update and draw particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Calculate distance to mouse
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Interact with mouse
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                particle.vx -= Math.cos(angle) * force * 0.02;
                particle.vy -= Math.sin(angle) * force * 0.02;
                particle.alpha = Math.min(1, particle.initialAlpha + force * 0.5);
            } else {
                particle.alpha = particle.initialAlpha;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            const color = this.isLightMode ? '74, 144, 226' : '255, 255, 255';
            this.ctx.fillStyle = `rgba(${color}, ${particle.alpha})`;
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((particle1, i) => {
            this.particles.slice(i + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    const color = this.isLightMode ? '74, 144, 226' : '255, 255, 255';
                    this.ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }

    setLightMode(isLight) {
        this.isLightMode = isLight;
    }

    handleGameClick(e) {
        if (!this.selectedItem || !this.gameMode) return;

        const x = e.clientX;
        const y = e.clientY;

        switch (this.selectedItem) {
            case 'grenade':
                this.createExplosion(x, y);
                this.createEffectAnimation(x, y, 'explosion');
                break;
            case 'attractor':
                this.createAttractor(x, y);
                this.createEffectAnimation(x, y, 'attractor');
                break;
            case 'repulsor':
                this.createRepulsor(x, y);
                this.createEffectAnimation(x, y, 'repulsor');
                break;
        }
    }

    createExplosion(x, y) {
        const explosion = {
            x,
            y,
            radius: 0,
            maxRadius: 150 * Math.sqrt(this.effectStrength),
            force: 1.5 * this.effectStrength,
            duration: 500,
            startTime: Date.now(),
            type: 'explosion'
        };
        this.explosions.push(explosion);
    }

    createAttractor(x, y) {
        const attractor = {
            x,
            y,
            radius: 150 * Math.sqrt(this.effectStrength),
            force: 0.5 * this.effectStrength,
            duration: 2000,
            startTime: Date.now(),
            type: 'attractor'
        };
        this.explosions.push(attractor);
    }

    createRepulsor(x, y) {
        const repulsor = {
            x,
            y,
            radius: 150 * Math.sqrt(this.effectStrength),
            force: -0.5 * this.effectStrength,
            duration: 2000,
            startTime: Date.now(),
            type: 'repulsor'
        };
        this.explosions.push(repulsor);
    }

    updateExplosions() {
        this.explosions = this.explosions.filter(effect => {
            const age = Date.now() - effect.startTime;
            if (age >= effect.duration) return false;

            const progress = age / effect.duration;
            
            if (effect.type === 'explosion') {
                effect.radius = effect.maxRadius * Math.sin(progress * Math.PI);
            }
            
            this.particles.forEach(particle => {
                const dx = particle.x - effect.x;
                const dy = particle.y - effect.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < (effect.type === 'explosion' ? effect.radius : effect.radius * 2)) {
                    const angle = Math.atan2(dy, dx);
                    let force;
                    
                    if (effect.type === 'attractor') {
                        force = (effect.radius - distance) / effect.radius * effect.force * 2;
                        const spiralAngle = angle + progress * Math.PI * 4;
                        particle.vx = (particle.vx - Math.cos(spiralAngle) * force) * 0.98;
                        particle.vy = (particle.vy - Math.sin(spiralAngle) * force) * 0.98;
                    } else if (effect.type === 'repulsor') {
                        force = Math.pow((effect.radius - distance) / effect.radius, 2) * effect.force;
                        particle.vx = (particle.vx + Math.cos(angle) * force) * 0.98;
                        particle.vy = (particle.vy + Math.sin(angle) * force) * 0.98;
                    } else {
                        force = (effect.radius - distance) / effect.radius * effect.force;
                        particle.vx = (particle.vx + Math.cos(angle) * force) * 0.98;
                        particle.vy = (particle.vy + Math.sin(angle) * force) * 0.98;
                    }

                    if (Math.random() < 0.1) {
                        particle.vx += (Math.random() - 0.5) * 0.5;
                        particle.vy += (Math.random() - 0.5) * 0.5;
                    }

                    const maxVelocity = 3;
                    const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                    if (velocity > maxVelocity) {
                        particle.vx = (particle.vx / velocity) * maxVelocity;
                        particle.vy = (particle.vy / velocity) * maxVelocity;
                    }
                }
            });

            return true;
        });
    }

    slowDownParticles() {
        const damping = 0.98;
        this.particles.forEach(particle => {
            particle.vx *= damping;
            particle.vy *= damping;
        });
    }

    setGameMode(enabled) {
        this.gameMode = enabled;
        this.canvas.style.pointerEvents = enabled ? 'auto' : 'none';
        this.selectedItem = null;
        
        // Adjust particle count when switching modes
        if (enabled) {
            const particlesToAdd = this.gameParticleCount - this.particles.length;
            for (let i = 0; i < particlesToAdd; i++) {
                this.particles.push(this.createParticle());
            }
        } else {
            this.particles = this.particles.slice(0, this.normalParticleCount);
        }
    }

    setSelectedItem(item) {
        this.selectedItem = item;
    }

    resetParticles() {
        this.particles = [];
        const particleCount = this.gameMode ? this.gameParticleCount : this.normalParticleCount;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        // Clear all effects
        this.explosions = [];
        this.effectAnimations = [];
    }

    setUIHovered(isHovered) {
        this.isUIHovered = isHovered;
    }

    setEffectStrength(strength) {
        this.effectStrength = strength;
    }
} 