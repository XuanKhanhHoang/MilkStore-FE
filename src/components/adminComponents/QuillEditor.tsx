"use client";
import dynamic from "next/dynamic";
import React, { memo } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
function QuillEditor({
  defaultValue,
  quillModule,
  refValue,
}: {
  defaultValue: string | undefined;
  quillModule: any;
  refValue: any;
}) {
  return (
    <ReactQuill
      theme="snow"
      defaultValue={defaultValue}
      modules={quillModule}
      className="min-h-[200px]"
      onChange={(e: string) => {
        refValue.current = e;
      }}
    />
  );
}
export default memo(QuillEditor);
