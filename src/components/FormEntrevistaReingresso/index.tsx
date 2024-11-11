import { StyledContainer, StyledList, StyledSection } from "./style";
import { userStore } from "@/stores/userStore";


export const FormEntrevistaReingresso = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Entrevista COM Reingressos</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSenPSF84J004vYnKLYZBpLp27J8eBdPtrkm_EIpfBPf-HUs7A/viewform?embedded=true"
            width="640"
            height="2667"
            style={{ border: "none", margin: "0" }} // Utilize CSS inline para estilos
            title="Google Form"
          >
            Carregando…
          </iframe>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};