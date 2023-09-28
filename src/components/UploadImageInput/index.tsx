
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

function UploadImageInput(props: any) {
    const [file, setFile] = useState<string>(props.file ? props.file : '')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target?.files?.[0]

        if (selectedFile) {
            const file = URL.createObjectURL(selectedFile)
            setFile(file)
        }
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        handleChange(e)
        props.register.onChange(e)
    }

    return (
        <div>
            <Input
                type="file"
                accept="image/*"
                {...props}
                {...props.register}
                onChange={onChange}
            />
            <img src={file} />
        </div>

    );
}

export default UploadImageInput