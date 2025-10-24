document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const toastEl = document.getElementById('live-toast');
    const toast = new bootstrap.Toast(toastEl);

    const metrics = {
        totalUsers: 1000,
        newUsers: 50,
        growth: 5
    };

    document.getElementById('total-users').textContent = metrics.totalUsers;
    document.getElementById('new-users').textContent = metrics.newUsers;
    document.getElementById('growth').textContent = metrics.growth + '%';

    const ctx = document.getElementById('performance-chart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Performance',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: gradient,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            }
        }
    });

    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('bi-moon', 'bi-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('bi-sun', 'bi-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('bi-sun', 'bi-moon');
    }

    document.getElementById('export-btn').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = chart.toBase64Image();
        link.download = 'performance-chart.png';
        link.click();
    });

    if (metrics.newUsers > 40) {
        toast.show();
    }
});