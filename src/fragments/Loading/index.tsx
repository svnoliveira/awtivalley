import { StyledSection } from "./style"

export const Loading = () => {
    return (
        <StyledSection>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </StyledSection>
    )
}