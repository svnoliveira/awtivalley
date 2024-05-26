"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TPeriodValues, periodSchema } from "./schema";
import { adminStore } from "@/stores/adminStore";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledForm, StyledSearch, StyledSection } from "./style";

export const AdminDateSelector = () => {
  const { setAdminActivePeriod } = adminStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPeriodValues>({
    resolver: zodResolver(periodSchema),
  });

  const parseData = async ({ inicio, fim }: TPeriodValues) => {
    const start = new Date(inicio + " 00:00:00");
    const end = new Date(fim + " 00:00:00");
    end.setDate(end.getDate() + 1);
    setAdminActivePeriod({ start, end });
  };

  const checkError = () => {
    if (errors.inicio || errors.fim) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledSection>
      <StyledSearch>
        <StyledForm onSubmit={handleSubmit((formData) => parseData(formData))}>
          <input type="date" {...register("inicio")} />
          {errors && <p>{errors.inicio?.message}</p>}
          <input type="date" {...register("fim")} />
          {errors && <p>{errors.fim?.message}</p>}
          <StyledSubmitButton $error={checkError()} type="submit">
            Filtrar
          </StyledSubmitButton>
        </StyledForm>
        <h3>Selecione um período</h3>
      </StyledSearch>
    </StyledSection>
  );
};
