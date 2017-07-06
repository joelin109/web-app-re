import { convertFromHTML, ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export let toHtml = (editorContent) => {
    const _rawContentState = convertToRaw(editorContent.getCurrentContent());
    const _html = draftToHtml(_rawContentState);
    return _html;
}


export let toEditorContent = (html) => {
    //const _contentBlocks = convertFromHTML(html);
    let _html = html.trim();
    
    let _imgCase = 0<=_html.indexOf('<img') && _html.indexOf('<img')<7; 
    let _htmlChanged = (_html.length<7 || _imgCase) ? '<p></p>'+_html  : _html;
    
    const _contentBlocks = htmlToDraft(_htmlChanged).contentBlocks;
    const _contentState = ContentState.createFromBlockArray(_contentBlocks);
    const _editorState = EditorState.createWithContent(_contentState);
    return _editorState;
}