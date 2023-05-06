import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { isDevMode } from '@angular/core';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 ||
window.navigator.userAgent.indexOf("Trident/") > -1;

let clientID : string;
let endPoint : string;
let scopes : string[];
let b2cPolicy : string = 'B2C_1_Combined_Sign-In_Sign-Up';

if (isDevMode()) {
    b2cPolicy = b2cPolicy + '_DEV';
    clientID = 'e090b4fa-ebf0-4f50-a520-bd34a0f9c4ed';
    endPoint = 'https://localhost:7254/';
    scopes = ['https://wisdoeducative.onmicrosoft.com/wisdoeducativedev/api.wisdoeducativedev.read',
    'https://wisdoeducative.onmicrosoft.com/wisdoeducativedev/api.wisdoeducativedev.write'];
}
else {
    clientID = '7fa12bd2-0a44-447e-ba5b-c7e6dbf2b4a1';
    endPoint = 'https://wisdoeducative.azurewebsites.net/';
    scopes = ['https://wisdoeducative.onmicrosoft.com/wisdoeducative/api.wisdoeducative.read',
    'https://wisdoeducative.onmicrosoft.com/wisdoeducative/api.wisdoeducative.write'];
}

export const b2cPolicies = {
    names: {
        signUpSignIn: b2cPolicy,
    },
    authorities: {
        signUpSignIn: {
            authority: `https://wisdoeducative.b2clogin.com/wisdoeducative.onmicrosoft.com/${b2cPolicy}`,
        }
    },
    authorityDomain: 'wisdoeducative.b2clogin.com',
};

export const msalConfig: Configuration = {
    auth: {
        clientId : clientID,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain], 
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, 
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const loginRequest = {
    scopes: []
}

export const protectedResources = {
    wisdoeducativeApi: {
        endpoint: endPoint,
        scopes: scopes,
    }
}