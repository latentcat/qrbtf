import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";


const styleList = [0, 1, 2, 3, 4, 5, 6]

export function SectionStyles() {
  return (
    <div className="mt-9">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-col">
          <Container>
            <div className="flex gap-3">
              {styleList.map((item, index) => (
                <div key={index}>
                  <div className="w-[calc((100vw-(12px)*5)/2)] sm:w-48 border rounded-xl bg-accent/30">
                    <AspectRatio ratio={1} />
                  </div>
                </div>
              ))}

              <div className="w-3 shrink-0" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}