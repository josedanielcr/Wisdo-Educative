export class Platform {
    public name : string;
    public icon : string;
    public code : string;
    public color : string;
    public selected : boolean;
}

export const platforms: Platform[] = [
    {
        name: 'Notion',
        icon: '../../../assets/icons/notion-platform.png',
        code: 'Notion',
        color: '#40404033',
        selected : true
    },
    {
        name: 'OneDrive',
        icon: '../../../assets/icons/one-drive-platform.png',
        code: 'OneDrive',
        color: '#256E8EB2',
        selected : false
    },
    {
        name: 'Drive',
        icon: '../../../assets/icons/google-drive-platform.png',
        code: 'GoogleDrive',
        color: '#0084FF26',
        selected : false
    },
    {
        name: 'Evernote',
        icon: '../../../assets/icons/evernote-platform.png',
        code: 'Evernote',
        color: '#1ECF4526',
        selected : false
    },
    {
        name: 'Dropbox',
        icon: '../../../assets/icons/dropbox-platform.png',
        code: 'Dropbox',
        color: '#256E8E26',
        selected : false
    }
];
