import { ActionExample } from "@elizaos/core";

export const getDaiBalanceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you check my DAI balance?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me fetch your DAI balance.",
                action: "DAI_GET_BALANCE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to know how much DAI I have in my wallet.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve your DAI balance.",
                action: "DAI_GET_BALANCE",
            },
        }
    ]
];
