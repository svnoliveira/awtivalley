'use client'

import { AdminUserCard } from "@/fragments/AdminUserCard";
import { IUser } from "@/stores/@userTypes";
import { userStore } from "@/stores/userStore"
import { ChangeEvent, useEffect, useState } from "react";
import { StyledCardList, StyledSearch, StyledSection } from "./style";

type TFilter = {
    search: string
    list: IUser[]
}

export const AdminFuncionariosMenu = () => {
    const { userList } = userStore((state)=> state);
    const [ filter, setFilter ] = useState<TFilter>({
        search: '',
        list: []
    });

    const handleFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredList = userList.filter((user) =>
            user.nome.toLowerCase().includes(searchValue) ||
            user.cargo.toLowerCase().includes(searchValue) ||
            user.setor.toLowerCase().includes(searchValue) ||
            user.passaporte.toLowerCase().includes(searchValue) ||
            user.discord_id.toLowerCase().includes(searchValue) ||
            user.funcao.toLowerCase().includes(searchValue) ||
            user.observacoes.toLowerCase().includes(searchValue) ||
            (user.licenca_medica && user.licenca_medica.crm && user.licenca_medica.crm.toLowerCase().includes(searchValue)) // Verificando se licenca_medica e crm não são undefined
        );
        setFilter({ list: filteredList, search: searchValue });
    };
       
    useEffect(() => {
        const loadList = () => {
            if (userList){
                setFilter({...filter, list: [...userList]});
            }
        }
        loadList();
    },[userList])

    return (
        <StyledSection>
                <StyledSearch>
                    <h2>Pesquisa</h2>
                    <input type="text" name="filter-list" id="filterlist" 
                    placeholder="Pesquise um funcionário"
                    onChange={(e) => handleFilterInput(e)}
                    />
                    <h1>Lista de usuários</h1>
                </StyledSearch>
                <StyledCardList>
                    {filter?.list.map((user) => 
                    <AdminUserCard key={user.id} user={user}/>)}
                </StyledCardList>
        </StyledSection>
    )
}