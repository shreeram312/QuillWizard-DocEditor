import db from "@/utils/db";
import React from "react";
import EditorBlock from "./_components/EditorBlock";

interface SingleDocumentProps {
  documentId: string;
}
const SingleDocumentPage = async ({
  params,
}: {
  params: SingleDocumentProps;
}) => {
  const getDocument = await db.document.findUnique({
    where: {
      id: params.documentId,
    },
  });

  return (
    <div className="mt-6">
      <EditorBlock document={getDocument} />
    </div>
  );
};

export default SingleDocumentPage;
