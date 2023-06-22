const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

(async () => {
  const pages = await globby([
    "pages/*.js",
    "pages/*.tsx",
    "pages/article/*.js",
    "pages/article/*.tsx",
    "!pages/_*.js",
    "!pages/index.js",
    "!pages/_*.tsx",
    "!pages/api",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search(".md") >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, "utf8");
                  const fm = matter(source);
                  if (fm.data.draft) {
                    return;
                  }
                  if (fm.data.canonicalUrl) {
                    return;
                  }
                }
                const path = page
                  .replace("pages/", "")
                  .replace("pages/article/", "article/")
                  .replace("news/", "blog/news/")
                  .replace("public/", "/")
                  .replace(".js", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/feed.xml", "");
                const route = path === "/index" ? "" : path;
                if (
                  page.search("pages/404.") > -1 ||
                  page.search(`pages/article/[...slug].`) > -1
                ) {
                  return;
                }
                return `
                        <url>
                            <loc>https://backpacker-supabase.vercel.app/${route}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
})();
