import {HTMLAttributes} from "react";


export function Container(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full flex flex-col items-center px-6 lg:px-12">
      <div className="w-full max-w-4xl">
        {props.children}
      </div>
    </div>
  )
}