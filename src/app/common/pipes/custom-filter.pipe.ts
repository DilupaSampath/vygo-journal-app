import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { CustomDatePipe } from './custom-date.pipe';

@Pipe({
    name: 'customFilterPipe'
})
export class CustomFilterPipe implements PipeTransform {
    customDatePipe: CustomDatePipe;
    constructor(@Inject(LOCALE_ID) public locale: string) {
        this.customDatePipe = new CustomDatePipe(locale);

    }

    transform(value: any[], checkingValue: string, fieldsSet: Set<string>, isDateType: boolean): any {
        let filterResult = [];
        checkingValue = checkingValue ? ((Date.parse(checkingValue)) ? (checkingValue + '').toUpperCase() : checkingValue.toUpperCase()) : checkingValue;
        for (let index = 0; index < value.length; index++) {
            const element = value[index];

            for (const fieldElement of fieldsSet) {
                if (element[fieldElement] && (!Array.isArray(element[fieldElement])) && element[fieldElement].toUpperCase().indexOf(checkingValue) >= 0) {
                    filterResult.push(element);
                    break;
                } else {
                    if (element[fieldElement] && Array.isArray(element[fieldElement])) {

                        const matches = element[fieldElement].filter(element => {
                            if (element.toUpperCase().indexOf(checkingValue) !== -1) {
                                return true;
                            }
                        });
                        if (matches && matches.length > 0) {
                            filterResult.push(element);
                            break;
                        }
                    } else {
                        if (Date.parse(element[fieldElement])) {
                            const date = this.customDatePipe.transform(element[fieldElement], 'MMMM d, y');
                            const time = this.customDatePipe.transform(element[fieldElement], 'hh:mm a');
                            if (isDateType) {
                                const checkingValueDateType = this.customDatePipe.transform(checkingValue, 'MMMM d, y');

                                if (date === checkingValueDateType) {
                                    filterResult.push(element);
                                    break;
                                }


                            } else {
                                if ((date.toUpperCase().indexOf(checkingValue) !== -1) || (time.toUpperCase().indexOf(checkingValue) !== -1)) {
                                    filterResult.push(element);
                                    break;
                                }
                            }


                        }
                    }
                }

            }
        }
        return filterResult;
    }


    checkHasValidField(object: any, fieldSetData: Set<string>) {
        for (const element of fieldSetData) {
            console.log(element);
            if (object.hasOwnProperty(element)) {
                return element;
            }
        }
        return null;
    }


}