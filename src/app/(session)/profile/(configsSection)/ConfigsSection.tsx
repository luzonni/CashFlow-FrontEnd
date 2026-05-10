"use client";

import { useUser } from "@components/hooks/useUser";
import { Key, Label, ListBox, Select } from "@heroui/react";
import { CODE, CONFIG_DEFINITIONS } from "@models/Config";

export default function ConfigsSection() {
    const { user, setSettings, loading } = useUser();

    function handlerCode(code: CODE, value: Key | null) {
        if (!value || !user) {
            return;
        }
        setSettings(code, value.toString())
    }

    if(loading || !user) {
        return (
            <div>
                loading
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <Select
                    placeholder="Select one"
                    value={user.settings.currency}
                    onChange={(value) => handlerCode("currency", value)}
                >
                    <Label>Currency</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {
                                CONFIG_DEFINITIONS.CURRENCY.values.map((value) => (
                                    <ListBox.Item key={value} id={value} textValue={value}>
                                        {value}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))
                            }

                        </ListBox>
                    </Select.Popover>
                </Select>

                <Select
                    placeholder="Select one"
                    value={user.settings.locale}
                    onChange={(value) => handlerCode("locale", value)}
                >
                    <Label>{CONFIG_DEFINITIONS.LOCALE.label}</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {
                                CONFIG_DEFINITIONS.LOCALE.values.map((value) => (
                                    <ListBox.Item key={value} id={value} textValue={value}>
                                        {value}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))
                            }

                        </ListBox>
                    </Select.Popover>
                </Select>

            </div>
        </div>
    )
}