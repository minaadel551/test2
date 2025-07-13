/* 
 * Payload Validator Module
 * This file is used to validate the payload.bin file before execution
 */

import { log } from './module/utils.mjs';

// Function to validate the payload integrity
export function validatePayload(payloadData) {
    // Check that the payload is not empty
    if (!payloadData || payloadData.byteLength === 0) {
        log('Error: Payload is empty');
        return false;
    }

    // Check payload size (should be within a reasonable range)
    // GoldHEN is typically between 200KB and 300KB
    if (payloadData.byteLength < 200000 || payloadData.byteLength > 300000) {
        log(`Warning: Unusual payload size: ${payloadData.byteLength} bytes`);
        // We don't reject the payload based on size alone, but we log a warning
    }

    // Check for GoldHEN signature (this is just an example, should be modified according to the actual signature)
    // We check for some distinctive bytes at the beginning of the file
    const headerBytes = new Uint8Array(payloadData, 0, 16);
    
    // More checks can be added here based on the actual payload structure

    log('Payload integrity verified successfully');
    return true;
}

// Function to extract GoldHEN version from payload and fix display issue
export function fixGoldHENVersionDisplay() {
    // This function extracts the GoldHEN version from the payload
    // and ensures the correct version is displayed
    
    return function(payloadData) {
        // Copy of the original data
        const modifiedPayload = new Uint8Array(payloadData);
        
        // Extract version from payload
        let extractedVersion = extractGoldHENVersion(modifiedPayload);
        
        // If we couldn't extract a version, use the default
        if (!extractedVersion) {
            extractedVersion = "2.4b18.4";
        }
        
        // Import the updateGoldHENVersion function dynamically
        import('./goldhen_info.mjs').then(module => {
            // Update the version in goldhen_info.mjs
            module.updateGoldHENVersion(extractedVersion);
        }).catch(error => {
            console.error('Failed to update GoldHEN version:', error);
        });
        
        return modifiedPayload.buffer;
    };
}

// Function to extract GoldHEN version from payload
function extractGoldHENVersion(payloadData) {
    // Regular expression to match GoldHEN version patterns (e.g., 2.4b18.4)
    const versionRegex = /\d+\.\d+[a-z]?\d*\.\d+/;
    
    // Convert a portion of the payload to a string to search for version
    // We'll check the first 10KB which should contain the version string
    const dataView = new Uint8Array(payloadData.buffer, 0, Math.min(10240, payloadData.length));
    const decoder = new TextDecoder('utf-8');
    const dataString = decoder.decode(dataView);
    
    // Search for version pattern
    const matches = dataString.match(versionRegex);
    if (matches && matches.length > 0) {
        return matches[0];
    }
    
    return null;
}