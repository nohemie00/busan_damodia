// Multi-language support for the Safari VR Experience website

class LanguageManager {
    constructor() {
        this.currentLanguage = 'ko';
        this.translations = {
            ko: {
                // Navigation
                'nav.home': '홈',
                'nav.about': '체험 소개',
                'nav.reservation': '예약하기',
                'nav.gallery': '갤러리',
                'nav.news': '뉴스룸',
                'nav.contact': '이용안내',
                
                // Hero Section
                'hero.title': '실감형 사파리 체험',
                'hero.subtitle': '가상현실로 만나는 아프리카 사파리의 신비로운 동물들의 세계',
                'hero.reserve': '예약하기',
                'hero.watch': '체험 소개 영상',
                
                // About Section
                'about.title': '체험 소개',
                'about.vr.title': 'VR 체험',
                'about.vr.desc': '최신 VR 기술로 아프리카 사파리의 생생한 현장감을 경험하세요',
                'about.group.title': '그룹 체험',
                'about.group.desc': '가족, 친구들과 함께하는 특별한 체험으로 소중한 추억을 만들어보세요',
                'about.time.title': '30분 체험',
                'about.time.desc': '집중도 높은 30분 체험으로 사파리의 모든 것을 빠짐없이 경험할 수 있습니다',
                
                // Reservation Section
                'reservation.title': '예약하기',
                'reservation.hours.title': '운영시간',
                'reservation.hours.weekday': '평일: 10:00 - 18:00',
                'reservation.hours.weekend': '주말: 09:00 - 19:00',
                'reservation.capacity.title': '정원',
                'reservation.capacity.desc': '회차당 최대 20명',
                'reservation.capacity.age': '(10세 이상 권장)',
                'reservation.price.title': '이용요금',
                'reservation.price.adult': '성인: 15,000원',
                'reservation.price.child': '어린이: 10,000원',
                'reservation.book': '지금 예약하기',
                
                // Gallery Section
                'gallery.title': '갤러리',
                
                // News Section
                'news.title': '뉴스룸',
                'news.item1.title': '실감형 사파리 체험 오픈',
                'news.item1.desc': '부산어린이대공원에서 새로운 VR 체험 시설이 오픈했습니다.',
                'news.item2.title': '체험 이용객 1만명 돌파',
                'news.item2.desc': '개장 3개월 만에 누적 이용객이 1만명을 돌파했습니다.',
                
                // Contact Section
                'contact.title': '이용안내',
                'contact.info.title': '연락처 정보',
                'contact.phone': '051-123-4567',
                'contact.email': 'safari@busanpark.go.kr',
                'contact.address': '부산광역시 사상구 주례동 123',
                
                // Footer
                'footer.title': '부산어린이대공원',
                'footer.subtitle': '실감형 사파리 체험',
                'footer.privacy': '개인정보처리방침',
                'footer.terms': '이용약관',
                'footer.sitemap': '사이트맵',
                'footer.copyright': '© 2024 부산어린이대공원. All rights reserved.',
                
                // Reservation Modal
                'modal.reservation.title': '예약하기',
                'modal.reservation.date': '날짜 선택',
                'modal.reservation.time': '시간 선택',
                'modal.reservation.adults': '성인 인원',
                'modal.reservation.children': '어린이 인원',
                'modal.reservation.name': '예약자명',
                'modal.reservation.phone': '연락처',
                'modal.reservation.email': '이메일',
                'modal.reservation.submit': '예약 완료',
                
                // Common
                'common.close': '닫기',
                'common.next': '다음',
                'common.previous': '이전',
                'common.confirm': '확인',
                'common.cancel': '취소',
                'common.save': '저장',
                'common.edit': '수정',
                'common.delete': '삭제',
                'common.loading': '로딩 중...'
            },
            
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'Experience',
                'nav.reservation': 'Reservation',
                'nav.gallery': 'Gallery',
                'nav.news': 'Newsroom',
                'nav.contact': 'Contact',
                
                // Hero Section
                'hero.title': 'Immersive Safari Experience',
                'hero.subtitle': 'Experience the mysterious world of African safari animals through virtual reality',
                'hero.reserve': 'Make Reservation',
                'hero.watch': 'Watch Experience Video',
                
                // About Section
                'about.title': 'Experience Introduction',
                'about.vr.title': 'VR Experience',
                'about.vr.desc': 'Experience the vivid realism of African safari with the latest VR technology',
                'about.group.title': 'Group Experience',
                'about.group.desc': 'Create precious memories with family and friends through this special experience',
                'about.time.title': '30-Minute Experience',
                'about.time.desc': 'Experience everything about safari without missing anything in a focused 30-minute session',
                
                // Reservation Section
                'reservation.title': 'Make Reservation',
                'reservation.hours.title': 'Operating Hours',
                'reservation.hours.weekday': 'Weekdays: 10:00 - 18:00',
                'reservation.hours.weekend': 'Weekends: 09:00 - 19:00',
                'reservation.capacity.title': 'Capacity',
                'reservation.capacity.desc': 'Maximum 20 people per session',
                'reservation.capacity.age': '(Recommended for ages 10+)',
                'reservation.price.title': 'Admission Fee',
                'reservation.price.adult': 'Adult: ₩15,000',
                'reservation.price.child': 'Child: ₩10,000',
                'reservation.book': 'Book Now',
                
                // Gallery Section
                'gallery.title': 'Gallery',
                
                // News Section
                'news.title': 'Newsroom',
                'news.item1.title': 'Immersive Safari Experience Opens',
                'news.item1.desc': 'A new VR experience facility has opened at Busan Children\'s Grand Park.',
                'news.item2.title': '10,000 Visitors Milestone',
                'news.item2.desc': 'The cumulative number of visitors exceeded 10,000 in just 3 months since opening.',
                
                // Contact Section
                'contact.title': 'Contact Information',
                'contact.info.title': 'Contact Information',
                'contact.phone': '051-123-4567',
                'contact.email': 'safari@busanpark.go.kr',
                'contact.address': '123 Jurye-dong, Sasang-gu, Busan',
                
                // Footer
                'footer.title': 'Busan Children\'s Grand Park',
                'footer.subtitle': 'Immersive Safari Experience',
                'footer.privacy': 'Privacy Policy',
                'footer.terms': 'Terms of Service',
                'footer.sitemap': 'Sitemap',
                'footer.copyright': '© 2024 Busan Children\'s Grand Park. All rights reserved.',
                
                // Reservation Modal
                'modal.reservation.title': 'Make Reservation',
                'modal.reservation.date': 'Select Date',
                'modal.reservation.time': 'Select Time',
                'modal.reservation.adults': 'Number of Adults',
                'modal.reservation.children': 'Number of Children',
                'modal.reservation.name': 'Reservation Name',
                'modal.reservation.phone': 'Phone Number',
                'modal.reservation.email': 'Email',
                'modal.reservation.submit': 'Complete Reservation',
                
                // Common
                'common.close': 'Close',
                'common.next': 'Next',
                'common.previous': 'Previous',
                'common.confirm': 'Confirm',
                'common.cancel': 'Cancel',
                'common.save': 'Save',
                'common.edit': 'Edit',
                'common.delete': 'Delete',
                'common.loading': 'Loading...'
            }
        };
        
        this.init();
    }
    
    init() {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferred-language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Initialize language switcher
        this.initLanguageSwitcher();
    }
    
    initLanguageSwitcher() {
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                this.toggleLanguage();
            });
            
            // Update button text
            this.updateLanguageButton();
        }
    }
    
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ko' ? 'en' : 'ko';
        this.applyLanguage(this.currentLanguage);
        this.updateLanguageButton();
        
        // Save preference
        localStorage.setItem('preferred-language', this.currentLanguage);
    }
    
    applyLanguage(language) {
        this.currentLanguage = language;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' && element.type === 'email') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(key);
            if (translation) {
                element.title = translation;
            }
        });
        
        // Update alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.getTranslation(key);
            if (translation) {
                element.alt = translation;
            }
        });
        
        // Update document title
        const titleKey = this.currentLanguage === 'ko' ? 'hero.title' : 'hero.title';
        const titleTranslation = this.getTranslation(titleKey);
        if (titleTranslation) {
            document.title = titleTranslation + ' - ' + (this.currentLanguage === 'ko' ? '부산어린이대공원' : 'Busan Children\'s Grand Park');
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
    
    updateLanguageButton() {
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.textContent = this.currentLanguage === 'ko' ? 'EN' : '한';
        }
    }
    
    // Method to add new translations dynamically
    addTranslations(language, translations) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        
        Object.assign(this.translations[language], translations);
    }
    
    // Method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Method to check if a translation exists
    hasTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] !== undefined;
    }
}

// Initialize language manager when DOM is loaded
let languageManager;

document.addEventListener('DOMContentLoaded', function() {
    languageManager = new LanguageManager();
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;
window.languageManager = languageManager;
