import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
/**
 * Props for `BlogPostIndex`.
 */
export type ContentIndexProps =
  SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "BlogPostIndex" Slices.
 */
const ProjectIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const experiences = await client.getAllByType("experiences");
  const projects = await client.getAllByType("projects");
  const music = await client.getAllByType("music");

  const items =
    slice.primary.content_type === "1Projects"
      ? projects
      : slice.primary.content_type === "2Experience"
      ? experiences
      : music;

  

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="job-title mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="job-title prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={slice.primary.content_type}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ProjectIndex;