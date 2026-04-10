"use client";

import { useUser } from "@components/hooks/useUser"
import { Icon } from "@components/Icon";
import CreateNewCategoryModal from "./CreateNewCategoryModal";
import { Button } from "@heroui/react";
import Category from "@models/Category";
import { useEffect, useState } from "react";
import TableCategory from "./TableCategory";


export default function Page() {
    const { user } = useUser();
    const [categories, setCategories] = useState<Category[]>([]);

    async function pushCategories() {
        const res = await fetch("/api/category", {
            method: "GET"
        });
        const data: Category[] = await res.json();
        setCategories(data);
    }

    useEffect(() => {
        pushCategories();
    }, [])

    if (!user || !categories) {
        return (
            <div>what?</div>
        )
    }
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <div className="flex flex-col gap-4 bg-white rounded-2xl p-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Icon name="Tag" />
                        <h1>Categorias Padrão</h1>
                    </div>
                    <div>
                        <CreateNewCategoryModal categories={categories} setCategories={setCategories}>
                            <Button>
                                <Icon name="Plus" />
                                New
                            </Button>
                        </CreateNewCategoryModal>
                    </div>
                </div>
                <div className="max-h-80">
                    <TableCategory categories={categories} setCategories={setCategories}/>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-4">

            </div>
            <div className="bg-white rounded-2xl p-4">

            </div>
            <div className="col-span-3 bg-white rounded-2xl p-4">

            </div>
        </div>
    )
}