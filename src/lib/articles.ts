import glob from "fast-glob";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  hidden?: boolean;
  lang?: "zh" | "en";
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

// async function importArticle(
//   articleFilename: string,
// ): Promise<ArticleWithSlug> {
//   let { article } = (await import(`../app/(common)/articles/${articleFilename}`)) as {
//     default: React.ComponentType
//     article: Article
//   }
//
//   return {
//     slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
//     ...article,
//   }
// }
//
// export async function getAllArticles() {
//   let articleFilenames = await glob('*/page.mdx', {
//     cwd: './src/app/(common)/articles',
//   })
//
//   let articles = await Promise.all(articleFilenames.map(importArticle))
//   articles = articles
//     .filter((a) => !a.hidden)
//     .sort((a, z) => +new Date(z.date) - +new Date(a.date))
//
//   return articles
// }

export function genMetadata(article: ArticleWithSlug) {
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      images: encodeURI(`/og?title=${article.title}`),
    },
  };
}
