'use client'

import { AdminUserCard } from "@/fragments/AdminUserCard";
import { IUser } from "@/stores/@userTypes";
import { userStore } from "@/stores/userStore"
import { ChangeEvent, useEffect, useState } from "react";

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

    const handleFilterInput = (e:ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredList = userList.filter((user) => 
            user.nome.toLowerCase().includes(searchValue) ||
            user.cargo.toLowerCase().includes(searchValue) ||
            user.setor.toLowerCase().includes(searchValue) ||
            user.passaporte.toLowerCase().includes(searchValue) ||
            user.discord_id.toLowerCase().includes(searchValue) ||
            user.funcao.toLowerCase().includes(searchValue)
        );
        setFilter({list: filteredList, search: searchValue});
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
        <section>
            <div>
                <h1>Lista de usuários</h1>
                <div>
                    <h2>Pesquisa</h2>
                    <input type="text" name="filter-list" id="filterlist" 
                    placeholder="Pesquise pelo nome do usuário"
                    onChange={(e) => handleFilterInput(e)}
                />
                </div>
                <ul>
                    {filter?.list.map((user) => 
                    <AdminUserCard key={user.id} user={user}/>)}
                </ul>
            </div>
        </section>
    )
}