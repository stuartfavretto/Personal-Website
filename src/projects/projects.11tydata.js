export default {
  tags: ["project"],
  contentType: "project",
  eleventyComputed: {
    layout: (data) => !data.publication.publishWork || data.published === false
      ? false
      : "layouts/project.webc",
    permalink: (data) => !data.publication.publishWork || data.published === false
      ? false
      : `/projects/${data.page.fileSlug}/index.html`,
    eleventyExcludeFromCollections: (data) => !data.publication.publishWork || data.published === false
  }
};
