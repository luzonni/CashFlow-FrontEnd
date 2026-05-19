"use client";

import { Icon } from "@components/Icon";
import {
    Button,
    Input,
    Label,
    Modal,
    Form,
    parseColor,
    ColorPicker,
    ColorSwatch,
    ColorSwatchPicker,
    ColorArea,
    ColorSlider,
    ColorField
} from "@heroui/react";
import PaymentMethod from "@models/PaymentMethod";
import { ReactNode, useState } from "react";

type PaymentMethodModalProps = {
    payMethod?: PaymentMethod;
    create?: (color: string, name: string) => Promise<void>;
    update?: (id: number, color: string, name: string) => Promise<void>;
    children: ReactNode;
}

export default function PaymentMethodModal({ payMethod, create, update, children }: PaymentMethodModalProps) {
    const [color, setColor] = useState(parseColor(payMethod ? payMethod.color : "#325578"));
    const [name, setName] = useState<string>(payMethod ? payMethod.name : "");

    const title = payMethod ? "Edit" : "Create";

    const colorPresets = [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#f43f5e",
    ];

    const shuffleColor = () => {
        const randomHue = Math.floor(Math.random() * 360);
        const randomSaturation = 50 + Math.floor(Math.random() * 50);
        const randomLightness = 40 + Math.floor(Math.random() * 30);
        setColor(parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`));
    };

    async function handlerSubmit() {
        if (payMethod) {
            if(update)
                update(payMethod.id, color.toString("hex"), name);
        } else {
            if(create)
                create(color.toString("hex"), name);
            setColor(parseColor("#325578"));
            setName("");
        }
    }

    return (
        <Modal>
            {children}
            <Modal.Backdrop variant="opaque">
                <Modal.Container size="xs">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header className="flex flex-row items-center">
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="FileMinusCorner" />
                            </Modal.Icon>
                            <Modal.Heading>
                                {title}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-2 p-2">
                            <Form className="flex flex-col gap-4">
                                <div className="bg-surface-secondary p-2 flex flex-row items-center rounded-2xl drop-shadow-xs">
                                    <ColorPicker className="w-full" value={color} onChange={setColor}>
                                        <ColorPicker.Trigger className="w-full">
                                            <ColorSwatch size="lg" />
                                            <Label>Pick a color</Label>
                                        </ColorPicker.Trigger>
                                        <ColorPicker.Popover className="gap-2">
                                            <ColorSwatchPicker className="justify-center pt-2" size="sm">
                                                {colorPresets.map((preset) => (
                                                    <ColorSwatchPicker.Item key={preset} color={preset}>
                                                        <ColorSwatchPicker.Swatch />
                                                    </ColorSwatchPicker.Item>
                                                ))}
                                            </ColorSwatchPicker>
                                            <ColorArea
                                                aria-label="Color area"
                                                className="max-w-full"
                                                colorSpace="hsb"
                                                xChannel="saturation"
                                                yChannel="brightness"
                                            >
                                                <ColorArea.Thumb />
                                            </ColorArea>
                                            <div className="flex items-center gap-2 px-1">
                                                <ColorSlider aria-label="Hue slider" channel="hue" className="flex-1" colorSpace="hsb">
                                                    <ColorSlider.Track>
                                                        <ColorSlider.Thumb />
                                                    </ColorSlider.Track>
                                                </ColorSlider>
                                                <Button
                                                    isIconOnly
                                                    aria-label="Shuffle color"
                                                    size="sm"
                                                    variant="tertiary"
                                                    onPress={shuffleColor}
                                                >
                                                    <Icon name="Shuffle" />
                                                </Button>
                                            </div>
                                            <ColorField aria-label="Color field">
                                                <ColorField.Group variant="secondary">
                                                    <ColorField.Prefix>
                                                        <ColorSwatch size="xs" />
                                                    </ColorField.Prefix>
                                                    <ColorField.Input />
                                                </ColorField.Group>
                                            </ColorField>
                                        </ColorPicker.Popover>
                                    </ColorPicker>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label>Payment method name</Label>
                                    <Input
                                        placeholder="Credit"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row justify-end">
                                    <Button onClick={() => handlerSubmit()} slot="close">Done</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}