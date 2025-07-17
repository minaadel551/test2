/* 
 * Memory Stabilizer Module
 * يستخدم هذا الملف لتحسين استقرار الذاكرة وتجنب تسريبات الذاكرة
 */

import { log } from './module/utils.mjs';

// مصفوفة لتخزين المراجع إلى الكائنات لمنع جامع القمامة من تحريرها
const memoryReferences = [];

// دالة لتنظيف الذاكرة قبل تنفيذ الـ exploit
export function prepareMemory() {
    // محاولة تحرير الذاكرة غير المستخدمة
    try {
        // تنظيف ذاكرة التخزين المؤقت للمتصفح
        if (window.caches && window.caches.keys) {
            window.caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    window.caches.delete(cacheName);
                });
            });
        }
        
        // إجبار جامع القمامة على العمل - تقليل حجم الذاكرة المستخدمة
        for (let i = 0; i < 5; i++) { // تقليل عدد المرات من 10 إلى 5
            const dummy = new Uint8Array(256 * 1024); // 256KB بدلاً من 512KB
            dummy.fill(0);
        }
        
        // محاولة تشغيل جامع القمامة يدويًا إذا كان متاحًا
        if (typeof window.gc === 'function') {
            window.gc();
        }
    } catch (e) {
        // تجاهل الأخطاء
    }
    
    return true;
}

// دالة لحجز كائن في الذاكرة ومنع جامع القمامة من تحريره
export function keepAlive(object) {
    memoryReferences.push(object);
    return object;
}

// دالة لتنظيف الذاكرة بعد تنفيذ الـ exploit
export function cleanupMemory() {
    // تفريغ مصفوفة المراجع بطريقة أكثر كفاءة
    while (memoryReferences.length > 0) {
        memoryReferences.pop();
    }
    
    // محاولة تحرير الذاكرة غير المستخدمة
    try {
        // إجبار جامع القمامة على العمل - تقليل حجم الذاكرة المستخدمة
        for (let i = 0; i < 4; i++) { // تقليل عدد المرات من 8 إلى 4
            const dummy = new Uint8Array(128 * 1024); // 128KB بدلاً من 256KB
            dummy.fill(0);
        }
        
        // محاولة تشغيل جامع القمامة يدويًا إذا كان متاحًا
        if (typeof window.gc === 'function') {
            for (let i = 0; i < 3; i++) { // تكرار استدعاء جامع القمامة
                window.gc();
            }
        }
    } catch (e) {
        // تجاهل الأخطاء
    }
    
    return true;
}

// دالة لمراقبة استخدام الذاكرة - تم تبسيطها لـ PS4 9.00
export function monitorMemoryUsage() {
    // تم تبسيط هذه الدالة لأن متصفح PS4 لا يدعم performance.memory
    // نقوم بتنفيذ عملية تنظيف خفيفة بدلاً من ذلك
    
    try {
        // إنشاء مصفوفة مؤقتة لإجبار جامع القمامة على العمل
        const dummy = new Uint8Array(64 * 1024); // 64KB بدلاً من 512KB
        dummy.fill(0);
        
        // محاولة تشغيل جامع القمامة يدويًا إذا كان متاحًا
        if (typeof window.gc === 'function') {
            window.gc();
        }
        
        // تنظيف ذاكرة التخزين المؤقت للمتصفح
        if (window.caches && window.caches.keys) {
            window.caches.keys().then(cacheNames => {
                if (cacheNames.length > 0) {
                    cacheNames[0] && window.caches.delete(cacheNames[0]);
                }
            });
        }
    } catch (e) {
        // تجاهل الأخطاء
    }
    
    return true;
}