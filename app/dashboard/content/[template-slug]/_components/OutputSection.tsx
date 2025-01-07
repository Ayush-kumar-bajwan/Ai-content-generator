import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PROPS {
  outputData?: any;
}

const OutputSection = ({ outputData }: PROPS) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(outputData);
  }, [outputData]);

  const handleCopy = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();

    navigator.clipboard.writeText(markdownContent)
      .then(() => {
        // Show success toast
        toast.success('Copied!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });
      })
      .catch(err => {
        console.error('Failed to copy content: ', err);
        // Show error toast
        toast.error('Error copying!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg border">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-medium text-lg">Result</h2>
        <Button className="flex gap-2" onClick={handleCopy}>
          <Copy /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Result will appear here.."
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
      />
      {/* ToastContainer with specified settings */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default OutputSection;
