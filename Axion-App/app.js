/* ==========================================================================
   Axion Intelligence Platform - Application Logic & Real-Time Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFeatureCards();
    initChartAnimation();
    initLatencySimulator();
});

// Password Visibility Toggle
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.className = 'fa-regular fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        eyeIcon.className = 'fa-regular fa-eye';
    }
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const btnSubmit = document.getElementById('btn-submit');

    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Authenticating...</span>`;
    btnSubmit.disabled = true;

    showToast('Connecting to Azure PostgreSQL & Agentic AI cluster...', 'info');

    setTimeout(() => {
        showToast(`Welcome back, ${email}! Access Granted.`, 'success');
        
        // Transition to Dashboard View
        const loginView = document.getElementById('login-view');
        const dashboardView = document.getElementById('dashboard-view');
        
        loginView.classList.remove('active');
        dashboardView.classList.add('active');
        
        btnSubmit.innerHTML = `<span>Secure Sign In</span> <i class="fa-solid fa-arrow-right"></i>`;
        btnSubmit.disabled = false;
        
        // Trigger Canvas Chart Render
        renderTelemetryChart();
    }, 1200);
}

// Handle Logout
function handleLogout() {
    showToast('Signed out of Axion Intelligence Platform.', 'info');
    
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    dashboardView.classList.remove('active');
    loginView.classList.add('active');
}

// Show Forgot Password Modal
function showForgotPassword(event) {
    event.preventDefault();
    showToast('Password reset link sent to your registered enterprise email.', 'info');
}

// Toast Notifications System
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-triangle';
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Feature Cards Interactive Modals
const featureDetailsMap = {
    agentic: {
        title: 'Agentic AI Anomaly Detection',
        desc: 'Autonomous agentic AI models continuously monitor multi-modal telemetry streams, predicting and self-healing system anomalies in real time without human intervention.',
        icon: '<i class="fa-solid fa-robot icon-blue"></i>',
        details: 'Active Model: Axion-Neural-V4 | Detection Rate: 99.94%'
    },
    predictive: {
        title: 'Predictive Maintenance Engine',
        desc: 'Leverages deep learning to calculate Remaining Useful Life (RUL) of industrial turbines, pumps, and servers, preventing catastrophic downtime.',
        icon: '<i class="fa-solid fa-chart-line icon-purple"></i>',
        details: 'Prevented Downtime Value: $4.2M (Q3)'
    },
    global: {
        title: 'Global IoT Sensor Mesh',
        desc: 'Distributed telemetry ingestion pipeline built to scale up to tens of millions of IoT data points per second with zero message loss.',
        icon: '<i class="fa-solid fa-globe icon-emerald"></i>',
        details: 'Active Clusters: 14 Global Azure Regions'
    },
    zerotrust: {
        title: 'Zero-Trust Encrypted Security',
        desc: 'End-to-end mTLS encryption for data in transit and Azure PostgreSQL storage encryption at rest with customer-managed keys.',
        icon: '<i class="fa-solid fa-shield-halved icon-cyan"></i>',
        details: 'Compliance: ISO 27001, SOC2 Type II, HIPAA'
    },
    digitaltwin: {
        title: 'Real-Time Digital Twin',
        desc: 'High-fidelity 3D virtual simulation of physical factory assets synchronized with live Azure PostgreSQL state.',
        icon: '<i class="fa-solid fa-microchip icon-sky"></i>',
        details: 'Sync Frequency: 100 Hz (Sub-10ms)'
    },
    edge: {
        title: 'Sub-Millisecond Edge Processing',
        desc: 'Ultra-low latency edge computing runtime deployed directly at local industrial gateways.',
        icon: '<i class="fa-solid fa-bolt icon-amber"></i>',
        details: 'Average Edge Latency: 0.8 ms'
    }
};

function initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const featureKey = card.getAttribute('data-feature');
            const info = featureDetailsMap[featureKey];
            if (info) {
                document.getElementById('modal-title').textContent = info.title;
                document.getElementById('modal-desc').textContent = info.desc;
                document.getElementById('modal-icon').innerHTML = info.icon;
                document.getElementById('modal-details').textContent = info.details;
                document.getElementById('feature-modal').classList.add('active');
            }
        });
    });
}

function closeModal(event) {
    if (!event || event.target.id === 'feature-modal' || event.target.closest('.modal-close')) {
        document.getElementById('feature-modal').classList.remove('active');
    }
}

// Canvas Live Telemetry Line Chart Render Engine
function renderTelemetryChart() {
    const canvas = document.getElementById('telemetryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const dataPoints = 30;
    const data = Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 40) + 50);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = (canvas.height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw Gradient Line
        ctx.beginPath();
        const step = canvas.width / (dataPoints - 1);
        ctx.moveTo(0, canvas.height - (data[0] / 100) * canvas.height);

        for (let i = 1; i < data.length; i++) {
            const x = i * step;
            const y = canvas.height - (data[i] / 100) * canvas.height;
            ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#d946ef');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw Fill Gradient
        const fillGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        fillGradient.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
        fillGradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = fillGradient;
        ctx.fill();

        // Shift data for live streaming effect
        data.shift();
        data.push(Math.floor(Math.random() * 35) + 55);
    }

    setInterval(draw, 1000);
}

function initChartAnimation() {
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('telemetryChart');
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
    });
}

// PostgreSQL Latency & Sensor Count Simulator
function initLatencySimulator() {
    setInterval(() => {
        const latencyEl = document.getElementById('val-latency');
        const sensorsEl = document.getElementById('val-sensors');
        if (latencyEl) {
            const randomLatency = Math.floor(Math.random() * 6) + 11;
            latencyEl.textContent = `${randomLatency} ms`;
        }
        if (sensorsEl) {
            const baseSensors = 1482920;
            const variation = Math.floor(Math.random() * 50) - 20;
            sensorsEl.textContent = (baseSensors + variation).toLocaleString();
        }
    }, 2500);
}
