// Helper: build a prompt
export default function generatePrompt( title, description, tags, length = "short" ) {
  const tagList = (tags && tags.length) ? `Tags: ${tags.join(", ")}\n` : "";
  console.log("credential:")
  console.log(title,description,tags)
  return `You are a creative assistant that writes catchy YouTube titles and SEO descriptions.
Video details:
Title (uploader): ${title || "Untitled"}
Description: ${description || "No description provided."}

Please provide:
1) A short catchy title (max 60 characters).
2) A longer SEO-friendly description (2-4 lines).
1) Provide SEO-freindly hash tags 
Return JSON only, with keys "title" and "description".`;
}