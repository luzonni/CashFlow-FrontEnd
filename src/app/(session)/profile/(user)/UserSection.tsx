"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, Chip, Label, toast, Tooltip } from "@heroui/react";
import apiAction from "@services/ApiAction";
import MailService from "@services/MailService";
import { formatDate } from "@utils/DateUtils";


export default function UserSection() {
    const { user } = useUser();


    function sendEmailHandler() {
        apiAction(async () => {
            await MailService.send();
            toast.success("Email sended!")
        }, "Error to send email.")
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <div className="flex flex-row items-center gap-2 py-2 px-4 bg-surface-tertiary rounded-2xl justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Icon name="UserKey" />
                        <p>{user.username}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <div className="flex flex-row items-center gap-2 py-2 px-4 bg-surface-tertiary rounded-2xl justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Icon name="Mail" />
                        <p className="text-xs sm:text-base">{user.email}</p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        {
                            user.verified ? (
                                <Chip color="success"><Icon name="CircleCheck" /><p className="hidden sm:flex">Verified</p></Chip>
                            ) : (
                                <>
                                    <Chip color="warning">Pending</Chip>
                                    <Tooltip delay={0}>
                                        <Button
                                            variant="secondary"
                                            isIconOnly
                                            aria-label="Send email"
                                            onClick={() => sendEmailHandler()}
                                        >
                                            <Icon name="Send" />
                                        </Button>
                                        <Tooltip.Content>
                                            <p>Send verification email</p>
                                        </Tooltip.Content>
                                    </Tooltip>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Birthday</Label>
                <div className="flex flex-row items-center gap-2 py-2 px-4 bg-surface-tertiary rounded-2xl justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Icon name="Calendar" />
                        <p> {formatDate(user.birthday, user.settings.locale)} </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <Tooltip delay={0}>
                            <Button variant="secondary" isIconOnly><Icon name="Pen" /></Button>
                            <Tooltip.Content>
                                <p>Change birthday</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <div className="flex flex-row items-center gap-2 py-2 px-4 bg-surface-tertiary rounded-2xl justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Icon name="KeyRound" />
                        <p> *** </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <Tooltip delay={0}>
                            <Button variant="secondary" isIconOnly aria-label="Edit Password"><Icon name="Pen" /></Button>
                            <Tooltip.Content>
                                <p>Change password</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
