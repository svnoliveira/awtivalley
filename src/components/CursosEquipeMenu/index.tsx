'use client'


import { AdminUserCard } from "@/fragments/AdminUserCard";
import { IUser } from "@/stores/@userTypes";
import { userStore } from "@/stores/userStore"
import { ChangeEvent, useEffect, useState } from "react";
import { StyledCardList, StyledSearch, StyledSection } from "./style";

type TFilter = {
    search: string;
    list: IUser[];
};

export const CursosEquipeMenu = () => {
    const { userList } = userStore((state) => state);
    const [filter, setFilter] = useState<TFilter>({
        search: "",
        list: [],
    });

    const handleFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredList = userList.filter((user) =>
            user.setor.toLowerCase().includes("👨‍🏫 cursos") &&
            (user.nome.toLowerCase().includes(searchValue) ||
                user.cargo.toLowerCase().includes(searchValue) ||
                user.passaporte.toLowerCase().includes(searchValue) ||
                user.discord_id.toLowerCase().includes(searchValue) ||
                user.funcao.toLowerCase().includes(searchValue) ||
                user.observacoes.toLowerCase().includes(searchValue) ||
                (user.licenca_medica &&
                    user.licenca_medica.crm &&
                    user.licenca_medica.crm.toLowerCase().includes(searchValue)))
        );
        setFilter({ list: filteredList, search: searchValue });
    };

    useEffect(() => {
        if (userList) {
            const filteredList = userList.filter(
                (user) => user.setor.toLowerCase().includes("👨‍🏫 cursos")
            );
            setFilter({ list: filteredList, search: filter.search });
        }
    }, [userList]);

    return (
        <StyledSection>
            <StyledSearch>
                <h2>Pesquisa</h2>
                <input
                    type="text"
                    name="filter-list"
                    id="filterlist"
                    placeholder="Pesquise um funcionário"
                    onChange={(e) => handleFilterInput(e)}
                />
                <h1>Lista da equipe</h1>
            </StyledSearch>
            <StyledCardList>
                {filter?.list.map((user) => (
                    <AdminUserCard key={user.id} user={user} />
                ))}
            </StyledCardList>
        </StyledSection>
    );
};
