import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const daiEnvSchema = z.object({
    DAI_CONTRACT_ADDRESS: z.string().min(1, "DAI contract address is required"),
    INFURA_API_KEY: z.string().min(1, "Infura API key is required"),
});

export type daiConfig = z.infer<typeof daiEnvSchema>;

export async function validateDaiConfig(
    runtime: IAgentRuntime
): Promise<daiConfig> {
    try {
        const config = {
            DAI_CONTRACT_ADDRESS: runtime.getSetting("DAI_CONTRACT_ADDRESS"),
            INFURA_API_KEY: runtime.getSetting("INFURA_API_KEY"),
        };
        console.log('config: ', config);
        return daiEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `DAI contract configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
