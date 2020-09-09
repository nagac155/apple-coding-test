import { Injectable } from '@angular/core';

@Injectable()
export class DateFormat  {

    fromModel(date) {
        const d = new Date(date);
        if (!date) {
            return null;
        }
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }

    toModel(date): string {
        if (!date) {
            return null;
        }
        return date.year + '-' + date.month + '-' + date.day;
    }
}

