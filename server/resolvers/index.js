import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolver from "./transactio.resolver.js";


const mergedResovers = mergeResolvers([userResolver, transactionResolver]);

export default mergedResovers;