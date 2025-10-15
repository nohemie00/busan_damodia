// Reservation page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initReservationPage();
});

let reservationData = {
    date: null,
    time: null,
    adults: 1,
    children: 0,
    name: '',
    phone: '',
    email: '',
    participants: [],
    requests: '',
    termsAgreed: false,
    marketingAgreed: false
};

function initReservationPage() {
    initCalendar();
    initTimeSlots();
    initPeopleSelector();
    initFormValidation();
    initStepNavigation();
    initPaymentMethods();
}

// Calendar functionality
function initCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    let selectedDate = null;
    
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthElement.textContent = `${year}년 ${month + 1}월`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day disabled';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const cellDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Disable past dates
            if (cellDate < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', function() {
                    selectDate(cellDate);
                });
            }
            
            // Highlight selected date
            if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                dayElement.classList.add('selected');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function selectDate(date) {
        selectedDate = date;
        reservationData.date = date;
        
        // Update calendar display
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        event.target.classList.add('selected');
        
        // Update available times
        updateTimeSlots(date);
        
        // Enable next button if time is also selected
        checkStep1Complete();
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
}

// Time slots functionality
function initTimeSlots() {
    // This will be populated when a date is selected
}

function updateTimeSlots(selectedDate) {
    const timeSlotsContainer = document.getElementById('time-slots');
    const dayOfWeek = selectedDate.getDay();
    
    // Define available times based on day of week
    let availableTimes = [];
    
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
        availableTimes = [
            '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
        ];
    } else { // Weekday
        availableTimes = [
            '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
        ];
    }
    
    timeSlotsContainer.innerHTML = '';
    
    availableTimes.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        
        timeSlot.addEventListener('click', function() {
            selectTime(time);
        });
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function selectTime(time) {
    reservationData.time = time;
    
    // Update time slots display
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Enable next button
    checkStep1Complete();
}

function checkStep1Complete() {
    const nextBtn = document.getElementById('step1-next');
    if (reservationData.date && reservationData.time) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// People selector functionality
function initPeopleSelector() {
    const adultPlus = document.getElementById('adult-plus');
    const adultMinus = document.getElementById('adult-minus');
    const adultCount = document.getElementById('adult-count');
    const childPlus = document.getElementById('child-plus');
    const childMinus = document.getElementById('child-minus');
    const childCount = document.getElementById('child-count');
    
    adultPlus.addEventListener('click', function() {
        if (reservationData.adults < 10) {
            reservationData.adults++;
            updatePeopleCounts();
        }
    });
    
    adultMinus.addEventListener('click', function() {
        if (reservationData.adults > 1) {
            reservationData.adults--;
            updatePeopleCounts();
        }
    });
    
    childPlus.addEventListener('click', function() {
        if (reservationData.children < 10) {
            reservationData.children++;
            updatePeopleCounts();
        }
    });
    
    childMinus.addEventListener('click', function() {
        if (reservationData.children > 0) {
            reservationData.children--;
            updatePeopleCounts();
        }
    });
}

function updatePeopleCounts() {
    document.getElementById('adult-count').textContent = reservationData.adults;
    document.getElementById('child-count').textContent = reservationData.children;
    
    // Update summary
    const adultTotal = reservationData.adults * 15000;
    const childTotal = reservationData.children * 10000;
    const total = adultTotal + childTotal;
    
    document.getElementById('adult-total').textContent = adultTotal.toLocaleString() + '원';
    document.getElementById('child-total').textContent = childTotal.toLocaleString() + '원';
    document.getElementById('total-amount').textContent = total.toLocaleString() + '원';
    
    // Update participant list
    updateParticipantList();
}

function updateParticipantList() {
    const participantsList = document.getElementById('participants-list');
    const totalPeople = reservationData.adults + reservationData.children;
    
    participantsList.innerHTML = '';
    
    for (let i = 0; i < totalPeople; i++) {
        const participantItem = document.createElement('div');
        participantItem.className = 'participant-item';
        
        const ageGroup = i < reservationData.adults ? 'adult' : 'child';
        const label = ageGroup === 'adult' ? '성인' : '어린이';
        
        participantItem.innerHTML = `
            <input type="text" placeholder="${label} ${i + 1} 이름" name="participant-${i}" required>
            <button type="button" class="remove-participant" onclick="removeParticipant(${i})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        participantsList.appendChild(participantItem);
    }
}

function removeParticipant(index) {
    if (index < reservationData.adults) {
        reservationData.adults--;
    } else {
        reservationData.children--;
    }
    updatePeopleCounts();
}

// Form validation
function initFormValidation() {
    const nameInput = document.getElementById('reservation-name');
    const phoneInput = document.getElementById('reservation-phone');
    const emailInput = document.getElementById('reservation-email');
    
    nameInput.addEventListener('blur', function() {
        validateName(this.value);
    });
    
    phoneInput.addEventListener('blur', function() {
        validatePhone(this.value);
    });
    
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });
    
    // Terms agreement
    document.getElementById('terms-agreement').addEventListener('change', function() {
        reservationData.termsAgreed = this.checked;
    });
    
    document.getElementById('marketing-agreement').addEventListener('change', function() {
        reservationData.marketingAgreed = this.checked;
    });
}

function validateName(name) {
    const errorElement = document.getElementById('name-error');
    if (name.length < 2) {
        errorElement.textContent = '이름을 정확히 입력해주세요 (2자 이상)';
        return false;
    } else {
        errorElement.textContent = '';
        reservationData.name = name;
        return true;
    }
}

function validatePhone(phone) {
    const errorElement = document.getElementById('phone-error');
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        errorElement.textContent = '올바른 연락처를 입력해주세요';
        return false;
    } else {
        errorElement.textContent = '';
        reservationData.phone = phone;
        return true;
    }
}

function validateEmail(email) {
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = '올바른 이메일을 입력해주세요';
        return false;
    } else {
        errorElement.textContent = '';
        reservationData.email = email;
        return true;
    }
}

// Step navigation
function initStepNavigation() {
    // Step 1 to Step 2
    document.getElementById('step1-next').addEventListener('click', function() {
        if (reservationData.date && reservationData.time) {
            goToStep(2);
        }
    });
    
    // Step 2 navigation
    document.getElementById('step2-back').addEventListener('click', function() {
        goToStep(1);
    });
    
    document.getElementById('step2-next').addEventListener('click', function() {
        if (reservationData.adults > 0 || reservationData.children > 0) {
            goToStep(3);
        }
    });
    
    // Step 3 navigation
    document.getElementById('step3-back').addEventListener('click', function() {
        goToStep(2);
    });
    
    document.getElementById('step3-next').addEventListener('click', function() {
        if (validateStep3()) {
            goToStep(4);
            updateConfirmationSummary();
        }
    });
    
    // Step 4 navigation
    document.getElementById('step4-back').addEventListener('click', function() {
        goToStep(3);
    });
    
    document.getElementById('complete-reservation').addEventListener('click', function() {
        completeReservation();
    });
}

function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.reservation-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update progress indicator
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    for (let i = 1; i <= stepNumber; i++) {
        const stepElement = document.querySelector(`[data-step="${i}"]`);
        if (i < stepNumber) {
            stepElement.classList.add('completed');
        } else if (i === stepNumber) {
            stepElement.classList.add('active');
        }
    }
}

function validateStep3() {
    let isValid = true;
    
    // Validate required fields
    if (!validateName(reservationData.name)) isValid = false;
    if (!validatePhone(reservationData.phone)) isValid = false;
    if (!validateEmail(reservationData.email)) isValid = false;
    
    // Validate terms agreement
    if (!reservationData.termsAgreed) {
        alert('이용약관 및 개인정보처리방침에 동의해주세요.');
        isValid = false;
    }
    
    // Validate participants
    const totalPeople = reservationData.adults + reservationData.children;
    const participantInputs = document.querySelectorAll('input[name^="participant-"]');
    if (participantInputs.length !== totalPeople) {
        alert('모든 체험자의 이름을 입력해주세요.');
        isValid = false;
    }
    
    return isValid;
}

function updateConfirmationSummary() {
    const dateStr = reservationData.date.toLocaleDateString('ko-KR');
    const timeStr = reservationData.time;
    const peopleStr = `성인 ${reservationData.adults}명, 어린이 ${reservationData.children}명`;
    
    document.getElementById('confirm-date').textContent = dateStr;
    document.getElementById('confirm-time').textContent = timeStr;
    document.getElementById('confirm-people').textContent = peopleStr;
    document.getElementById('confirm-name').textContent = reservationData.name;
    document.getElementById('confirm-phone').textContent = reservationData.phone;
    document.getElementById('confirm-email').textContent = reservationData.email;
    
    // Update payment summary
    const adultTotal = reservationData.adults * 15000;
    const childTotal = reservationData.children * 10000;
    const total = adultTotal + childTotal;
    
    document.getElementById('payment-adult').textContent = adultTotal.toLocaleString() + '원';
    document.getElementById('payment-child').textContent = childTotal.toLocaleString() + '원';
    document.getElementById('payment-total').textContent = total.toLocaleString() + '원';
}

// Payment methods
function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            reservationData.paymentMethod = this.value;
        });
    });
    
    // Set default payment method
    reservationData.paymentMethod = 'card';
}

// Complete reservation
function completeReservation() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.add('show');
    
    // Simulate API call
    setTimeout(() => {
        loadingOverlay.classList.remove('show');
        showSuccessModal();
    }, 3000);
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    const reservationNumber = 'VR' + Date.now().toString().slice(-6);
    
    // Update modal content
    document.getElementById('reservation-number').textContent = reservationNumber;
    document.getElementById('success-date-time').textContent = 
        `${reservationData.date.toLocaleDateString('ko-KR')} ${reservationData.time}`;
    document.getElementById('success-people').textContent = 
        `성인 ${reservationData.adults}명, 어린이 ${reservationData.children}명`;
    
    const total = (reservationData.adults * 15000) + (reservationData.children * 10000);
    document.getElementById('success-total').textContent = total.toLocaleString() + '원';
    
    modal.classList.add('show');
    
    // Log reservation data
    console.log('Reservation completed:', {
        ...reservationData,
        reservationNumber,
        timestamp: new Date().toISOString()
    });
}

function printReservation() {
    // In a real application, you would generate a printable reservation confirmation
    window.print();
}

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

function formatTime(time) {
    return time;
}

// Add participant functionality
document.getElementById('add-participant').addEventListener('click', function() {
    if (reservationData.adults + reservationData.children < 20) {
        // Add one more participant (default to adult)
        reservationData.adults++;
        updatePeopleCounts();
    } else {
        alert('최대 20명까지만 예약 가능합니다.');
    }
});

// Preview Modal Functions
function openPreviewModal() {
    if (!validateStep3()) {
        alert('모든 필수 정보를 입력해주세요.');
        return;
    }
    
    const modal = document.getElementById('preview-modal');
    if (modal) {
        // Update preview content
        document.getElementById('preview-date').textContent = reservationData.date.toLocaleDateString('ko-KR');
        document.getElementById('preview-time').textContent = reservationData.time;
        document.getElementById('preview-people').textContent = `성인 ${reservationData.adults}명, 어린이 ${reservationData.children}명`;
        
        const total = (reservationData.adults * 15000) + (reservationData.children * 10000);
        document.getElementById('preview-total').textContent = total.toLocaleString() + '원';
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function confirmReservation() {
    closePreviewModal();
    completeReservation();
}

// Reservation Details Modal Functions
function viewReservationDetails() {
    const modal = document.getElementById('reservation-details-modal');
    if (modal) {
        // Close success modal first
        closeSuccessModal();
        
        // Update details content
        const reservationNumber = document.getElementById('reservation-number').textContent;
        const experienceDateTime = document.getElementById('success-date-time').textContent;
        const people = document.getElementById('success-people').textContent;
        const total = document.getElementById('success-total').textContent;
        
        document.getElementById('detail-reservation-number').textContent = reservationNumber;
        document.getElementById('detail-reservation-date').textContent = new Date().toLocaleString('ko-KR');
        document.getElementById('detail-experience-date').textContent = experienceDateTime;
        document.getElementById('detail-name').textContent = reservationData.name;
        document.getElementById('detail-phone').textContent = reservationData.phone;
        document.getElementById('detail-email').textContent = reservationData.email;
        
        // Update participants
        updateParticipantsDetail();
        
        // Update payment details
        document.getElementById('detail-adults-count').textContent = reservationData.adults;
        document.getElementById('detail-children-count').textContent = reservationData.children;
        document.getElementById('detail-adults-amount').textContent = (reservationData.adults * 15000).toLocaleString() + '원';
        document.getElementById('detail-children-amount').textContent = (reservationData.children * 10000).toLocaleString() + '원';
        document.getElementById('detail-total-amount').textContent = total;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeReservationDetailsModal() {
    const modal = document.getElementById('reservation-details-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function updateParticipantsDetail() {
    const container = document.getElementById('participants-detail');
    container.innerHTML = '';
    
    const totalPeople = reservationData.adults + reservationData.children;
    for (let i = 0; i < totalPeople; i++) {
        const ageGroup = i < reservationData.adults ? '성인' : '어린이';
        const participantItem = document.createElement('div');
        participantItem.className = 'participant-detail-item';
        participantItem.innerHTML = `
            <span>${ageGroup} ${i + 1}</span>
            <span>체험자 정보</span>
        `;
        container.appendChild(participantItem);
    }
}

function modifyReservation() {
    closeReservationDetailsModal();
    // Go back to step 1 to modify reservation
    goToStep(1);
}

function cancelReservation() {
    if (confirm('정말로 예약을 취소하시겠습니까?')) {
        alert('예약이 취소되었습니다.');
        closeReservationDetailsModal();
        // Redirect to main page or show cancellation confirmation
        window.location.href = 'index.html';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}
