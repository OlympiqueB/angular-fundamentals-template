import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Output,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: '[numberOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberOnlyDirective),
      multi: true,
    },
  ],
})
export class NumberOnlyDirective implements ControlValueAccessor {
  @Output() valueChange = new EventEmitter<string>();

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    let inputValue = this.elementRef.nativeElement.value;

    inputValue = inputValue.replace(/[^0-9]/g, '');

    if (inputValue === '00') {
      inputValue = '0';
    } else if (inputValue.length > 1) {
      inputValue = inputValue.replace(/^0+/, '');
    }

    this.elementRef.nativeElement.value = inputValue;

    this.valueChange.emit(inputValue);

    if (this.onChange) {
      this.onChange(inputValue);
    }

    if (this.onTouched) {
      this.onTouched();
    }

    event.stopPropagation();
  }


  writeValue(value: string): void {
    this.elementRef.nativeElement.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}