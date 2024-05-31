"use client";

import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { Loading } from "@/fragments/Loading";
import axios from 'axios';

import { TEditUserValues, editUserSchema } from "./schema";
import { IUser } from "@/stores/@userTypes";
import { StyledButton, StyledInputContainer, StyledEditModal, StyledSection, StyledX } from "./style";
import { removeEmptyStringKeys } from "@/utils/operations";

interface IAdminUserModalProps {
  user: IUser;
}

export const AdminUserModal = ({ user }: IAdminUserModalProps) => {
  const [modalOpen, setModalOpen] = useState<IUser | false>(false);
  const [loading, setLoading] = useState(false);
  const { editUser } = userStore((state) => state);
  const token = userStore((state) => state.userData?.accessToken);
  const { userData } = userStore((store) => store);
  const userId = userData?.user.id;
  const userName = userData?.user.nome;
  const userPassaporte = userData?.user.passaporte;
  const discordID = userData?.user.discord_id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditUserValues>({
    resolver: zodResolver(editUserSchema),
  });

  const sendWebhook = async () => {
    try {

      const webhookUrl = 'https://discord.com/api/webhooks/1209602152591527946/bS8k85czlDSOXNK5Bt_CItRjpZJ0AVDVfDiJXoU6cA5YfS4p2_0GjNk2E8xq-j9OxVHP';
      "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";

      const imageUrl =
        "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";

      const message =
        `:mega: O Gestor :busts_in_silhouette: **${userName}** | :identification_card: **${userPassaporte}** ID de cadastro: **${userId}**\n\n` +
        `Discord do Gestor: <@${discordID}>\n` +
        `🔄️ Alterou os dados do colaborador: ${user.nome} | ${user.passaporte}\n` +
        `Discord do colaborador: <@${user.discord_id}>\n` +
        `( ${imageUrl} )`;

      await axios.post(webhookUrl, {
        content: message,
      });

      console.log('Webhook enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
  };


  const parseRegisterData = async (userData: TEditUserValues) => {
    userData.funcao = userData.funcao || "";
    userData = removeEmptyStringKeys(userData);
    setLoading(true);

    const success = await editUser(token!, user.id, userData);
    setLoading(false);

    if (success) {
      setModalOpen(false);
      sendWebhook();
    }
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
                    <div>
                      <label htmlFor="status">
                        Status atual: {user.ativo ? "ativo" : "desativado"}
                      </label>
                      <select id="status" {...register("ativo")} defaultValue={user.ativo.toString()}>
                        <option value="">...</option>
                        <option value="true">✅ Ativo</option>
                        <option value="false">❌ Desligado</option>
                      </select>
                    </div>
                    <FormInput
                      type="text"
                      register={register("nome")}
                      error={errors.nome}
                    >
                      {user.nome}
                    </FormInput>
                  </div>
                  <div>
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
                  </div>
                  <div>
                    <label htmlFor="cargo">Cargo:</label>
                    <select id="cargo" {...register("cargo")} defaultValue={user.cargo}>
                      <option value="">...</option>
                      <option value="⚗️ Residente">⚗️ Residente</option>
                      <option value="🔬 Médico">🔬 Médico</option>
                      <option value="💉 Enfermagem">💉 Enfermagem</option>
                      <option value="🧪 Interno">🧪 Interno</option>
                      <option value="📚 Estagiário">📚 Estagiário</option>
                    </select>
                    <FormInput
                      type="text"
                      register={register("discord_id")}
                      error={errors.discord_id}
                    >
                      {user.discord_id ? user.discord_id : "Digite o usuário do discord"}
                    </FormInput>
                  </div>
                  <div>
                    <label htmlFor="setor">Setor:</label>
                    <select id="setor" {...register("setor")} defaultValue={user.setor}>
                      <option value="">...</option>
                      <option value="💊 Enfermaria">💊Enfermaria</option>                      
                      <option value="💻 Administrativo">💻 Administrativo</option>
                      <option value="✒️ Ingressos">✒️ Ingressos</option>
                      <option value="🚁 Aéreo">🚁 Aéreo</option>
                      <option value="👨‍🏫 Cursos">👨‍🏫 Cursos</option>
                      <option value="🎉 Integração">🎉 Integração</option>
                      <option value="🚒 Bombeiros">🚒 Bombeiros</option>
                    </select>

                    <label htmlFor="funcao">Função:</label>
                    <select id="funcao" {...register("funcao")} defaultValue={user.funcao}>
                      <option value="">...</option>
                      <option value="💼 Diretoria Geral">💼 Diretoria Geral</option>
                      <option value="📋 Diretor Administrativo">📋 Diretor Administrativo</option>
                      <option value="💰 Diretor Financeiro">💰 Diretor Financeiro</option>
                      <option value="📝 Diretor Supervisor">📝 Diretor Supervisor</option>
                      <option value="🥼 Supervisor">🥼 Supervisor</option>
                      <option value="📋 Coordenador Geral">📋 Coordenador Geral</option>
                      <option value="🔖 Coordenador">🔖 Coordenador</option>
                      <option value="🧠 Coord. Saúde Mental">🧠 Coord. Saúde Mental</option>
                      <option value="💪 Coord. Saúde Físico-Motora">💪 Coord. Saúde Físico-Motora</option>
                      <option value="🎉 Coord. Integração">🎉 Coord. Integração</option>
                      <option value="✒️ Coord. Ingressos">✒️ Coord. Ingressos</option>
                      <option value="🧾 Coord. Cursos">🧾 Coord. Cursos</option>
                      <option value="🔪 Coord. Cirúrgica">🔪 Coord. Cirúrgica</option>
                      <option value="🚁 Coord. Aéreo">🚁 Coord. Aéreo</option>
                      <option value="🚁 Inst. Chef Aéreo">🚁 Inst. Chef Aéreo</option>
                      <option value="🚁 Inst. Aereo">🚁 Inst. Aereo</option>
                      <option value="🚁 Aux. Aéreo">🚁 Aux. Aéreo</option>
                      <option value="🧾 Inst. Curso">🧾 Inst. Curso</option>
                      <option value="🧾 Aux. Curso">🧾 Aux. Curso</option>
                      <option value="🎉 Aux. Integração">🎉 Aux. Integração</option>
                      <option value="✒️ Aux. Ingresso">✒️ Aux. Ingresso</option>
                      <option value="📚 Ingresso Treinamento">📚 Ingresso Treinamento</option>
                      <option value="🧠 Aux. Saúde Mental">🧠 Aux. Saúde Mental</option>
                      <option value="💻 T.I. do CMA">💻 T.I. do CMA</option>
                    </select>
                    <FormInput
                      type="text"
                      register={register("funcoes_extra")}
                      error={errors.funcoes_extra}
                    >
                      {user.funcoes_extra}
                    </FormInput>
                  </div>
                  <div>
                    <FormInput
                      type="date"
                      register={register("efetivacao")}
                      error={errors.efetivacao}
                    >
                      {user.efetivacao}
                    </FormInput>
                    <FormInput
                      type="date"
                      register={register("ultima_promocao")}
                      error={errors.ultima_promocao}
                    >
                      {user.ultima_promocao}
                    </FormInput>
                    <FormInput
                      type="text"
                      register={register("observacoes")}
                      error={errors.observacoes}
                    >
                      {user.observacoes}
                    </FormInput>
                    <FormInput
                      type="text"
                      register={register("hab_aereo")}
                      error={errors.hab_aereo}
                    >
                      {user.hab_aereo}
                    </FormInput>
                    <FormInput
                      type="text"
                      register={register("ciclo")}
                      error={errors.ciclo}
                    >
                      {user.licenca_medica.ciclo}
                    </FormInput>
                    <FormInput
                      type="date"
                      register={register("data")}
                      error={errors.data}
                    >
                      {user.licenca_medica.data}
                    </FormInput>
                    <FormInput
                      type="text"
                      register={register("responsavel")}
                      error={errors.responsavel}
                    >
                      {user.licenca_medica.responsavel}
                    </FormInput>
                    <FormInput
                      type="text"
                      register={register("crm")}
                      error={errors.crm}
                    >
                      {user.licenca_medica.crm}
                    </FormInput>
                  </div>
                  <div>
                    <StyledButton type="submit">
                      Alterar Usuário
                    </StyledButton>
                  </div>
                </StyledInputContainer>
              </>
            )}
          </form>
        </StyledEditModal>
      )}
    </StyledSection>
  );
};
