import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { forwardRef, useId } from 'react';

function RTE ({name, control, label, defaultValue =""}, ref){
    const id = useId()
    return (
        <div className='w-full'> 
            {label && <label className='text-lg text-blue-100' id={id}>{label}</label>}
        
            <Controller
                id = {id}
                name={name || "content"}
                control={control}
                render={({field: {onChange}}) => (
                    <Editor 
                        apiKey='38r3g774dt277t5t3ox2rmm2ystiu8s2aykhqlfkfv38g2dv'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 250,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                        ref={ref}
                    />
                )}
            />
        </div>
    )
}


export default forwardRef(RTE) 