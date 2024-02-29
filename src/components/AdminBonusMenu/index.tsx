"use client";

import { AdminNav } from "@/globalStyles/AdminNav/style";
import { StyledTable, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore";
import {
  getTimeFromSeconds,
  getTotalSeconds,
  totalHoras,
} from "@/utils/operations";
import { useState } from "react";
import { StyledSection } from "./style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";

export const AdminBonusMenu = () => {
  const userList = userStore((state) => state.userList);
  const { adminActivePeriod } = adminStore((state) => state);
  const [bonusLimit, setBonusLimit] = useState<number>(0);

  const filteredList = () => {
    return userList.filter((user) => {
      const registros = user.registros_de_ponto.filter((ponto) => {
        const testingData = new Date(ponto.entrada);
        return (
          testingData >= adminActivePeriod!.start &&
          testingData <= adminActivePeriod!.end
        );
      });

      const horas = totalHoras(
        registros,
        adminActivePeriod!.start,
        adminActivePeriod!.end
      );
      
      if (bonusLimit === 0){
        return horas > 0;
      } else if(bonusLimit === 18000){
        return horas > 18000 && horas < 25200;
      } else if(bonusLimit === 25200){
        return horas > 25200 && horas < 35999;
      } else {
        return horas >= 36000;
      }
    });
  };

  return (
    <StyledSection>
      {!adminActivePeriod && (
        <p>Selecione Um Período para ver as listas de bonus</p>
      )}
      {adminActivePeriod && (
        <>
          <AdminNav>
            <AdminNavButton $selected={bonusLimit == 0 ? true : false} onClick={() => setBonusLimit(0)}>TODOS</AdminNavButton>
            <AdminNavButton $selected={bonusLimit == 36000 ? true : false} onClick={() => setBonusLimit(36000)}>100%</AdminNavButton>
            <AdminNavButton $selected={bonusLimit == 25200 ? true : false} onClick={() => setBonusLimit(25200)}>75%</AdminNavButton>
            <AdminNavButton $selected={bonusLimit == 18000 ? true : false} onClick={() => setBonusLimit(18000)}>50%</AdminNavButton>
          </AdminNav>
          <StyledTable>
            <thead>
              <tr>
                <ThTitleRow>Colaborador</ThTitleRow>
                <ThTitleRow>Passaporte</ThTitleRow>
                <ThTitleRow>Horas</ThTitleRow>
              </tr>
            </thead>
            <tbody>
              {filteredList()
                .sort(
                  (a, b) =>
                    getTotalSeconds(b.registros_de_ponto) -
                    getTotalSeconds(a.registros_de_ponto)
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.passaporte}</td>
                    <td>
                      {getTimeFromSeconds(
                        getTotalSeconds(user.registros_de_ponto)
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </StyledSection>
  );
};
