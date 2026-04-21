// =============================================
//  CUSTOM CURSOR
// =============================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
    });
});

// =============================================
//  NAVBAR SCROLL + ACTIVE LINK
// =============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// =============================================
//  MOBILE NAV TOGGLE
// =============================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
    });
});

// =============================================
//  REVEAL ON SCROLL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// =============================================
//  SKILL BAR ANIMATION ON SCROLL
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const target = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = target + '%';
                }, 200);
            });
        }
    });
}, { threshold: 0.3 });

const skillsPanel = document.querySelector('.skills-panel');
if (skillsPanel) skillObserver.observe(skillsPanel);

// =============================================
//  VUE APP
// =============================================
const { createApp } = Vue;

createApp({
    data() {
        return {
            skills: [
                { name: "HTML, CSS, JavaScript", level: 50 },
                { name: "MySQL",                 level: 70 },
                { name: "Kolaborasi Tim",        level: 75 },
                { name: "Problem Solving",       level: 80 }
            ],
            certificates: [
                {
                    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
                    issuer: "Dicoding Indonesia · Februari 2026",
                    image: "assets/cert1.jpg",
                    tag: "Data Science"
                },
                {
                    title: "Pelatihan Aplikasi FTK Imager",
                    issuer: "Universitas Mulawarman · November 2025",
                    image: "assets/cert2.jpeg",
                    tag: "Digital Forensics"
                },
                {
                    title: "Pelatihan Aplikasi Autopsy",
                    issuer: "Universitas Mulawarman · November 2025",
                    image: "assets/cert3.jpeg",
                    tag: "Digital Forensics"
                }
            ]
        };
    },

    mounted() {
        // Re-observe newly rendered Vue elements
        this.$nextTick(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                revealObserver.observe(el);
            });
            if (skillsPanel) skillObserver.observe(skillsPanel);
        });
    }
}).mount('#app');
