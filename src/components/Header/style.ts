import styled from "styled-components";

export const StyledHeader = styled.header`
  background: linear-gradient(
    to bottom,
    transparent,
    var(--background-start)
  )
  var(--background-start);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  height: 130px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.75);
`

export const StyledImageContainer = styled.div`
  width: min(50%, 300px);
  height: 130px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export const StyledNav = styled.nav`
  display: flex;
  gap: 10px;

  .user-card {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    gap: 10px;
  }

  .dropdown {
    position: absolute;
    display: flex;
    width: 180px;
    top: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .logout-btn {
    border: none;
    background-color: transparent;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
`

export const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  cursor: pointer;

  > img:hover {
    box-shadow: 1px 1px 5px 0px rgba(255,255,255,1);
  }
`