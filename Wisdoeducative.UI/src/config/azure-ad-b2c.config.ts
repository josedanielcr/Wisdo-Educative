import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { isDevMode } from '@angular/core';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 ||
window.navigator.userAgent.indexOf("Trident/") > -1;

let clientID : string;
let endPoint : string;
let scopes : string[];
let b2cPolicy : string = 'B2C_1_Combined_Sign-In_Sign-Up';
let authorityDomain : string;
let domainName : string;

if (isDevMode()) {
    domainName = 'wisdoeducativedev.onmicrosoft.com';
    authorityDomain = 'wisdoeducativedev.b2clogin.com';
    clientID = 'e46252e1-e3a7-4fe5-9343-08c88a86fd47';
    if(window.location.href.indexOf('localhost') > -1) {
        endPoint = 'https://localhost:7254/';
    } else {
        endPoint = 'https://wisdoeducativeapidev.azurewebsites.net/';
    }
    scopes = ["https://wisdoeducativedev.onmicrosoft.com/wisdoeducative-dev-api/api.wisdoeducative.write"
    ,"https://wisdoeducativedev.onmicrosoft.com/wisdoeducative-dev-api/api.wisdoeducative.read"]
}
else {
    domainName = 'wisdoeducative.onmicrosoft.com';
    authorityDomain = 'wisdoeducative.b2clogin.com';
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
            authority: `https://${authorityDomain}/${domainName}/${b2cPolicy}`,
        }
    },
    authorityDomain: authorityDomain,
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