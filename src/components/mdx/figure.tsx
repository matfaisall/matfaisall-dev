import Image, { type StaticImageData } from "next/image";

type FigureProps = {
  /** An image imported next to the post: `import diagram from "./diagram.webp"`. */
  src: StaticImageData;
  alt: string;
  caption?: string;
};

/**
 * An image in a post, with an optional caption. In MDX, after importing the image:
 * `<Figure src={diagram} alt="What the image shows" caption="Shown under it" />`
 */
export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 42rem, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-muted-foreground text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
