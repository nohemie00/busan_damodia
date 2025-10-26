// ===================================================================
// START: 언어 번역 데이터 (파일 최상단)
// ===================================================================
const langData = {
    'page-title': { ko: '부산어린이대공원 실감형 사파리', en: 'Busan Children\'s Grand Park - Immersive Safari' },
    'nav-about': { ko: '체험 소개', en: 'About' },
    'nav-reservation': { ko: '예약하기', en: 'Reservation' },
    'nav-gallery': { ko: '갤러리', en: 'Gallery' },
    'nav-news': { ko: '게시판', en: 'Board' }, // HTML ID가 nav-news 이지만 텍스트는 게시판
    'nav-contact': { ko: '이용안내', en: 'Information' },
    'hero-main-title': { ko: '부산어린이대공원', en: 'Busan Children\'s Grand Park' },
    'hero-sub-title': { ko: '해가 지면 살아나는 실감형 사파리 "다모디아"', en: 'Immersive Safari "DAMODIA" Comes Alive After Sunset' },
    'hero-subtitle-text': { ko: '부산 시민들의 꿈과 소망으로 이루어진 섬. 잠든 다모디아를 깨울 탐험대를 모집합니다.', en: 'An island made of the dreams and hopes of Busan citizens. Recruiting explorers to awaken the sleeping Damodia.' },
    'hero-button-text': { ko: '예약하기', en: 'Book Now' },
    'about-title': { ko: '체험 소개', en: 'About the Experience' },
    'about-card1-title': { ko: 'Digi-log', en: 'Digi-log' },
    'about-card1-desc': { ko: '디지털 사파리와 오리엔티어링의 결합', en: 'Combination of Digital Safari and Orienteering' },
    'about-card2-title': { ko: '그룹 체험', en: 'Group Experience' },
    'about-card2-desc': { ko: '가족, 친구들과 함께하는 특별한 체험', en: 'A special experience with family and friends' },
    'about-card3-title': { ko: '100분 체험', en: '100-Minute Experience' },
    'about-card3-desc': { ko: '다채롭고 능동적인 체험으로 시간 순삭', en: 'Time flies with diverse and active experiences' },
    'reservation-title': { ko: '예약하기', en: 'Make a Reservation' },
    'res-card1-title': { ko: '운영시간', en: 'Operating Hours' },
    'res-card1-desc': { ko: '평일: 18:00 - 21:00<br>주말: 18:00 - 22:00', en: 'Weekdays: 18:00 - 21:00<br>Weekends: 18:00 - 22:00' },
    'res-card2-title': { ko: '정원', en: 'Capacity' },
    'res-card2-desc': { ko: '회차당 최대 100명<br>(3세 이상 권장)', en: 'Max 100 people per session<br>(Ages 3+ recommended)' },
    'res-card3-title': { ko: '이용요금', en: 'Pricing' },
    'res-card3-desc': { ko: '성인: 10,000원<br>어린이: 5,000원', en: 'Adult: 10,000 KRW<br>Child: 5,000 KRW' },
    'res-button-text': { ko: '지금 예약하기', en: 'Book Your Tour Now' },
    'gallery-title': { ko: '갤러리', en: 'Gallery' },
    'news-title': { ko: '게시판', en: 'Board' },
    'news1-title': { ko: '실감형 사파리 체험 오픈', en: 'Immersive Safari Experience Now Open' },
    'news1-desc': { ko: '부산어린이대공원에서 새로운 VR 체험 시설이 오픈했습니다.', en: 'A new VR experience facility has opened at Busan Children\'s Grand Park.' },
    'news2-title': { ko: '체험 이용객 100만명 돌파', en: 'Visitor Count Surpasses 1 Million' },
    'news2-desc': { ko: '개장 3개월 만에 누적 이용객이 100만명을 돌파했습니다.', en: 'The cumulative number of visitors surpassed 1 million just three months after opening.' },
    'contact-title': { ko: '이용안내', en: 'Information' },
    'contact-info-title': { ko: '연락처 정보', en: 'Contact Information' },
    'contact-address': { ko: '부산광역시 부산진구 새싹로 295', en: '295 Saessak-ro, Busanjin-gu, Busan' },
    'footer-title': { ko: '부산어린이대공원', en: 'Busan Children\'s Grand Park' },
    'footer-subtitle': { ko: '실감형 사파리 체험', en: 'Immersive Safari Experience' },
    'footer-link1': { ko: '개인정보처리방침', en: 'Privacy Policy' },
    'footer-link2': { ko: '이용약관', en: 'Terms of Service' },
    'footer-link3': { ko: '사이트맵', en: 'Sitemap' },
    'footer-copy': { ko: '© 2025 부산어린이대공원. All rights reserved.', en: '© 2025 Busan Children\'s Grand Park. All rights reserved.' },
};
// ===================================================================
// END: 언어 번역 데이터 끝
// ===================================================================

// Main JavaScript functionality for the Safari VR Experience website

// 하나의 DOMContentLoaded 리스너로 통합
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initReservationModal();
    initGallery();
    initLanguageToggle(); // 올바른 함수로 교체됨
    initAnimations();

    // 스크롤 시 섹션 나타나는 애니메이션 (하나의 리스너 안으로 이동)
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) { // section 요소가 있는 페이지에서만 실행
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            // Check if navMenu exists and is active before trying to close
            if (navMenu.classList.contains('active') && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        // 내부 링크(#)인 경우에만 smooth scrolling과 메뉴 닫기 로직 적용
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                // Smooth scrolling은 initSmoothScrolling에서 처리하므로 여기서는 메뉴 닫기만
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }
    });

    // Header background on scroll - CSS 클래스 방식 사용 (기존 인라인 스타일 방식 제거됨)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // href="#" 인 경우 스크롤하지 않음
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reservation modal functionality - index.html 에만 필요한 요소 체크 강화
function initReservationModal() {
    const modal = document.getElementById('reservation-modal');
    const form = document.getElementById('reservation-form');
    const dateInput = document.getElementById('date');

    // 예약 모달 관련 요소들이 모두 존재하는 index.html 에서만 실행
    if (modal && form && dateInput) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const reservationData = {
                date: formData.get('date'),
                time: formData.get('time'),
                adults: parseInt(formData.get('adults')) || 0, // 기본값 0 처리
                children: parseInt(formData.get('children')) || 0, // 기본값 0 처리
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email')
            };

            if (validateReservationForm(reservationData)) {
                submitReservation(reservationData);
            }
        });

        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        dateInput.addEventListener('change', function() {
            updateAvailableTimes(this.value);
        });
    }
}

// Open reservation modal - index.html 요소 체크
function openReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close reservation modal - index.html 요소 체크
function closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside - 모든 모달 대상
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            // 각 모달 닫는 함수 호출 (해당 함수가 정의되어 있는지 확인)
            if (modal.id === 'reservation-modal' && typeof closeReservationModal === 'function') closeReservationModal();
            else if (modal.id === 'gallery-modal' && typeof closeGalleryModal === 'function') closeGalleryModal();
            else if (modal.id === 'video-modal' && typeof closeVideoModal === 'function') closeVideoModal();
            else if (modal.id === 'news-modal' && typeof closeNewsModal === 'function') closeNewsModal();
            // reservation.html의 성공/상세 모달 닫기 로직도 필요하면 여기에 추가
            else if (modal.id === 'success-modal' || modal.id === 'reservation-details-modal' || modal.id === 'preview-modal') {
                 modal.style.display = 'none'; // 간단히 닫기
                 if (!document.querySelector('.modal[style*="display: block"]')) { // 다른 모달이 열려있지 않으면 스크롤 복구
                     document.body.style.overflow = 'auto';
                 }
            }
        }
    });
});

// Validate reservation form (사용자 원본 코드 유지)
function validateReservationForm(data) {
    const errors = [];

    if (!data.date) {
        errors.push('날짜를 선택해주세요.');
    }

    if (!data.time) {
        errors.push('시간을 선택해주세요.');
    }

    if ((data.adults || 0) + (data.children || 0) === 0) { // NaN 방지
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

// Update available times (사용자 원본 코드 유지)
function updateAvailableTimes(selectedDate) {
    const timeSelect = document.getElementById('time');
    // timeSelect가 없는 reservation.html 등 고려
    if (!timeSelect) return;

    const selectedDay = new Date(selectedDate).getDay();

    timeSelect.innerHTML = '<option value="">시간을 선택하세요</option>';

    let availableTimes = [];

    if (selectedDay === 0 || selectedDay === 6) { // Weekend
        availableTimes = [
            { value: '09:00', text: '09:00' }, { value: '10:00', text: '10:00' },
            { value: '11:00', text: '11:00' }, { value: '14:00', text: '14:00' },
            { value: '15:00', text: '15:00' }, { value: '16:00', text: '16:00' },
            { value: '17:00', text: '17:00' }, { value: '18:00', text: '18:00' }
        ];
    } else { // Weekday
        availableTimes = [
            { value: '10:00', text: '10:00' }, { value: '11:00', text: '11:00' },
            { value: '14:00', text: '14:00' }, { value: '15:00', text: '15:00' },
            { value: '16:00', text: '16:00' }, { value: '17:00', text: '17:00' }
        ];
    }

    availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time.value;
        option.textContent = time.text;
        timeSelect.appendChild(option);
    });
}

// Submit reservation (사용자 원본 코드 유지)
function submitReservation(data) {
    const submitBtn = document.querySelector('#reservation-form button[type="submit"]');
    // submitBtn이 없는 경우 대비
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = '예약 처리 중...';
    submitBtn.disabled = true;

    setTimeout(() => {
        const reservationNumber = 'VR' + Date.now().toString().slice(-6);

        alert(`예약이 완료되었습니다!\n예약번호: ${reservationNumber}\n예약일시: ${data.date} ${data.time}\n인원: 성인 ${data.adults}명, 어린이 ${data.children}명`);

        const form = document.getElementById('reservation-form');
        if (form) form.reset();
        closeReservationModal();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        console.log('Reservation submitted:', { ...data, reservationNumber });

    }, 2000);
}

// Gallery functionality (사용자 원본 코드 유지)
function initGallery() {
    if (document.getElementById('gallery')) {
        console.log('Gallery initialized');
    }
}

// Gallery data (사용자 원본 코드 유지)
const galleryData = [ /* ... (사용자 원본 데이터) ... */ ];
// News data (사용자 원본 코드 유지)
const newsData = [ /* ... (사용자 원본 데이터) ... */ ];
// Video data (사용자 원본 코드 유지)
const videoData = { /* ... (사용자 원본 데이터) ... */ };

let currentGalleryIndex = 0;

// Gallery Modal Functions (사용자 원본 코드 유지, 요소 체크 추가)
function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    const data = galleryData[index];

    // 필요한 요소들이 모두 있는지 확인
    const imgEl = document.getElementById('gallery-modal-image');
    const titleEl = document.getElementById('gallery-modal-title');
    const descEl = document.getElementById('gallery-modal-description');
    const currentImgEl = document.getElementById('current-image');
    const totalImgEl = document.getElementById('total-images');

    if (modal && data && imgEl && titleEl && descEl && currentImgEl && totalImgEl) {
        imgEl.src = data.src;
        imgEl.alt = data.alt;
        titleEl.textContent = data.title;
        descEl.textContent = data.description;
        currentImgEl.textContent = index + 1;
        totalImgEl.textContent = galleryData.length;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Gallery modal elements not found!");
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

// Video Modal Functions (사용자 원본 코드 유지, 요소 체크 추가)
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframeEl = document.getElementById('video-modal-iframe');
    const titleEl = document.getElementById('video-modal-title');
    const descEl = document.getElementById('video-modal-description');

    if (modal && iframeEl && titleEl && descEl && videoData) {
        iframeEl.src = videoData.src;
        titleEl.textContent = videoData.title;
        descEl.textContent = videoData.description;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
         console.error("Video modal elements not found!");
    }
}
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (iframe) iframe.src = ''; // Stop video
    }
}

// News Modal Functions (사용자 원본 코드 유지, 요소 체크 추가)
function openNewsModal(index) {
    const modal = document.getElementById('news-modal');
    const data = newsData[index];

    const imgEl = document.getElementById('news-modal-image');
    const titleEl = document.getElementById('news-modal-title');
    const dateEl = document.getElementById('news-modal-date');
    const categoryEl = document.getElementById('news-modal-category');
    const contentEl = document.getElementById('news-modal-content');

    if (modal && data && imgEl && titleEl && dateEl && categoryEl && contentEl) {
        imgEl.src = data.src;
        imgEl.alt = data.alt;
        titleEl.textContent = data.title;
        dateEl.textContent = data.date;
        categoryEl.textContent = data.category;
        contentEl.innerHTML = data.content;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.error("News modal elements not found!");
    }
}
function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Share/Print News (사용자 원본 코드 유지, 요소 체크 추가)
function shareNews() {
    const titleEl = document.getElementById('news-modal-title');
    if (!titleEl) return;
    const title = titleEl.textContent;

    if (navigator.share) {
        navigator.share({ /* ... */ });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('링크가 클립보드에 복사되었습니다.');
        });
    }
}
function printNews() {
    const titleEl = document.getElementById('news-modal-title');
    const dateEl = document.getElementById('news-modal-date');
    const contentEl = document.getElementById('news-modal-content');
    const imageEl = document.getElementById('news-modal-image');

    if (!titleEl || !dateEl || !contentEl || !imageEl) return;

    const title = titleEl.textContent;
    const date = dateEl.textContent;
    const content = contentEl.innerHTML;
    const image = imageEl.src;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html>... (사용자 원본 인쇄 HTML) ...</html>`);
    printWindow.document.close();
    printWindow.print();
}

// ===================================================================
// START: 수정된 Language toggle functionality
// ===================================================================
function initLanguageToggle() {
    const langBtn = document.getElementById('lang-btn');
    if (!langBtn) return; // 버튼 없는 페이지 고려

    let currentLang = 'ko';

    const changeLanguage = () => {
        const pageTitle = document.getElementById('page-title');
        if(pageTitle) pageTitle.textContent = langData['page-title'][currentLang];

        for (const id in langData) {
            if (id === 'page-title') continue;
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = langData[id][currentLang];
            }
        }
        langBtn.textContent = (currentLang === 'ko') ? 'EN' : 'KO';
    };

    langBtn.addEventListener('click', () => {
        currentLang = (currentLang === 'ko') ? 'en' : 'ko';
        changeLanguage();
    });

    changeLanguage(); // Initial call
}
// ===================================================================
// END: Language toggle functionality 끝
// ===================================================================

// Scroll animations (사용자 원본 코드 유지, 클래스명만 visible로 통일)
function initAnimations() {
    // index.html 에만 필요한 요소 체크 (예: .about-card 존재 여부)
    if (!document.querySelector('.about-card')) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // fade-in-up 대신 CSS 파일과 일치하는 'visible' 클래스 사용
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번 보이면 관찰 중지
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .info-card, .gallery-item, .news-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility function for scrolling to sections (사용자 원본 코드 유지)
function scrollToSection(sectionId) {
    // sectionId가 #으로 시작하면 제거
    const id = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    const section = document.getElementById(id);
    if (section) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle form validation and user feedback (사용자 원본 코드 유지)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    // ... (나머지 알림 코드) ...
    document.body.appendChild(notification);
    setTimeout(() => { /* ... 알림 제거 코드 ... */ }, 3000);
}

// Add CSS animations for notifications (사용자 원본 코드 유지 - CSS로 옮기는 것 추천)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight { /* ... */ }
    @keyframes slideOutRight { /* ... */ }
`;
// document.head.appendChild(style); // CSS 파일로 옮기는 것을 권장하므로 주석 처리

// 불필요한 DOMContentLoaded 리스너들 (맨 아래 있던 것들)은 삭제되었습니다.
