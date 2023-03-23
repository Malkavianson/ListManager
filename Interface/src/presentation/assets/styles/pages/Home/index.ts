/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled, { css } from "styled-components/macro";

export const SHome = styled.section`
	${({ theme }) => css`
		position: relative;
		background-color: ${theme.colors.baseBg1};
		width: 100vw;
		min-height: 89vh;
		color: ${theme.colors.textColor};
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 11vh;

		.selector {
			position: absolute;
			top: 12vh;
			left: 10%;
			background: ${theme.colors.baseBg2}77;
			z-index: 2;
			border-radius: 10rem;
			padding: 1.5rem 4rem;
			height: 7rem;
			font-size: 5rem;
			font-weight: 700;
			cursor: pointer;
			box-shadow: 0 0 1rem 0.3rem ${theme.colors.contrast1}77,
				inset 0 0 0.8rem 0 ${theme.colors.primaryColor}77;
		}

		.selector:hover {
			background: ${theme.colors.primaryColor}77;
		}
	`}
`;
