"use client"
import React, { useState } from "react";
import { FieldDescription, FieldProps } from "firecms";
import { Editor } from "@tinymce/tinymce-react";


export default function CustomColorTextField({
    property,
    value,
    setValue,
    setFieldValue, // use this function to update a different field
    customProps,
    touched,
    error,
    isSubmitting,
    context, // the rest of the entity values here
    ...props
}: FieldProps<string>) {
    const [current, setCurrentText] = useState(value)

    return (
        <>

            <Editor
                apiKey="4ph83ba58j6ce4qqqpjgt08wvhypz78d0vv8tl54ltzlu64j"
                initialValue={current}
                init={{
                    branding: false,
                    height: 400,
                    menubar: true,
                    plugins:
                        "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                    toolbar:
                        "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                    image_advtab: true
                }}
                onChange={(evt: any) => {
                    setValue(
                        evt.target.getContent()
                    );
                }}
            />
            <FieldDescription property={property} />
        </>

    );

}