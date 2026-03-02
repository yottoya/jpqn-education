import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function TestPage() {
  const image = {
    image: "julias-class.jpg",
    alt: "Julias Class",
  };
  return (
    <AspectRatio ratio={16 / 9}>
      <img src={image.image} height={100} width={200} alt={image.alt} />
    </AspectRatio>
  );
}
