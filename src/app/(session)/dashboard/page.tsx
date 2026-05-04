"use client";

import SectionCategory from "./(categorySection)/SectionCategory";

export default function Page() {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
                <SectionCategory/>
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