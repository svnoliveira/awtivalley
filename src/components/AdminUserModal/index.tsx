"use client";

import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { Loading } from "@/fragments/Loading";

import { TEditUserValues, editUserSchema } from "./schema";
import { IUser } from "@/stores/@userTypes";
import { StyledButton, StyledInputContainer, StyledEditModal, StyledSection, StyledX } from "./style";
import { removeEmptyStringKeys } from "@/utils/operations";

interface IAdminUserModalProps {
    user: IUser;
}

export const AdminUserModal = ({user}:IAdminUserModalProps) => {
  const [modalOpen, setModalOpen] = useState<IUser | false>(false);
  const { loading, editUser } = userStore((state) => state);
  const token = userStore((state) => state.userData?.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditUserValues>({
    resolver: zodResolver(editUserSchema),
  });

  const parseRegisterData = async (userData: TEditUserValues) => {
    userData = removeEmptyStringKeys(userData);
    const success = await editUser(token!, user.id, userData);
    success && setModalOpen(false);
  };
  return (
    <StyledSection>
      <StyledSubmitButton
        $error={false}
        type="button"
        onClick={() => setModalOpen(user)}
      >
        Editar
      </StyledSubmitButton>
      {modalOpen === user && (
        <StyledEditModal role="dialog">
          <form
            onSubmit={handleSubmit((formData) => parseRegisterData(formData))}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <StyledX type="button" onClick={() => setModalOpen(false)}>
                  X
                </StyledX>
                <StyledInputContainer>
                  <div>
                    <label htmlFor="status">
                      Status atual: {user.ativo ? "ativo" : "desativado"}
                    </label>
                    <select id="status" {...register("ativo")}>
                      <option value="">...</option>
                      <option value="true">Ativo</option>
                      <option value="false">Desativado</option>
                    </select>
                  </div>
                  <FormInput
                    type="text"
                    register={register("nome")}
                    error={errors.nome}
                  >
                    {user.nome}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("passaporte")}
                    error={errors.passaporte}
                  >
                    {user.passaporte}
                  </FormInput>
                  <FormInput
                    type="password"
                    register={register("senha")}
                    error={errors.senha}
                  >
                    Digite a nova senha
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("cargo")}
                    error={errors.cargo}
                  >
                    {user.cargo ? user.cargo : "Digite o Cargo"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("discord_id")}
                    error={errors.discord_id}
                  >
                    {user.discord_id ? user.discord_id : "Digite o usuário do discord"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("setor")}
                    error={errors.setor}
                  >
                    {user.setor ? user.setor : "Digite o setor"}
                  </FormInput>
                  <FormInput
                    type="date"
                    register={register("efetivacao")}
                    error={errors.efetivacao}
                  >
                    {user.efetivacao ? user.efetivacao : "Escolha a data de efetivacao"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("funcao")}
                    error={errors.funcao}
                  >
                    {user.funcao ? user.funcao : "Digite a função"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("funcoes_extra")}
                    error={errors.funcoes_extra}
                  >
                    {user.funcoes_extra ? user.funcoes_extra : "Digite as funções extra"}
                  </FormInput>
                  <FormInput
                    type="date"
                    register={register("ultima_promocao")}
                    error={errors.ultima_promocao}
                  >
                    {user.ultima_promocao ? user.ultima_promocao : "Escolha a data da última promoção"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("observacoes")}
                    error={errors.observacoes}
                  >
                    {user.observacoes ? user.observacoes : "Digite as observações"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("ciclo")}
                    error={errors.ciclo}
                  >
                    {user.licenca_medica.ciclo ? user.licenca_medica.ciclo : "Digite o ciclo da licença médica"}
                  </FormInput>
                  <FormInput
                    type="date"
                    register={register("data")}
                    error={errors.data}
                  >
                    {user.licenca_medica.data ? user.licenca_medica.data : "Digite a data da licença médica"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("responsavel")}
                    error={errors.responsavel}
                  >
                    {user.licenca_medica.responsavel ? user.licenca_medica.responsavel : "Digite o nome do responsável pela licença médica"}
                  </FormInput>
                  <FormInput
                    type="text"
                    register={register("crm")}
                    error={errors.crm}
                  >
                    {user.licenca_medica.crm ? user.licenca_medica.crm : "Digite o crm da licença médica"}
                  </FormInput>
                </StyledInputContainer>
                <StyledButton type="submit">
                  Alterar Usuário
                </StyledButton>
              </>
            )}
          </form>
        </StyledEditModal>
      )}
    </StyledSection>
  );
};
