import { get } from "lodash";
import { UseFormSetValue } from "react-hook-form";

export const populateFormOnOpen = (
    setValue: UseFormSetValue<any>,
    schema: Zod.ZodObject<any>,
    data: any
) => {
    for (let key in schema.shape) {
        let value = get(data, key)

        if (isDateValid(value)) {
            value = formatDate(value)
        }

        setValue(key, value)
    }
}

function isDateValid(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function formatDate(dataString: string) {
    const date = new Date(dataString)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}