import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";


const styleList = [0, 1, 2, 3, 4, 5, 6]

export function SectionStyles() {
  return (
    <div className="mt-12">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-col">
          <Container>
            <div className="flex gap-6">
              {styleList.map((item, index) => (
                <div key={index}>
                  <div className="w-48 border rounded-xl bg-accent/30">
                    <AspectRatio ratio={1} />
                  </div>
                </div>
              ))}

              <div className="w-6 shrink-0" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}