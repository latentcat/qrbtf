import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";


export function SectionGenerate() {
  return (
    <div className="mt-6">
      <Container>
        <Button className="w-full sm:w-48">
          Generate
        </Button>
        <div className="mt-9">
          <div className="border rounded-xl bg-accent/30 w-full sm:w-96">
            <AspectRatio ratio={1} />
          </div>
        </div>
      </Container>
    </div>
  )
}