import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseInput implements ControlValueAccessor {

    value: any;
    isDisabled: boolean;
    private onChange = (value: any) => {};
    private onTouched = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    updateValue(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
        this.onChange(this.value);
        this.onTouched();
    }
}