"use client";

import { API } from "@services/API";
import apiAction from "@services/ApiAction";
import { ReactNode, useState } from "react";
import { Icon } from "./Icon";
import { Button, CloseButton, Separator, Tooltip } from "@heroui/react";

export default function Refresher({ children }: { children: ReactNode }) {
    const [connected, setConnected] = useState<boolean>(false);
    const [i, setI] = useState<boolean>(false);

    apiAction(async () => {
        const rest = await fetch(API.HI(), {
            method: "GET"
        });
        setConnected(true);
    }, "ops...");
    if (!connected) {
        return (
            <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
                <div className="flex items-center gap-2 p-4 bg-danger rounded-md">
                    <Icon name="TriangleAlert" />
                    <h1 className="font-bold">Server at rest</h1>
                    <Tooltip delay={0}>
                        <Button isIconOnly variant={i ? "secondary" : "tertiary"} onClick={() => setI(!i)}>
                            <Icon name="CircleAlert" />
                        </Button>
                        <Tooltip.Content>
                            <p>More information</p>
                        </Tooltip.Content>
                    </Tooltip>
                </div>
                {
                    i && (
                        <>
                            <Separator />
                            <div className="w-1/3 bg-default p-4 rounded-md">
                                <div className="w-full flex justify-end">
                                    <CloseButton onClick={() => setI(false)} />
                                </div>
                                <div className="flex flex-col py-2 gap-2">
                                    <p>
                                        As this is a portfolio site, it is hosted on a free service; consequently,
                                        the server tends to go into sleep mode after long periods of inactivity,
                                        and it can take 30 seconds to a minute to wake up.
                                    </p>
                                    <Separator variant="secondary" />
                                    <p>
                                        Thank you for your understanding.
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
    return children;
}