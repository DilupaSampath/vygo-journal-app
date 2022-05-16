import { GlobalUiEvent } from "../enums/global-event.enums";
import { GlobalEventHandller } from "../services/global-event.handller";

export class QuillConfiguration{


   public getConfig(globalEventHandller: GlobalEventHandller){
        return { 
            toolbar: { 
              container: 
              [
                [ 
                  'bold', 
                  'italic', 
                  'link', 
                  { list: 'bullet' }, 
                  { list: 'ordered' }, 
                  'blockquote', 
                  { redo: 'redo' }, 
                  { undo: 'undo' }, 
                  { 'size': ['small', false, 'large', 'huge'] }
                ],
                ['link', 'image']     
              ], 
              handlers: { 
                          redo : function () { this.quill.history.redo(); }, 
                          undo : function () { this.quill.history.undo(); },
                          image : function (data) {  const input = document.createElement('input');
                          input.setAttribute('type', 'file');
                          input.click();
                    
                          // Listen upload local image and save to server
                          input.onchange = () => {
                            const files = input.files;
                            globalEventHandller.triggerUiEvent(files,GlobalUiEvent.FILE_UPLOAD);
                            // file type is only image.
                            if (/^image\//.test(files[0].type)) {
                              // saveToServer(file);
                            } else {
                              console.warn('You could only upload images.');
                            }
                          };  },
                        } 
                      }, 
            history: { 
              delay: 2000, 
              maxStack: 500, 
              userOnly: true 
                      } 
          };
    }
    selectLocalImage() {
      // const input = document.createElement('input');
      // input.setAttribute('type', 'file');
      // input.click();

      // // Listen upload local image and save to server
      // input.onchange = () => {
      //   const file = input.files[0];

      //   // file type is only image.
      //   if (/^image\//.test(file.type)) {
      //     // saveToServer(file);
      //   } else {
      //     console.warn('You could only upload images.');
      //   }
      // };
    }
    
   public importIcons(scope){
    const icons = scope.import('ui/icons');
    icons['undo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>' +
      '<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
    icons['redo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>' +
      '<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';
   } 
}