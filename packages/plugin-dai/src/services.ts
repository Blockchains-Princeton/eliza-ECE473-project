import { ethers } from "ethers";
import { DaiBalanceResponse } from "./types";

export const createDaiService = (contractAddress: string, providerUrl: string) => {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const daiContract = new ethers.Contract(
        contractAddress,
        ["function balanceOf(address owner) view returns (uint256)"],
        provider
    );

    const getDaiBalance = async (address: string): Promise<DaiBalanceResponse> => {
        if (!address) {
            throw new Error("Invalid parameters");
        }

        try {
            const balance = await daiContract.balanceOf(address);
            return { address, balance: balance.toString() };
        } catch (error: any) {
            console.error("DAI Contract Error:", error.message);
            throw error;
        }
    };

    return { getDaiBalance };
};
