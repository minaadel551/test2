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
        // إجبار جامع القمامة على العمل
        for (let i = 0; i < 15; i++) {
            const dummy = new Uint8Array(1024 * 1024); // 1MB
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
    // تفريغ مصفوفة المراجع
    while (memoryReferences.length > 0) {
        memoryReferences.pop();
    }
    
    // محاولة تحرير الذاكرة غير المستخدمة
    try {
        // إجبار جامع القمامة على العمل
        for (let i = 0; i < 15; i++) {
            const dummy = new Uint8Array(1024 * 1024); // 1MB
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

// دالة لمراقبة استخدام الذاكرة - تم تبسيطها لـ PS4 9.00
export function monitorMemoryUsage() {
    // تم تبسيط هذه الدالة لأن متصفح PS4 لا يدعم performance.memory
    // نقوم بتنفيذ عملية تنظيف خفيفة بدلاً من ذلك
    
    try {
        // إنشاء مصفوفة مؤقتة لإجبار جامع القمامة على العمل
        const dummy = new Uint8Array(512 * 1024); // 512KB
        dummy.fill(0);
        
        // محاولة تشغيل جامع القمامة يدويًا إذا كان متاحًا
        if (typeof window.gc === 'function') {
            window.gc();
        }
    } catch (e) {
        // تجاهل الأخطاء
    }
    
    return true;
}