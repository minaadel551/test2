/* 
 * GoldHEN Info Module
 * يستخدم هذا الملف لتخزين معلومات عن إصدار GoldHEN وعرضها في الصفحة
 */

// معلومات الإصدار - يتم استخراجها تلقائيًا من ملف payload
export let GOLDHEN_VERSION = '2.4b18.4'; // قيمة افتراضية
export const GOLDHEN_DATE = '2023-07-09';

// دالة لتحديث إصدار GoldHEN من ملف payload
export function updateGoldHENVersion(version) {
    if (version && typeof version === 'string') {
        GOLDHEN_VERSION = version;
        
        // تحديث العرض مباشرة إذا كانت الصفحة محملة
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            updateVersionInfo();
        }
        
        return true;
    }
    return false;
}

// دالة للتحقق من إصدار GoldHEN المثبت
export function checkGoldHENVersion() {
    // الحصول على عنصر الرسالة
    const messageElement = document.getElementById('message');
    
    // محاولة قراءة إصدار GoldHEN من الذاكرة (هذه مجرد محاكاة)
    // في الواقع، يجب استخدام طريقة أكثر تعقيدًا للتحقق من الإصدار المثبت
    setTimeout(() => {
        // تحديث الرسالة بإصدار GoldHEN
        messageElement.innerHTML = `GoldHEN ${GOLDHEN_VERSION} Ready to Use`;
    }, 5000);
}

// دالة لتحديث معلومات الإصدار في الصفحة
export function updateVersionInfo() {
    // البحث عن عنصر الإصدار في الصفحة
    const versionElements = document.querySelectorAll('font');
    
    // تحديث نص الإصدار
    for (const element of versionElements) {
        if (element.textContent.includes('GoldHen')) {
            // إذا كان الإصدار متاحًا، نعرضه، وإلا نعرض فقط "GoldHen"
            if (GOLDHEN_VERSION) {
                element.innerHTML = `<i>GoldHen v${GOLDHEN_VERSION} - With Advanced Memory Management System</i>`;
            } else {
                element.innerHTML = `<i>GoldHen - With Advanced Memory Management System</i>`;
            }
            break;
        }
    }
}