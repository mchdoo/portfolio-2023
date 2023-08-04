import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, INLINES, Hyperlink } from "@contentful/rich-text-types";

function Icon() {
  return (
    <svg
      className="inline"
      data-testid="geist-icon"
      fill="none"
      height="16"
      width="16"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M7 17L17 7"></path>
      <path d="M7 7h10v10"></path>
    </svg>
  );
}

export default function Desarrollo({ document }: { document: Document }) {
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: any) => {
        const { uri } = node.data;
        const { value } = node.content[0];
        return (
          <a
            href={uri}
            target="_blank"
            className="text-accent-1 underline underline-offset-2"
          >
            {value}
            <Icon />
          </a>
        );
      },
    },
  };

  return (
    <div className="max-w-lg text-lg mt-6">
      {documentToReactComponents(document, options)}
    </div>
  );
}
