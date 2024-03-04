import Link from 'next/link';
import React from 'react'

function LinkCard(props: {
  href: string;
  title: string;
  details: string;
  color: "yellow" | "red" | "blue";
}) {
  return (
    <Link
      href={props.href}
      className={`
      group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-[${props.color}] hover:bg-[${props.color}]  hover:bg-opacity-5 mx-2
      `}
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {props.title + " "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        {props.details}
      </p>
    </Link>
  )
}

export default LinkCard