import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc"
  });

  eleventyConfig.setServerOptions({
    host: "127.0.0.1"
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  eleventyConfig.addCollection("projects", (collectionApi) =>
    collectionApi
      .getFilteredByTag("project")
      .filter((project) => project.data.publication.publishWork && project.data.published !== false)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: false
  };
}
