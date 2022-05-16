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

    /**
     * Filter the given array by given inputs and return the filtered result
     * @param value - array
     * @param checkingValue - mvalue that you want to compare
     * @param fieldsSet - fileds nees to consider
     * @param isDateType - to check is date checking
     * @returns 
     */
    transform(value: any[], checkingValue: string, fieldsSet: Set<string>, isDateType: boolean, isFavoriteFilterAdded: boolean): any {
        let filterResult = [];
        // take checking value in to upper case. because we are going to ignore the case
        checkingValue = checkingValue ? ((Date.parse(checkingValue)) ? (checkingValue + '').toUpperCase() : checkingValue.toUpperCase()) : checkingValue;
        for (let index = 0; index < value.length; index++) {
            const element = value[index];

            // checking whether the array contains given fiels and if it is, compare with checking value.  
            for (const fieldElement of fieldsSet) {

                // if array filed type is Array, we have to take it separatly and apply another logic
                if (element[fieldElement] && (!Array.isArray(element[fieldElement])) && element[fieldElement].toUpperCase().indexOf(checkingValue) >= 0) {
                    if (isFavoriteFilterAdded) {
                        if (element.isfavorite) {
                            filterResult.push(element);
                            break;
                        }
                    } else {
                        filterResult.push(element);
                        break;
                    }
                } else {
                    // filtering the array file with checking value
                    if (element[fieldElement] && Array.isArray(element[fieldElement])) {

                        const matches = element[fieldElement].filter(element => {
                            if ((element.toUpperCase().indexOf(checkingValue) !== -1)) {
                                if (isFavoriteFilterAdded) {
                                    if (element.isfavorite) {
                                        return true;
                                    }
                                } else {
                                    return true;
                                }

                            }
                        });
                        if (matches && matches.length > 0) {
                            filterResult.push(element);
                            break;
                        }
                    } else {
                        // check is this a date type. In result card we're using 'MMMM d, y' this format. So user always try to search in that format
                        if (Date.parse(element[fieldElement])) {
                            const date = this.customDatePipe.transform(element[fieldElement], 'MMMM d, y');
                            const time = this.customDatePipe.transform(element[fieldElement], 'hh:mm a');
                            if (isDateType) {
                                const checkingValueDateType = this.customDatePipe.transform(checkingValue, 'MMMM d, y');

                                if (date === checkingValueDateType) {
                                    if (isFavoriteFilterAdded) {
                                        if (element.isfavorite) {
                                            filterResult.push(element);
                                            break;
                                        }
                                    } else {
                                        filterResult.push(element);
                                        break;
                                    }

                                }


                            } else {
                                if ((date.toUpperCase().indexOf(checkingValue) !== -1) || (time.toUpperCase().indexOf(checkingValue) !== -1)) {
                                    if (isFavoriteFilterAdded) {
                                        if (element.isfavorite) {
                                            filterResult.push(element);
                                            break;
                                        }
                                    } else {
                                        filterResult.push(element);
                                        break;
                                    }
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