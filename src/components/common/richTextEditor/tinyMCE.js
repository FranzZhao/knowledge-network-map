import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide-dark/skin.min.css';
import 'tinymce/skins/ui/oxide-dark/content.inline.min.css';

export const TinyMCE = () => {
    // tinymce
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
            <Editor
                id={"tinyEditor"}
                apiKey="e8qwinb1sfamvkk0hlrn41enu1tq0ev7othbjylgbgc2iqy4"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>在此编辑知识笔记的内容.</p>"
                init={{
                    language: "zh_CN",
                    content_css: false,
                    skin_url: 'tinymce/skins/ui/oxide-dark',
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | fullscreen review',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                }}
            />

            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}
