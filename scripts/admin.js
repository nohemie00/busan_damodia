// Admin Panel JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initAdminPanel();
});

function initAdminPanel() {
    initNavigation();
    initDateTime();
    initCharts();
    initReservations();
    initContentManagement();
    initNotifications();
    initAnalytics();
    initSettings();
    initModals();
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content section
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            const titles = {
                dashboard: '대시보드',
                reservations: '예약 관리',
                content: '콘텐츠 관리',
                notifications: '알림 발송',
                analytics: '통계 분석',
                settings: '설정'
            };
            pageTitle.textContent = titles[sectionId];
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
            }
        });
    });
    
    // Sidebar toggle for mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Date and time display
function initDateTime() {
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long'
        };
        
        const dateTimeElement = document.getElementById('current-datetime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleDateString('ko-KR', options);
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
}

// Charts initialization
function initCharts() {
    // Reservation Chart
    const reservationCtx = document.getElementById('reservationChart');
    if (reservationCtx) {
        new Chart(reservationCtx, {
            type: 'bar',
            data: {
                labels: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
                datasets: [{
                    label: '예약 수',
                    data: [12, 19, 15, 25, 22, 18, 14, 8],
                    backgroundColor: 'rgba(78, 205, 196, 0.8)',
                    borderColor: 'rgba(78, 205, 196, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Reservation Trend Chart
    const trendCtx = document.getElementById('reservationTrendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['1월 1일', '1월 2일', '1월 3일', '1월 4일', '1월 5일', '1월 6일', '1월 7일'],
                datasets: [{
                    label: '일별 예약 수',
                    data: [45, 52, 38, 61, 55, 48, 42],
                    borderColor: 'rgba(78, 205, 196, 1)',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Visitor Chart
    const visitorCtx = document.getElementById('visitorChart');
    if (visitorCtx) {
        new Chart(visitorCtx, {
            type: 'doughnut',
            data: {
                labels: ['성인', '어린이'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: [
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['월', '화', '수', '목', '금', '토', '일'],
                datasets: [{
                    label: '매출 (만원)',
                    data: [45, 52, 38, 61, 55, 72, 68],
                    backgroundColor: 'rgba(255, 193, 7, 0.8)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Reservations management
function initReservations() {
    const reservationsTableBody = document.getElementById('reservations-table-body');
    if (reservationsTableBody) {
        loadReservations();
    }
    
    // Filter functionality
    const filterSelect = document.querySelector('#reservations .filter-select');
    const filterDate = document.querySelector('#reservations .filter-date');
    const filterBtn = document.querySelector('#reservations .btn-primary');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
}

function loadReservations() {
    const reservationsTableBody = document.getElementById('reservations-table-body');
    if (!reservationsTableBody) return;
    
    // Sample reservation data
    const reservations = [
        {
            id: 'VR240120001',
            name: '김철수',
            phone: '010-1234-5678',
            date: '2024.01.20',
            time: '14:00',
            adults: 2,
            children: 1,
            status: 'confirmed'
        },
        {
            id: 'VR240120002',
            name: '이영희',
            phone: '010-2345-6789',
            date: '2024.01.20',
            time: '15:00',
            adults: 1,
            children: 2,
            status: 'pending'
        },
        {
            id: 'VR240120003',
            name: '박민수',
            phone: '010-3456-7890',
            date: '2024.01.20',
            time: '16:00',
            adults: 3,
            children: 0,
            status: 'confirmed'
        }
    ];
    
    reservationsTableBody.innerHTML = '';
    
    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.id}</td>
            <td>${reservation.name}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.date} ${reservation.time}</td>
            <td>성인 ${reservation.adults}명, 어린이 ${reservation.children}명</td>
            <td><span class="status ${reservation.status}">${getStatusText(reservation.status)}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="viewReservation('${reservation.id}')">상세</button>
                <button class="btn btn-sm btn-danger" onclick="cancelReservation('${reservation.id}')">취소</button>
            </td>
        `;
        reservationsTableBody.appendChild(row);
    });
}

function getStatusText(status) {
    const statusMap = {
        confirmed: '확정',
        pending: '대기',
        cancelled: '취소'
    };
    return statusMap[status] || status;
}

function applyFilters() {
    // Implement filter logic here
    console.log('Applying filters...');
    loadReservations(); // Reload with filters
}

function viewAdminReservation(reservationId) {
    // Implement view reservation modal
    console.log('Viewing reservation:', reservationId);
    
    // Sample reservation data
    const sampleReservation = {
        id: reservationId,
        name: '김철수',
        phone: '010-1234-5678',
        email: 'kim@example.com',
        date: '2024.01.20',
        time: '14:00',
        adults: 2,
        children: 1,
        status: 'confirmed',
        total: 40000,
        paymentMethod: '신용카드',
        reservationDate: '2024.01.15 10:30'
    };
    
    // Update modal content
    document.getElementById('admin-reservation-number').textContent = sampleReservation.id;
    document.getElementById('admin-reservation-name').textContent = sampleReservation.name;
    document.getElementById('admin-reservation-phone').textContent = sampleReservation.phone;
    document.getElementById('admin-reservation-email').textContent = sampleReservation.email;
    document.getElementById('admin-experience-date').textContent = sampleReservation.date;
    document.getElementById('admin-experience-time').textContent = sampleReservation.time;
    document.getElementById('admin-participants').textContent = `성인 ${sampleReservation.adults}명, 어린이 ${sampleReservation.children}명`;
    document.getElementById('admin-total-amount').textContent = sampleReservation.total.toLocaleString() + '원';
    document.getElementById('admin-payment-method').textContent = sampleReservation.paymentMethod;
    document.getElementById('admin-reservation-date').textContent = sampleReservation.reservationDate;
    
    // Update status
    const statusElement = document.getElementById('admin-status');
    statusElement.textContent = '확정';
    statusElement.className = 'value status confirmed';
    
    // Show modal
    const modal = document.getElementById('reservation-details-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function cancelReservation(reservationId) {
    if (confirm('정말로 이 예약을 취소하시겠습니까?')) {
        // Implement cancel logic
        console.log('Cancelling reservation:', reservationId);
        alert('예약이 취소되었습니다.');
        loadReservations(); // Reload table
    }
}

// Content management
function initContentManagement() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('#content .tab-btn');
    const tabPanels = document.querySelectorAll('#content .tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Notifications
function initNotifications() {
    const notificationForm = document.querySelector('.notification-form');
    const titleInput = document.getElementById('notification-title');
    const messageInput = document.getElementById('notification-message');
    
    // Update preview when inputs change
    if (titleInput && messageInput) {
        titleInput.addEventListener('input', updatePreview);
        messageInput.addEventListener('input', updatePreview);
    }
    
    // Send notification
    const sendBtn = notificationForm?.querySelector('.btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendNotification);
    }
}

function updatePreview() {
    const titleInput = document.getElementById('notification-title');
    const messageInput = document.getElementById('notification-message');
    const previewTitle = document.querySelector('.preview-title');
    const previewMessage = document.querySelector('.preview-message');
    
    if (titleInput && previewTitle) {
        previewTitle.textContent = titleInput.value || '알림 제목';
    }
    
    if (messageInput && previewMessage) {
        previewMessage.textContent = messageInput.value || '알림 내용이 여기에 표시됩니다.';
    }
}

function sendNotification() {
    const type = document.getElementById('notification-type').value;
    const target = document.getElementById('notification-target').value;
    const title = document.getElementById('notification-title').value;
    const message = document.getElementById('notification-message').value;
    
    if (!title || !message) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }
    
    // Simulate sending notification
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>알림을 발송하고 있습니다...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        document.body.removeChild(loadingOverlay);
        alert('알림이 성공적으로 발송되었습니다.');
        
        // Add to history
        addToHistory({
            title,
            target,
            date: new Date().toLocaleString('ko-KR'),
            sent: 24,
            success: 24,
            status: 'success'
        });
        
        // Clear form
        document.getElementById('notification-title').value = '';
        document.getElementById('notification-message').value = '';
        updatePreview();
    }, 2000);
}

function addToHistory(notification) {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div class="history-info">
            <h4>${notification.title}</h4>
            <p>${notification.target} 대상</p>
            <span class="history-date">${notification.date}</span>
        </div>
        <div class="history-stats">
            <span class="stat-item">발송: ${notification.sent}명</span>
            <span class="stat-item">성공: ${notification.success}명</span>
            <span class="stat-item status success">완료</span>
        </div>
    `;
    
    historyList.insertBefore(historyItem, historyList.firstChild);
}

// Analytics
function initAnalytics() {
    // Analytics functionality can be expanded here
    console.log('Analytics initialized');
}

// Settings
function initSettings() {
    // Settings tabs
    const tabBtns = document.querySelectorAll('#settings .tab-btn');
    const tabPanels = document.querySelectorAll('#settings .tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Save settings
    const settingsForm = document.querySelector('#settings');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
}

function saveSettings() {
    // Collect all settings
    const settings = {
        siteName: document.getElementById('site-name')?.value,
        siteDescription: document.getElementById('site-description')?.value,
        maxCapacity: document.getElementById('max-capacity')?.value,
        adultPrice: document.getElementById('adult-price')?.value,
        childPrice: document.getElementById('child-price')?.value
    };
    
    // Simulate saving
    console.log('Saving settings:', settings);
    alert('설정이 저장되었습니다.');
}

// Modal functionality
function initModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modals with close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
}

function openContentModal() {
    const modal = document.getElementById('content-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeContentModal() {
    const modal = document.getElementById('content-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openNotificationModal() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeNotificationModal() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
    }
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('ko-KR');
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('ko-KR');
}

// Export data functionality
function exportReservations() {
    // Implement Excel export
    console.log('Exporting reservations to Excel...');
    alert('예약 데이터가 엑셀 파일로 다운로드됩니다.');
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement search logic based on current section
            console.log('Searching for:', query);
        });
    }
}

// Initialize search
initSearch();

// Real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update stats occasionally
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            if (Math.random() > 0.95) { // 5% chance
                const newValue = currentValue + Math.floor(Math.random() * 3);
                stat.textContent = formatNumber(newValue);
            }
        });
    }, 10000); // Check every 10 seconds
}

// Start real-time updates
simulateRealTimeUpdates();

// Admin Preview Functions
function closeReservationDetailsModal() {
    const modal = document.getElementById('reservation-details-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function modifyAdminReservation() {
    closeReservationDetailsModal();
    alert('예약 수정 기능이 구현됩니다.');
}

function cancelAdminReservation(reservationId) {
    if (confirm('정말로 이 예약을 취소하시겠습니까?')) {
        alert('예약이 취소되었습니다.');
        closeReservationDetailsModal();
        loadReservations(); // Reload table
    }
}

function sendReminder() {
    alert('알림이 발송되었습니다.');
}

function openContentPreviewModal(contentData) {
    const modal = document.getElementById('content-preview-modal');
    if (modal) {
        // Update preview content
        document.getElementById('preview-content-image').src = contentData.src;
        document.getElementById('preview-content-date').textContent = contentData.date;
        document.getElementById('preview-content-category').textContent = contentData.category;
        document.getElementById('preview-content-title').textContent = contentData.title;
        document.getElementById('preview-content-description').innerHTML = contentData.description;
        
        modal.classList.add('show');
    }
}

function closeContentPreviewModal() {
    const modal = document.getElementById('content-preview-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function editContent() {
    closeContentPreviewModal();
    alert('콘텐츠 수정 기능이 구현됩니다.');
}

function openAnalyticsPreviewModal() {
    const modal = document.getElementById('analytics-preview-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Initialize analytics tabs
        initAnalyticsTabs();
        
        // Initialize charts
        initAnalyticsCharts();
    }
}

function closeAnalyticsPreviewModal() {
    const modal = document.getElementById('analytics-preview-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function initAnalyticsTabs() {
    const tabBtns = document.querySelectorAll('#analytics-preview-modal .tab-btn');
    const tabPanels = document.querySelectorAll('#analytics-preview-modal .tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${tabId}-analytics`).classList.add('active');
        });
    });
}

function initAnalyticsCharts() {
    // Daily Chart
    const dailyCtx = document.getElementById('daily-chart');
    if (dailyCtx) {
        new Chart(dailyCtx, {
            type: 'line',
            data: {
                labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일'],
                datasets: [{
                    label: '일별 예약 수',
                    data: [12, 19, 15, 25, 22, 18, 14],
                    borderColor: 'rgba(78, 205, 196, 1)',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Weekly Chart
    const weeklyCtx = document.getElementById('weekly-chart');
    if (weeklyCtx) {
        new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: ['1주차', '2주차', '3주차', '4주차'],
                datasets: [{
                    label: '주별 예약 수',
                    data: [85, 92, 78, 95],
                    backgroundColor: 'rgba(78, 205, 196, 0.8)',
                    borderColor: 'rgba(78, 205, 196, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Monthly Chart
    const monthlyCtx = document.getElementById('monthly-chart');
    if (monthlyCtx) {
        new Chart(monthlyCtx, {
            type: 'doughnut',
            data: {
                labels: ['1월', '2월', '3월', '4월'],
                datasets: [{
                    data: [350, 420, 380, 450],
                    backgroundColor: [
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function exportAnalytics() {
    alert('통계 데이터가 엑셀 파일로 다운로드됩니다.');
}

// Enhanced dashboard interactions
function initDashboardInteractions() {
    // Make dashboard cards clickable
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            if (title.includes('예약')) {
                // Switch to reservations section
                document.querySelector('[data-section="reservations"]').click();
            } else if (title.includes('방문자')) {
                // Switch to analytics section
                document.querySelector('[data-section="analytics"]').click();
            } else if (title.includes('매출')) {
                // Switch to analytics section
                document.querySelector('[data-section="analytics"]').click();
            }
        });
    });
    
    // Make reservation items clickable
    const reservationItems = document.querySelectorAll('.reservation-item');
    reservationItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('h4').textContent;
            viewAdminReservation('VR' + Date.now().toString().slice(-6));
        });
    });
    
    // Make content items clickable
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const contentData = {
                src: 'images/news1.jpg',
                date: '2024.01.15',
                category: '뉴스',
                title: title,
                description: this.querySelector('p').textContent
            };
            openContentPreviewModal(contentData);
        });
    });
    
    // Make analytics cards clickable
    const analyticsCards = document.querySelectorAll('.analytics-card');
    analyticsCards.forEach(card => {
        card.addEventListener('click', function() {
            openAnalyticsPreviewModal();
        });
    });
}

// Initialize dashboard interactions
initDashboardInteractions();
