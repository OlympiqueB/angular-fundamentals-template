import { Pipe } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe {
  transform(date: string) {
    return date.replace(/\//g, ".");
  }
}
