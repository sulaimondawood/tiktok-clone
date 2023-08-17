import { type SchemaTypeDefinition } from "sanity";
import comments from "./schemas/comments";
import user from "./schemas/user";
import userPosted from "./schemas/userPosted";
import content from "./schemas/content";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [comments, user, userPosted, content],
};
