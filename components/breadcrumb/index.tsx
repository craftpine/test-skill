import Link from "next/link";
import React from "react";

type BreadcrumbType = {
  data: { title: string; url: string }[];
};

export default function Breadcrumb(props: BreadcrumbType) {
  const { data } = props;

  const last = data.slice(-1);

  return (
    <nav>
      <ol className="flex gap-2 text-xs mb-2">
        {data.map((t, i) => (
          <React.Fragment key={i}>
            <li>
              <Link href={t.url}>{t.title}</Link>
            </li>
            {i !== data.length - 1 && <li>/</li>}
          </React.Fragment>
        ))}
      </ol>
      <div className="text-3xl font-bold capitalize">{last[0].title}</div>
    </nav>
  );
}
