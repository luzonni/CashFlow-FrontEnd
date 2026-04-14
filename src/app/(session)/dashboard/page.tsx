"use client";

import { Icon } from "@components/Icon";
import NewCategoryModal from "./NewCategoryModal";
import TableCategory from "./TableCategory";
import { useEffect, useState } from "react";
import GroupCategory from "@models/GroupCategory";
import { API } from "@services/API";
import { toast } from "@heroui/react";
import Category from "@models/Category";
import { listAll } from "@services/GroupCategoryService";

export default function Page() {
    const [groupCategories, setGroupCategories] = useState<GroupCategory[]>([]);

    async function fetchCategories() {
        const data: GroupCategory[] = await listAll();
        setGroupCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    },[])

    

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
                <div className="flex flex-row justify-between gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <Icon name="Type" />
                        <h1>Categorias</h1>
                    </div>
                    <div>
                        <NewCategoryModal groups={groupCategories} setGroups={setGroupCategories}/>
                    </div>
                </div>
                <div className="felx flex-col gap-1">
                    <TableCategory groups={groupCategories} setGroups={setGroupCategories}/>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-4">
                <p>Calendario para o controle diatio.</p>
                <p>Com o dia selecionado, será possivel inserir, remover ou editar gastos ou recebimentos daquele determinado dia.</p>
            </div>
            <div className="bg-white rounded-2xl p-4">
                <p>Controle de recorrências.</p>
            </div>
            <div className="col-span-3 bg-white rounded-2xl p-4">
                <p>container principal.</p>
                <p>Aqui estára a tabela do dia, onde terão todos os valores, tipos, total, 10%, perdas, danos, etc...</p>
            </div>
        </div>
    )
}