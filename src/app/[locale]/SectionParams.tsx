import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Components";
import {Slider} from "@/components/ui/slider";


export function SectionParams() {
  return (
    <div className="mt-12">
      <Container>
        <div className="flex items-center w-full justify-between">
          <div>Parameter name</div>
          <div
            className="w-48"
          >
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}