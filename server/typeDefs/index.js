import { mergeTypeDefs } from "@graphql-tools/merge";

// typeDefs
import userTypeDefs from "./user.typesDefs.js";
import transactionTypeDef from "./transaction.typeDefs.js"

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDef]);

export default mergedTypeDefs;