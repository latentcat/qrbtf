import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";


const styleList = [0, 1, 2, 3, 4, 5, 6]

export function SectionStyles() {
  return (
    <div className="mt-9">
      <div className="overflow-x-auto no-scrollbar snap-x sm:snap-none snap-mandatory">
        <div className="flex flex-col">

          <div className="w-full flex flex-col items-center sm:px-6 lg:px-12">
            <div className="w-full max-w-5xl">
              <div className="flex sm:gap-3">

                <div className="w-3 shrink-0 sm:hidden"/>

                {styleList.map((item, index) => (
                  <div key={index} className="snap-start pl-6 -ml-3 sm:pl-0 sm:ml-0">
                    <div className="w-[calc((100vw-(12px)*5)/2)] sm:w-48 border rounded-xl bg-accent/30">
                      <AspectRatio ratio={1}/>
                    </div>
                  </div>
                ))}

                <div className="w-6 shrink-0"/>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}