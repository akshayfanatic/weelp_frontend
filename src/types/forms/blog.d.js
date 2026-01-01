// @ts-check

/**
 * Full Blog Post object (as stored in DB / returned from API)
 * @typedef {Object} BlogPost
 * @property {string} id - Unique identifier
 * @property {string} title - Title of the post
 * @property {string} description - Short description or excerpt
 * @property {string} content - Full post content (HTML/Markdown)
 * @property {"draft" | "published"} status - Post status
 * @property {string} createdAt - ISO string of creation date
 * @property {string} updatedAt - ISO string of last update
 */

/**
 * Creating New Blog Post
 * @typedef {Object} BlogPostForm
 * @property {string} title - Title of the post
 * @property {object} content - Full content
 * @property {string} excerpt - Excerpt
 * @property {number[]} media_gallery - Media Gallery
 * @property {number[]} categories - Categories mention
 * @property {number[]} tags - Tags
 * @property {boolean} [publish=true] -defaults to True
 */
