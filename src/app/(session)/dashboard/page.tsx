"use client";

import { Icon } from "@components/Icon";
import NewCategoryModal from "../../../components/modals/NewCategoryModal";
import { Button } from "@heroui/react";

export default function Page() {

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
                <div className="flex flex-row justify-between gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <Icon name="Type" />
                        <h1>Categorias</h1>
                    </div>
                    <div>
                        <NewCategoryModal/>
                    </div>
                </div>
                <div>
                    Listar categorias do usuario...
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