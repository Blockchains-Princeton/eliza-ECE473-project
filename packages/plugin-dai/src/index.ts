import { Plugin } from "@elizaos/core";
import { getDaiBalanceAction } from "./actions/getDaiBalance";

export const daiPlugin: Plugin = {
    name: "dai",
    description: "DAI balance checker plugin for Eliza",
    actions: [getDaiBalanceAction],
    evaluators: [],
    providers: [],
};

export default daiPlugin;