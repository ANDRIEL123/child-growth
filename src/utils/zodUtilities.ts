import { get } from "lodash";
import { UseFormSetValue } from "react-hook-form";

export const populateFormOnOpen = (
    setValue: UseFormSetValue<any>,
    schema: Zod.ZodObject<any>,
    data: any
) => {
    for (let key in schema.shape) {
        let value = get(data, key)

        if (isValidDateFormat(value)) {
            value = formatDate(value)
        }

        setValue(key, value)
    }
}

function isValidDateFormat(dateString: string) {
    const regex = /^\d{4}-\d{2}-\d{2}T00:00:00$/;
    return regex.test(dateString);
}

function formatDate(dateString: string) {
    const date = new Date(dateString)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}