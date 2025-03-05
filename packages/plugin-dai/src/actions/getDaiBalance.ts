import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateDaiConfig } from "../environment";
import { getDaiBalanceExamples } from "../examples";
import { createDaiService } from "../services";

export const getDaiBalanceAction: Action = {
    name: "DAI_GET_BALANCE",
    similes: [
        "CRYPTOCURRENCY",
        "DAI",
        "BALANCE",
        "ETHEREUM"
    ],
    description: "Get the DAI balance of a given address.",
    validate: async (runtime: IAgentRuntime) => {
        await validateDaiConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Validate config and build Infura URL
        const config = await validateDaiConfig(runtime);
        const infuraUrl = `https://mainnet.infura.io/v3/${config.INFURA_API_KEY}`;

        // Try to extract Ethereum address from multiple possible locations
        elizaLogger.info("Creating DAI service with contract address and Infura URL...");
        elizaLogger.info(`Contract: ${config.DAI_CONTRACT_ADDRESS}`);
        elizaLogger.info(`Infura URL: ${infuraUrl}`);

        const daiService = createDaiService(config.DAI_CONTRACT_ADDRESS, infuraUrl);

        // 2) Attempt to extract Ethereum address
        elizaLogger.info(`Received message content: ${message.content?.text ?? "No text provided"}`);
        const matchedAddress = message.content.text.match(/0x[a-fA-F0-9]{40}/)?.[0];

        if (matchedAddress) {
            elizaLogger.info(`Matched Ethereum address: ${matchedAddress}`);
        } else {
            elizaLogger.info(
                "No valid Ethereum address found in the user message. Falling back to default address..."
            );
        }

        let userAddress = matchedAddress || "0xf6e72Db5454dd049d0788e411b06CfAF16853042";

        if (!userAddress) {
            callback({
                text: "I couldn't find your Ethereum address. Please provide it to check your DAI balance.",
            });
            return false;
        }

        try {
            const balanceData = await daiService.getDaiBalance(userAddress);
            elizaLogger.success(
                `Successfully fetched DAI balance for address: ${userAddress}`
            );
            callback({
                text: `The DAI balance for address ${balanceData.address} is ${balanceData.balance} wei.`,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error("Error in DAI plugin handler:", error);
            callback({
                text: `Error fetching DAI balance: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }

    },
    examples: getDaiBalanceExamples as ActionExample[][],
} as Action;
