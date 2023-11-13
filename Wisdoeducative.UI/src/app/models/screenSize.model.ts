export class ScreenSizeModel {
    public isDesktop: boolean;
    public isTablet: boolean;
    public isPhone: boolean;

    constructor(isDesktop: boolean, isTablet: boolean, isPhone: boolean) {
        this.isDesktop = isDesktop;
        this.isTablet = isTablet;
        this.isPhone = isPhone;
    }
}