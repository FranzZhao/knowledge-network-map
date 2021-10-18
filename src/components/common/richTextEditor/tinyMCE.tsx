import React, { useEffect, useRef, useState } from 'react';
// import tinymce
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide-dark/skin.min.css';
import 'tinymce/skins/ui/oxide-dark/content.inline.min.css';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => createStyles({
    textEditor: {
        "&>*": {
            padding: '5px 6px',
            borderTop: '1px solid grey'
        },
        "&>*:focus-visible": {
            padding: 5,
            border: `1px dashed ${theme.palette.secondary.main}`,
            outline: 'none',
        }
    },
    textPlaceholder: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 5,
        color: theme.palette.grey[400],
    },
    hidden: {
        display: 'none',
    }
}));

interface TinyMCEState {
    text: any;
    handleChangeTinyText: (text: any)=>void;
}

export const TinyMCE:React.FC<TinyMCEState> = ({
    text, handleChangeTinyText
}) => {
    const classes = useStyles();
    // tinymce
    const editorRef = useRef(null);
    // const [textValue, setTextValue] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    useEffect(()=>{
        if(text === '') {
            return setShowPlaceholder(true);
        }
        return setShowPlaceholder(false);
    },[text]);

    const log = () => {
        console.log(text);
    };

    return (
        <div>
            <div className={clsx(classes.textPlaceholder,{
                [classes.hidden]: !showPlaceholder
            })}>
                请在此处编辑知识笔记内容...
            </div>
            <div className={classes.textEditor}>
                <Editor
                    id={"tinyEditor"}
                    apiKey="e8qwinb1sfamvkk0hlrn41enu1tq0ev7othbjylgbgc2iqy4"
                    inline={true}  //行内编辑器
                    init={{
                        language: "zh_CN",
                        content_css: false,
                        skin_url: 'tinymce/skins/ui/oxide-dark',
                        height: 500,
                        menubar: false,
                        toolbar_location: 'bottom',
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'kityformula-editor',
                        ],
                        toolbar: "formatgroup paragraphgroup insertgroup",
                        toolbar_groups: {
                            formatgroup: {
                                icon: "format",
                                tooltip: "文本样式",
                                items:
                                    "bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat"
                            },
                            paragraphgroup: {
                                icon: "paragraph",
                                tooltip: "段落样式",
                                items:
                                    "h1 h2 h3 | bullist numlist | alignleft aligncenter alignright | indent outdent"
                            },
                            insertgroup: {
                                icon: "plus",
                                tooltip: "插入",
                                items: "link image emoticons charmap hr kityformula-editor"
                            }
                        },
                        // toolbar: 'undo redo | formatselect | ' +
                        //     'bold italic backcolor | alignleft aligncenter ' +
                        //     'alignright alignjustify | bullist numlist outdent indent | ' +
                        //     'removeformat | fullscreen review',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                    }}
                    value={text}
                    onEditorChange={handleChangeTinyText}
                />
            </div>
        </div>
    );
}