import { theme } from "../../theme";
import styled, { css, Interpolation, keyframes } from "styled-components/macro";
import { MenuItemButtonProps } from "types";

const toRight = keyframes`
  0% {
    position: relative;
    left: -50vw;
    opacity: 0;
  }
 100% {
  position: relative;
  left: 0px;
  opacity: 1;
 }`;

export const SBackgroundForm = styled.div<MenuItemButtonProps>`
	height: auto;
	width: 75rem;
	padding: 1em;
	background: #252525;
	border-radius: 1em;
	box-shadow: 1px 1px 4px 1px ${theme.colors.primaryColor};
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
	align-items: center;
	${({ active }: MenuItemButtonProps): Interpolation<MenuItemButtonProps> => {
		return (
			!active &&
			css`
				animation: ${toRight} 2s normal;
			`
		);
	}}

	h1 {
		font-size: 4em;
	}
`;

export const SSwicherContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	#forgot {
		cursor: pointer;
		&:hover {
			transform: scale(0.98);
		}
	}

	p {
		font-size: 2.5em;
	}
`;

export const SSwicherButtom = styled.button`
	height: 2.5em;
	width: 5.5em;
	background: transparent;
	color: ${theme.colors.primaryColor};
	border: none;
	border-radius: 0.5em;
	font-family: ${theme.constants.bodyFontFamily};
	font-size: 2.5em;
	cursor: pointer;

	&:hover {
		transform: scale(0.98);
	}
`;

export const SSubmitButtom = styled.button`
	position: relative;
	left: calc(50% - 3em);
	height: 2em;
	width: 6em;
	background: ${theme.colors.primaryColor};
	color: ${theme.colors.contrast1};
	border: none;
	border-radius: 2em;
	margin-top: 1em;
	font-family: ${theme.constants.bodyFontFamily};
	font-size: 16px;
	cursor: pointer;

	&:hover {
		transform: scale(0.98);
	}
`;

export const SContainerVerification = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SVerificationResponse = styled.span`
	font-size: 2.5em;
	font-style: italic;
	margin: 0 1em 1em 1.5em;
`;
