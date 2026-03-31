// ── Blood Groups ──────────────────────────────────────────────────────────────
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// ── Blood Inventory ────────────────────────────────────────────────────────────
export const BLOOD_INVENTORY = [
    { group: 'A+', units: 42, capacity: 60, expiryDate: '2026-03-05', collectedDate: '2026-02-13' },
    { group: 'A-', units: 12, capacity: 60, expiryDate: '2026-02-27', collectedDate: '2026-02-06' },
    { group: 'B+', units: 38, capacity: 60, expiryDate: '2026-03-10', collectedDate: '2026-02-17' },
    { group: 'B-', units: 8, capacity: 60, expiryDate: '2026-02-26', collectedDate: '2026-02-05' },
    { group: 'O+', units: 55, capacity: 60, expiryDate: '2026-03-18', collectedDate: '2026-02-25' },
    { group: 'O-', units: 5, capacity: 60, expiryDate: '2026-02-25', collectedDate: '2026-02-04' },
    { group: 'AB+', units: 22, capacity: 60, expiryDate: '2026-03-12', collectedDate: '2026-02-19' },
    { group: 'AB-', units: 3, capacity: 60, expiryDate: '2026-02-24', collectedDate: '2026-02-03' },
];

// Helper: days until expiry (negative = already expired)
export function daysUntilExpiry(expiryDate) {
    const today = new Date('2026-02-24');
    const exp = new Date(expiryDate);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

// Helper: donor eligibility (56+ days since last donation - WHO standard)
export function donorEligible(lastDonation) {
    const today = new Date('2026-02-24');
    const last = new Date(lastDonation);
    return Math.ceil((today - last) / (1000 * 60 * 60 * 24)) >= 56;
}

// Helper: days since last donation
export function daysSinceDonation(lastDonation) {
    const today = new Date('2026-02-24');
    const last = new Date(lastDonation);
    return Math.ceil((today - last) / (1000 * 60 * 60 * 24));
}

// ── Blood Compatibility Matrix ─────────────────────────────────────────────────
export const COMPATIBILITY = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    'AB-': ['A-', 'B-', 'O-', 'AB-'],
};

// ── Donors (donorType: 'Voluntary' | 'Replacement' | 'Paid') ──────────────────
// Pakistan: 82% replacement/paid, only 18% voluntary (WHO data)
export let DONORS = [
    { id: 1, name: 'Ahmed Khan', bloodGroup: 'A+', phone: '0312-4567890', lastDonation: '2026-01-15', status: 'Active', city: 'Karachi', gender: 'Male', age: 28, medHistory: 'None', donorType: 'Voluntary', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 5 },
    { id: 2, name: 'Fatima Noor', bloodGroup: 'O+', phone: '0321-8976543', lastDonation: '2025-12-20', status: 'Active', city: 'Lahore', gender: 'Female', age: 34, medHistory: 'None', donorType: 'Replacement', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 12 },
    { id: 3, name: 'Hassan Ali', bloodGroup: 'B+', phone: '0333-1234567', lastDonation: '2025-11-05', status: 'Inactive', city: 'Islamabad', gender: 'Male', age: 45, medHistory: 'Mild Hypertension', donorType: 'Replacement', tti: { hbv: false, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 8 },
    { id: 4, name: 'Ayesha Malik', bloodGroup: 'AB+', phone: '0345-6789012', lastDonation: '2026-02-01', status: 'Active', city: 'Karachi', gender: 'Female', age: 26, medHistory: 'None', donorType: 'Voluntary', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 3 },
    { id: 5, name: 'Omar Farooq', bloodGroup: 'O-', phone: '0300-9876543', lastDonation: '2025-10-18', status: 'Inactive', city: 'Peshawar', gender: 'Male', age: 52, medHistory: 'Diabetes (controlled)', donorType: 'Replacement', tti: { hbv: true, hcv: false, hiv: true, syphilis: true, malaria: false }, donationsCount: 15 },
    { id: 6, name: 'Sana Sheikh', bloodGroup: 'A-', phone: '0311-2345678', lastDonation: '2026-01-28', status: 'Active', city: 'Multan', gender: 'Female', age: 31, medHistory: 'None', donorType: 'Voluntary', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 2 },
    { id: 7, name: 'Bilal Hussain', bloodGroup: 'B-', phone: '0322-3456789', lastDonation: '2026-02-10', status: 'Active', city: 'Karachi', gender: 'Male', age: 24, medHistory: 'None', donorType: 'Paid', tti: { hbv: true, hcv: true, hiv: true, syphilis: false, malaria: true }, donationsCount: 1 },
    { id: 8, name: 'Zainab Qureshi', bloodGroup: 'AB-', phone: '0344-5678901', lastDonation: '2025-09-22', status: 'Inactive', city: 'Faisalabad', gender: 'Female', age: 38, medHistory: 'Anemia (past)', donorType: 'Replacement', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 6 },
    { id: 9, name: 'Usman Raza', bloodGroup: 'O+', phone: '0301-6789012', lastDonation: '2026-02-18', status: 'Active', city: 'Lahore', gender: 'Male', age: 22, medHistory: 'None', donorType: 'Voluntary', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 1 },
    { id: 10, name: 'Maryam Iqbal', bloodGroup: 'A+', phone: '0335-7890123', lastDonation: '2026-01-05', status: 'Active', city: 'Hyderabad', gender: 'Female', age: 29, medHistory: 'None', donorType: 'Replacement', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 4 },
    { id: 11, name: 'Tariq Mehmood', bloodGroup: 'B+', phone: '0346-8901234', lastDonation: '2025-08-14', status: 'Inactive', city: 'Quetta', gender: 'Male', age: 47, medHistory: 'Hepatitis B (recovered)', donorType: 'Paid', tti: { hbv: false, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 0 },
    { id: 12, name: 'Nadia Akram', bloodGroup: 'O-', phone: '0302-9012345', lastDonation: '2026-02-20', status: 'Active', city: 'Karachi', gender: 'Female', age: 33, medHistory: 'None', donorType: 'Voluntary', tti: { hbv: true, hcv: true, hiv: true, syphilis: true, malaria: true }, donationsCount: 3 },
];

let nextId = 13;
export function addDonor(donor) {
    const newDonor = {
        ...donor, id: nextId++, status: 'Active', lastDonation: 'Never',
        donorType: donor.donorType || 'Voluntary',
        tti: { hbv: false, hcv: false, hiv: false, syphilis: false, malaria: false },
        donationsCount: 0,
    };
    DONORS = [...DONORS, newDonor];
    return newDonor;
}

// ── Thalassemia Patients (Pakistan: 100,000+ patients, 9,000 new/year) ─────────
export let THALASSEMIA_PATIENTS = [
    { id: 'TH-001', name: 'Hamza Baig', age: 8, bloodGroup: 'B+', city: 'Karachi', guardian: 'Khalid Baig', phone: '0311-1111111', frequency: 'Every 3 weeks', lastTransfusion: '2026-02-05', nextDue: '2026-02-26', totalUnitsLifetime: 48, status: 'Active' },
    { id: 'TH-002', name: 'Sara Rehman', age: 12, bloodGroup: 'A+', city: 'Lahore', guardian: 'Tahir Rehman', phone: '0322-2222222', frequency: 'Monthly', lastTransfusion: '2026-01-28', nextDue: '2026-02-28', totalUnitsLifetime: 72, status: 'Active' },
    { id: 'TH-003', name: 'Ali Nawaz', age: 5, bloodGroup: 'O+', city: 'Multan', guardian: 'Nawaz Ali', phone: '0333-3333333', frequency: 'Every 3 weeks', lastTransfusion: '2026-02-10', nextDue: '2026-03-03', totalUnitsLifetime: 20, status: 'Active' },
    { id: 'TH-004', name: 'Zora Qasim', age: 15, bloodGroup: 'B+', city: 'Islamabad', guardian: 'Qasim Shah', phone: '0344-4444444', frequency: 'Monthly', lastTransfusion: '2026-01-15', nextDue: '2026-02-15', totalUnitsLifetime: 120, status: 'Overdue' },
    { id: 'TH-005', name: 'Daniyal Mirza', age: 9, bloodGroup: 'A-', city: 'Karachi', guardian: 'Asim Mirza', phone: '0355-5555555', frequency: 'Every 2 weeks', lastTransfusion: '2026-02-11', nextDue: '2026-02-25', totalUnitsLifetime: 54, status: 'Overdue' },
    { id: 'TH-006', name: 'Hina Farhat', age: 18, bloodGroup: 'AB+', city: 'Faisalabad', guardian: 'Farhat Bibi', phone: '0366-6666666', frequency: 'Monthly', lastTransfusion: '2026-02-01', nextDue: '2026-03-01', totalUnitsLifetime: 144, status: 'Active' },
];

let nextThalId = 7;
export function addThalPatient(p) {
    const pt = { ...p, id: `TH-00${nextThalId++}`, status: 'Active', totalUnitsLifetime: 0 };
    THALASSEMIA_PATIENTS = [...THALASSEMIA_PATIENTS, pt];
    return pt;
}

// ── Blood Requests ──────────────────────────────────────────────────────────────
export let BLOOD_REQUESTS = [
    { id: 'REQ-001', hospital: 'Jinnah Hospital', bloodGroup: 'O-', units: 3, urgency: 'Critical', status: 'Pending', date: '2026-02-24', patient: 'Emergency Ward' },
    { id: 'REQ-002', hospital: 'Aga Khan University Hospital', bloodGroup: 'A+', units: 2, urgency: 'Normal', status: 'Approved', date: '2026-02-23', patient: 'Surgery Dept.' },
    { id: 'REQ-003', hospital: 'Civil Hospital Karachi', bloodGroup: 'B+', units: 5, urgency: 'Critical', status: 'Pending', date: '2026-02-24', patient: 'Trauma Unit' },
    { id: 'REQ-004', hospital: 'Liaquat National Hospital', bloodGroup: 'AB+', units: 1, urgency: 'Normal', status: 'Fulfilled', date: '2026-02-22', patient: 'ICU' },
    { id: 'REQ-005', hospital: 'Indus Hospital', bloodGroup: 'O+', units: 4, urgency: 'Critical', status: 'Pending', date: '2026-02-24', patient: 'Maternity Ward' },
    { id: 'REQ-006', hospital: 'Dow University Hospital', bloodGroup: 'A-', units: 2, urgency: 'Normal', status: 'Approved', date: '2026-02-21', patient: 'Oncology Dept.' },
    { id: 'REQ-007', hospital: 'Ziauddin Hospital', bloodGroup: 'B-', units: 1, urgency: 'Normal', status: 'Fulfilled', date: '2026-02-20', patient: 'General Surgery' },
    { id: 'REQ-008', hospital: 'South City Hospital', bloodGroup: 'O+', units: 3, urgency: 'Critical', status: 'Pending', date: '2026-02-24', patient: 'Emergency Ward' },
];

// ── Donation Camps ──────────────────────────────────────────────────────────────
export const DONATION_CAMPS = [
    { id: 1, name: 'NED University Blood Drive', location: 'NED University, Karachi', date: '2026-03-05', time: '9:00 AM – 4:00 PM', volunteers: 45, target: 100, status: 'Upcoming', organizer: 'Red Crescent Society' },
    { id: 2, name: 'Civic Center Mega Camp', location: 'Civic Centre, Gulshan-e-Iqbal', date: '2026-03-12', time: '10:00 AM – 6:00 PM', volunteers: 78, target: 150, status: 'Upcoming', organizer: 'Indus Hospital Foundation' },
    { id: 3, name: 'Corporate Blood Donation', location: 'HBL Tower, I.I. Chundrigar Road', date: '2026-02-28', time: '11:00 AM – 3:00 PM', volunteers: 32, target: 50, status: 'Upcoming', organizer: 'HBL CSR Team' },
    { id: 4, name: 'Ramzan Blood Camp', location: 'Masjid-e-Tooba, Defence', date: '2026-03-20', time: '8:00 AM – 2:00 PM', volunteers: 120, target: 200, status: 'Upcoming', organizer: 'Fatimid Foundation' },
    { id: 5, name: 'IBA Winter Camp', location: 'IBA Main Campus, Garden', date: '2026-02-15', time: '9:00 AM – 5:00 PM', volunteers: 95, target: 100, status: 'Completed', organizer: 'IBA Student Council' },
    { id: 6, name: 'Govt. College Drive', location: 'DJ Science College, Karachi', date: '2026-02-10', time: '10:00 AM – 4:00 PM', volunteers: 60, target: 80, status: 'Completed', organizer: 'Edhi Foundation' },
];

// ── Monthly Donations ──────────────────────────────────────────────────────────
export const MONTHLY_DONATIONS = [
    { month: 'Sep', donations: 120 },
    { month: 'Oct', donations: 145 },
    { month: 'Nov', donations: 98 },
    { month: 'Dec', donations: 167 },
    { month: 'Jan', donations: 189 },
    { month: 'Feb', donations: 156 },
];

// ── Activity Feed ──────────────────────────────────────────────────────────────
export const RECENT_ACTIVITY = [
    { text: 'New blood request from Jinnah Hospital (O-)', time: '5 min ago', type: 'critical' },
    { text: 'Donor Ahmed Khan donated 1 unit of A+ (Voluntary)', time: '1 hour ago', type: 'success' },
    { text: 'Camp registration: NED University Drive', time: '2 hours ago', type: 'info' },
    { text: 'Blood request REQ-004 fulfilled (AB+)', time: '3 hours ago', type: 'success' },
    { text: 'Low stock alert: O- (5 units remaining)', time: '5 hours ago', type: 'warning' },
    { text: 'Thalassemia patient Zora Qasim transfusion overdue', time: '6 hours ago', type: 'critical' },
    { text: 'AB- expiring today - 3 units at risk', time: '8 hours ago', type: 'warning' },
];

// ── Pakistani Cities ───────────────────────────────────────────────────────────
export const PK_CITIES = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar',
    'Quetta', 'Multan', 'Faisalabad', 'Hyderabad', 'Sialkot',
    'Gujranwala', 'Bahawalpur', 'Sukkur', 'Larkana', 'Turbat',
    'Nawabshah', 'Mirpur Khas', 'Abbottabad', 'Dera Ghazi Khan',
];

// ── Seasonal / Ramadan warning ─────────────────────────────────────────────────
// Returns true if we're within 15 days of or inside Ramadan 2026 (Mar 1 – Mar 30)
export function isRamadanPeriod() {
    const today = new Date('2026-02-24');
    const ramStart = new Date('2026-03-01');
    const ramEnd = new Date('2026-03-30');
    return today >= new Date(ramStart.getTime() - 15 * 86400000) && today <= ramEnd;
}

// ── Donation type stats helper ─────────────────────────────────────────────────
export function donationTypeStats(donors) {
    const total = donors.length;
    const voluntary = donors.filter(d => d.donorType === 'Voluntary').length;
    const replacement = donors.filter(d => d.donorType === 'Replacement').length;
    const paid = donors.filter(d => d.donorType === 'Paid').length;
    return { total, voluntary, replacement, paid };
}
