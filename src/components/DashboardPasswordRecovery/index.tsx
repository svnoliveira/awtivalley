"use client";

import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRecoveryValues, recoverySchema } from "./schema";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledSection } from "./style";
import { Loading } from "@/fragments/Loading";
import { StyledModal, StyledX } from "@/globalStyles/StyledModal";

export const DashboardPasswordRecovery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { changePassword, loading } = userStore((state) => state);
  const user = userStore((state) => state.userData?.user);
  const token = userStore((state) => state.userData?.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRecoveryValues>({
    resolver: zodResolver(recoverySchema),
  });

  const parseRegisterData = async (userData: TRecoveryValues) => {
    const success = await changePassword(token!, user!, userData.senha);
    success && setModalOpen(false);
  };

  return (
    <StyledSection>
      <StyledSubmitButton
        $error={false}
        type="button"
        onClick={() => setModalOpen(true)}
      >
        Alterar Senha
      </StyledSubmitButton>
      {modalOpen && (
        <StyledModal role="dialog">
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
                <div>
                  <FormInput
                    type="password"
                    register={register("senha")}
                    error={errors.senha}
                  >
                    Digite a nova senha
                  </FormInput>
                  <FormInput
                    type="password"
                    register={register("confirmPassword")}
                    error={errors.confirmPassword}
                  >
                    Confirme a senha
                  </FormInput>
                </div>
                <StyledSubmitButton $error={false} type="submit">
                  Alterar senha
                </StyledSubmitButton>
              </>
            )}
          </form>
        </StyledModal>
      )}
    </StyledSection>
  );
};
