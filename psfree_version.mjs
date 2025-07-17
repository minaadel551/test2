/* 
 * PSFree Version Information
 * This file contains version information for the PSFree exploit
 */

export const PSFREE_VERSION = '1.5.1';

// Function to get PSFree version
export function getPSFreeVersion() {
    return PSFREE_VERSION;
}

// Export version information for use in other modules
export default {
    version: PSFREE_VERSION,
    getVersion: getPSFreeVersion
};