import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 ||
window.navigator.userAgent.indexOf("Trident/") > -1;

let clientID : string;
let endPoint : string;
let scopes : string[];
let b2cPolicy : string = 'B2C_1_Combined_Sign-In_Sign-Up';
let authorityDomain : string;
let domainName : string;

domainName = environment.domainName;
authorityDomain = environment.authorityDomain;
clientID = environment.clientID;
if(window.location.href.indexOf('localhost') > -1) {
    endPoint = environment.local;
} else {
    endPoint = environment.api;
}
scopes = environment.scopes;

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