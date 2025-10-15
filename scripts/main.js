// Main JavaScript functionality for the Safari VR Experience website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initReservationModal();
    initGallery();
    initLanguageToggle();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) { // 100 -> 50으로 조절하여 더 빨리 반응하도록
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reservation modal functionality
function initReservationModal() {
    const modal = document.getElementById('reservation-modal');
    const form = document.getElementById('reservation-form');

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const reservationData = {
            date: formData.get('date'),
            time: formData.get('time'),
            adults: parseInt(formData.get('adults')),
            children: parseInt(formData.get('children')),
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email')
        };

        // Validate form
        if (validateReservationForm(reservationData)) {
            // Submit reservation
            submitReservation(reservationData);
        }
    });

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Update available times based on selected date
    dateInput.addEventListener('change', function() {
        updateAvailableTimes(this.value);
    });
}

// Open reservation modal
function openReservationModal() {
    const modal = document.getElementById('reservation-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close reservation modal
function closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('reservation-modal');
    if (e.target === modal) {
        closeReservationModal();
    }
});

// Validate reservation form
function validateReservationForm(data) {
    const errors = [];

    if (!data.date) {
        errors.push('날짜를 선택해주세요.');
    }

    if (!data.time) {
        errors.push('시간을 선택해주세요.');
    }

    if (data.adults + data.children === 0) {
        errors.push('최소 1명 이상 예약해주세요.');
    }

    if (!data.name || data.name.trim().length < 2) {
        errors.push('예약자명을 정확히 입력해주세요.');
    }

    if (!data.phone || !/^[0-9-+\s()]+$/.test(data.phone)) {
        errors.push('올바른 연락처를 입력해주세요.');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('올바른 이메일을 입력해주세요.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }

    return true;
}

// Update available times based on selected date
function updateAvailableTimes(selectedDate) {
    const timeSelect = document.getElementById('time');
    const selectedDay = new Date(selectedDate).getDay();
    
    // Clear existing options except the first one
    timeSelect.innerHTML = '<option value="">시간을 선택하세요</option>';
    
    // Define available times based on day of week
    let availableTimes = [];
    
    if (selectedDay === 0 || selectedDay === 6) { // Weekend
        availableTimes = [
            { value: '09:00', text: '09:00' },
            { value: '10:00', text: '10:00' },
            { value: '11:00', text: '11:00' },
            { value: '14:00', text: '14:00' },
            { value: '15:00', text: '15:00' },
            { value: '16:00', text: '16:00' },
            { value: '17:00', text: '17:00' },
            { value: '18:00', text: '18:00' }
        ];
    } else { // Weekday
        availableTimes = [
            { value: '10:00', text: '10:00' },
            { value: '11:00', text: '11:00' },
            { value: '14:00', text: '14:00' },
            { value: '15:00', text: '15:00' },
            { value: '16:00', text: '16:00' },
            { value: '17:00', text: '17:00' }
        ];
    }
    
    // Add available time options
    availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time.value;
        option.textContent = time.text;
        timeSelect.appendChild(option);
    });
}

// Submit reservation
function submitReservation(data) {
    // Show loading state
    const submitBtn = document.querySelector('#reservation-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '예약 처리 중...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Generate reservation number
        const reservationNumber = 'VR' + Date.now().toString().slice(-6);
        
        // Show success message
        alert(`예약이 완료되었습니다!\n예약번호: ${reservationNumber}\n예약일시: ${data.date} ${data.time}\n인원: 성인 ${data.adults}명, 어린이 ${data.children}명`);
        
        // Reset form and close modal
        document.getElementById('reservation-form').reset();
        closeReservationModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In a real application, you would send this data to your backend
        console.log('Reservation submitted:', { ...data, reservationNumber });
        
    }, 2000);
}

// Gallery functionality
function initGallery() {
    // Gallery items are now handled by onclick events in HTML
    console.log('Gallery initialized');
}

// Gallery data
const galleryData = [
    {
        src: 'images/gallery1.jpg',
        alt: 'VR 체험 모습',
        title: 'VR 체험 현장',
        description: '최신 VR 기술로 아프리카 사파리의 생생한 현장감을 경험하는 모습입니다.'
    },
    {
        src: 'images/gallery2.jpg',
        alt: '사파리 동물들',
        title: '사파리 동물들',
        description: '실감형 VR 체험에서 만날 수 있는 아프리카 사파리의 다양한 동물들입니다.'
    },
    {
        src: 'images/gallery3.jpg',
        alt: '체험자 모습',
        title: '체험자 모습',
        description: '가족과 함께 즐거운 VR 사파리 체험을 하고 있는 모습입니다.'
    },
    {
        src: 'images/gallery4.jpg',
        alt: 'VR 장비',
        title: 'VR 장비',
        description: '최첨단 VR 헤드셋과 컨트롤러로 몰입감 있는 체험을 제공합니다.'
    }
];

// News data
const newsData = [
    {
        src: 'images/news1.jpg',
        alt: '실감형 사파리 체험 오픈',
        title: '실감형 사파리 체험 오픈',
        date: '2024.01.15',
        category: '오픈',
        content: `
            <p>부산어린이대공원에서 새로운 VR 체험 시설이 오픈했습니다. 이번에 선보이는 실감형 사파리 체험은 최신 VR 기술을 활용하여 아프리카 사파리의 생생한 현장감을 제공합니다.</p>
            
            <h4>주요 특징</h4>
            <ul>
                <li>최신 VR 헤드셋과 컨트롤러 사용</li>
                <li>4K 고화질 영상으로 몰입감 극대화</li>
                <li>30분간의 집중적인 체험 시간</li>
                <li>회차당 최대 20명까지 동시 체험 가능</li>
            </ul>
            
            <p>체험은 평일 오전 10시부터 오후 6시까지, 주말에는 오전 9시부터 오후 7시까지 운영됩니다. 예약은 온라인을 통해 가능하며, 성인 15,000원, 어린이 10,000원의 요금이 적용됩니다.</p>
            
            <p>이번 오픈을 통해 부산 시민들은 집에서도 아프리카 사파리의 신비로운 동물들과 만날 수 있는 특별한 경험을 할 수 있게 되었습니다.</p>
        `
    },
    {
        src: 'images/news2.jpg',
        alt: '체험 이용객 1만명 돌파',
        title: '체험 이용객 1만명 돌파',
        date: '2024.01.10',
        category: '성과',
        content: `
            <p>부산어린이대공원 실감형 사파리 체험이 개장 3개월 만에 누적 이용객 1만명을 돌파했습니다. 이는 시설의 높은 인기와 만족도를 보여주는 의미 있는 성과입니다.</p>
            
            <h4>주요 성과</h4>
            <ul>
                <li>개장 3개월 만에 누적 이용객 1만명 돌파</li>
                <li>평균 만족도 4.8점 (5점 만점)</li>
                <li>재방문율 85% 달성</li>
                <li>주말 예약률 95% 이상 유지</li>
            </ul>
            
            <p>특히 가족 단위 방문객들이 전체 이용객의 70%를 차지하며, VR 기술에 대한 높은 관심과 만족도를 보여주고 있습니다. 어린이들은 물론 성인들도 함께 즐길 수 있는 체험으로 높은 평가를 받고 있습니다.</p>
            
            <p>이번 성과에 힘입어 부산어린이대공원은 추가 VR 체험 콘텐츠 개발을 검토하고 있으며, 더욱 다양한 체험 프로그램을 제공할 계획입니다.</p>
        `
    }
];

// Video data
const videoData = {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: '실감형 사파리 체험 소개 영상',
    description: 'VR 기술을 활용한 아프리카 사파리 체험의 생생한 현장을 영상으로 만나보세요.'
};

let currentGalleryIndex = 0;

// Gallery Modal Functions
function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    const data = galleryData[index];
    
    if (modal && data) {
        document.getElementById('gallery-modal-image').src = data.src;
        document.getElementById('gallery-modal-image').alt = data.alt;
        document.getElementById('gallery-modal-title').textContent = data.title;
        document.getElementById('gallery-modal-description').textContent = data.description;
        document.getElementById('current-image').textContent = index + 1;
        document.getElementById('total-images').textContent = galleryData.length;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function previousImage() {
    currentGalleryIndex = currentGalleryIndex > 0 ? currentGalleryIndex - 1 : galleryData.length - 1;
    openGalleryModal(currentGalleryIndex);
}

function nextImage() {
    currentGalleryIndex = currentGalleryIndex < galleryData.length - 1 ? currentGalleryIndex + 1 : 0;
    openGalleryModal(currentGalleryIndex);
}

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        document.getElementById('video-modal-iframe').src = videoData.src;
        document.getElementById('video-modal-title').textContent = videoData.title;
        document.getElementById('video-modal-description').textContent = videoData.description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop video playback
        const iframe = document.getElementById('video-modal-iframe');
        iframe.src = '';
    }
}

// News Modal Functions
function openNewsModal(index) {
    const modal = document.getElementById('news-modal');
    const data = newsData[index];
    
    if (modal && data) {
        document.getElementById('news-modal-image').src = data.src;
        document.getElementById('news-modal-image').alt = data.alt;
        document.getElementById('news-modal-title').textContent = data.title;
        document.getElementById('news-modal-date').textContent = data.date;
        document.getElementById('news-modal-category').textContent = data.category;
        document.getElementById('news-modal-content').innerHTML = data.content;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function shareNews() {
    if (navigator.share) {
        const title = document.getElementById('news-modal-title').textContent;
        navigator.share({
            title: title,
            text: '부산어린이대공원 실감형 사파리 체험',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 클립보드에 복사되었습니다.');
        });
    }
}

function printNews() {
    const printWindow = window.open('', '_blank');
    const title = document.getElementById('news-modal-title').textContent;
    const date = document.getElementById('news-modal-date').textContent;
    const content = document.getElementById('news-modal-content').innerHTML;
    const image = document.getElementById('news-modal-image').src;
    
    printWindow.document.write(`
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: 'Noto Sans KR', sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #2c3e50; border-bottom: 2px solid #4ecdc4; padding-bottom: 10px; }
                .meta { color: #666; margin-bottom: 20px; }
                img { max-width: 100%; height: auto; margin: 20px 0; border-radius: 10px; }
                h4 { color: #4ecdc4; margin-top: 30px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 5px; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">발행일: ${date} | 부산어린이대공원</div>
            <img src="${image}" alt="${title}">
            ${content}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Language toggle functionality
function initLanguageToggle() {
    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'ko';
    
    langBtn.addEventListener('click', function() {
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        langBtn.textContent = currentLang === 'ko' ? 'EN' : '한';
        
        // In a real application, you would implement actual language switching
        console.log('Language switched to:', currentLang);
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .info-card, .gallery-item, .news-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility function for scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle form validation and user feedback
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {

    // 2. 스크롤 시 섹션 나타나는 애니메이션
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // 섹션이 10% 보이면 실행

    sections.forEach(section => {
        observer.observe(section);
    });

});

/* ================================================================= */
/* ================== 한/영 전환 기능 (아래 코드 추가) ================== */
/* ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // (기존 스크롤 관련 코드는 여기에 그대로 둡니다)

    // --- 한/영 전환 로직 시작 ---

    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'ko'; // 현재 언어 상태 (기본: 한국어)

    // 1. 번역할 텍스트를 객체 형태로 준비합니다.
    const langData = {
        // --- 헤더 메뉴 ---
        'nav-about': {
            ko: '체험 소개',
            en: 'About'
        },
        'nav-reservation': {
            ko: '예약하기',
            en: 'Reservation'
        },
        'nav-gallery': {
            ko: '갤러리',
            en: 'Gallery'
        },
        'nav-news': {
            ko: '소식',
            en: 'News'
        },
        'nav-contact': {
            ko: '이용안내',
            en: 'Information'
        },
        // --- 히어로 섹션 ---
        'hero-main-title': {
            ko: '부산어린이대공원',
            en: 'Busan Children\'s Grand Park'
        },
        'hero-sub-title': {
            ko: '실감형 사파리 "다모디아"',
            en: 'Immersive Safari "DAMODIA"'
        },
        'hero-subtitle': {
            ko: '가상현실로 만나는 아프리카의 신비로운 동물 세계',
            en: 'Experience the Mysterious World of African Safari in Virtual Reality'
        },
        'hero-button': {
            ko: '예약하기',
            en: 'Book Now'
        }
        // ... (여기에 ID를 추가한 모든 요소의 텍스트를 추가합니다)
    };

    // 2. 언어 변경 함수
    const changeLanguage = () => {
        // HTML 요소들의 텍스트를 현재 언어에 맞게 변경
        for (const id in langData) {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = langData[id][currentLang];
            }
        }
        // 버튼 텍스트 변경 (KO -> EN, EN -> KO)
        langBtn.textContent = (currentLang === 'ko') ? 'EN' : 'KO';
    };


    // 3. 언어 전환 버튼에 클릭 이벤트 추가
    langBtn.addEventListener('click', () => {
        // 현재 언어를 'ko'면 'en'으로, 'en'이면 'ko'로 변경
        currentLang = (currentLang === 'ko') ? 'en' : 'ko';
        
        // 언어 변경 함수 실행
        changeLanguage();
    });

    // 초기 페이지 로드 시 기본 언어(한국어)로 설정
    changeLanguage(); 
});
