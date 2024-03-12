import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";
import {Slider} from "@/components/ui/slider";


export function SectionParams() {
  return (
    <div className="">
      <Container>
        <h2 className="mt-9 mb-4 text-2xl font-bold">A1</h2>
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