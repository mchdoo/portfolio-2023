import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, INLINES } from "@contentful/rich-text-types";

function Icon(): JSX.Element {
  return (
    <svg
      className="inline"
      fill="none"
      height="16"
      width="16"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M7 17L17 7"></path>
      <path d="M7 7h10v10"></path>
    </svg>
  );
}

export default function Desarrollo({ document }: any) {
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
    <article className="max-w-lg mt-6 prose prose-lg text-left ">
      {documentToReactComponents(document, options)}
    </article>
  );
}
