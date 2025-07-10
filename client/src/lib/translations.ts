export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    floorPlan: "Floor Plan",
    bookings: "Bookings",
    analytics: "Analytics",
    alerts: "Alerts",
    settings: "Settings",
    devices: "Devices",
    users: "Users",
    rooms: "Rooms",
    iaq: "IAQ Monitoring",
    
    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    add: "Add",
    update: "Update",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    close: "Close",
    open: "Open",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    
    // Dashboard
    welcome: "Welcome back",
    overview: "Overview",
    quickStats: "Quick Stats",
    recentActivity: "Recent Activity",
    notifications: "Notifications",
    
    // Settings
    profile: "Profile Settings",
    appearance: "Appearance & Language",
    security: "Security & Privacy",
    system: "System Information",
    help: "Help & Support",
    name: "Full Name",
    email: "Email Address",
    badgeId: "Badge ID",
    department: "Department",
    darkMode: "Dark Mode",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    
    // Status
    active: "Active",
    inactive: "Inactive",
    available: "Available",
    occupied: "Occupied",
    booked: "Booked",
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    
    // Time
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    thisMonth: "This Month",
    
    // Messages
    successSave: "Settings saved successfully!",
    errorSave: "Failed to save settings. Please try again.",
    confirmDelete: "Are you sure you want to delete this item?",
    noData: "No data available",
    loadingData: "Loading data...",
  },
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    floorPlan: "مخطط الطابق",
    bookings: "الحجوزات",
    analytics: "التحليلات",
    alerts: "التنبيهات",
    settings: "الإعدادات",
    devices: "الأجهزة",
    users: "المستخدمون",
    rooms: "الغرف",
    iaq: "مراقبة جودة الهواء",
    
    // Common
    loading: "جاري التحميل...",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    add: "إضافة",
    update: "تحديث",
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",
    close: "إغلاق",
    open: "فتح",
    yes: "نعم",
    no: "لا",
    confirm: "تأكيد",
    
    // Dashboard
    welcome: "مرحباً بعودتك",
    overview: "نظرة عامة",
    quickStats: "إحصائيات سريعة",
    recentActivity: "النشاط الأخير",
    notifications: "الإشعارات",
    
    // Settings
    profile: "إعدادات الملف الشخصي",
    appearance: "المظهر واللغة",
    security: "الأمان والخصوصية",
    system: "معلومات النظام",
    help: "المساعدة والدعم",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    badgeId: "رقم الشارة",
    department: "القسم",
    darkMode: "الوضع المظلم",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    
    // Status
    active: "نشط",
    inactive: "غير نشط",
    available: "متاح",
    occupied: "مشغول",
    booked: "محجوز",
    pending: "في الانتظار",
    confirmed: "مؤكد",
    cancelled: "ملغي",
    
    // Time
    today: "اليوم",
    yesterday: "أمس",
    tomorrow: "غداً",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    
    // Messages
    successSave: "تم حفظ الإعدادات بنجاح!",
    errorSave: "فشل في حفظ الإعدادات. يرجى المحاولة مرة أخرى.",
    confirmDelete: "هل أنت متأكد من حذف هذا العنصر؟",
    noData: "لا توجد بيانات متاحة",
    loadingData: "جاري تحميل البيانات...",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;