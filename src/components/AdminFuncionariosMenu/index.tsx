'use client'

import { AdminUserCard } from "@/fragments/AdminUserCard";
import { IUser } from "@/stores/@userTypes";
import { userStore } from "@/stores/userStore"
import { ChangeEvent, useEffect, useState } from "react";
import { StyledCardList, StyledSearch, StyledSection } from "./style";

type TFilter = {
    search: string
    list: IUser[]
    status: string // Adicionado para armazenar o status do filtro
}

export const AdminFuncionariosMenu = () => {
    const { userList } = userStore((state)=> state);
    const [ filter, setFilter ] = useState<TFilter>({
        search: '',
        list: [],
        status: '' // Inicializando o status do filtro
    });

    const handleFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        applyFilters(searchValue, filter.status);
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const statusValue = e.target.value;
        applyFilters(filter.search, statusValue);
    };

    const applyFilters = (searchValue: string, statusValue: string) => {
        const filteredList = userList.filter((user) => {
            const matchesSearch = 
                user.nome.toLowerCase().includes(searchValue) ||
                user.cargo.toLowerCase().includes(searchValue) ||
                user.setor.toLowerCase().includes(searchValue) ||
                user.passaporte.toLowerCase().includes(searchValue) ||
                user.discord_id.toLowerCase().includes(searchValue) ||
                user.funcao.toLowerCase().includes(searchValue) ||
                user.observacoes.toLowerCase().includes(searchValue) ||
                (user.licenca_medica && user.licenca_medica.crm && user.licenca_medica.crm.toLowerCase().includes(searchValue)); // Verificando se licenca_medica e crm não são undefined

            const matchesStatus = 
                statusValue === '' || // Se o status estiver vazio, não filtra por status
                (statusValue === 'true' && user.ativo) || // Se status for "ativo" e o usuário for ativo
                (statusValue === 'false' && !user.ativo); // Se status for "desativado" e o usuário for desativado

            return matchesSearch && matchesStatus;
        });
        setFilter({ search: searchValue, list: filteredList, status: statusValue });
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
                <label htmlFor="status">Status atual:</label>
                <select id="status" value={filter.status} onChange={(e) => handleStatusChange(e)}>
                    <option value="">TODOS</option>
                    <option value="true">✅ Ativo</option>
                    <option value="false">❌ Desligado</option>
                </select>
                <h1>Lista de usuários</h1>
                <p>Total de funcionários: {filter.list.length}</p>
            </StyledSearch>
            <StyledCardList>
                {filter?.list.map((user) => 
                <AdminUserCard key={user.id} user={user}/>)}
            </StyledCardList>
        </StyledSection>
    )
}
