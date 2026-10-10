// Enable only after the case studies are ready for public release.
const publishWork = false;

export default {
  publishWork: publishWork || process.env.WORK_PREVIEW === "true"
};
