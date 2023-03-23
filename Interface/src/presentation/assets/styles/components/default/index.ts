import { theme } from "../../theme";
import styled, { css, Interpolation } from "styled-components/macro";
import { IHomeComponentsContainer, IHomeComponentsRow } from "types";

export const SHomeComponentsContainer = styled.div<IHomeComponentsContainer>`
	box-shadow: inset 0 0 0.25rem 0.5rem #00000022;
	width: 95%;
	min-height: 50vh;
	padding: 2rem;
	border-radius: 8px;
	margin-bottom: 1rem;

	${({ scroll }): Interpolation<IHomeComponentsContainer> => {
		switch (scroll) {
			case "side":
				return (
					scroll &&
					css`
						display: flex;
						overflow-x: hidden;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;
					`
				);
			case "down":
				break;

			default:
				return css`
					display: flex;
				`;
		}
	}}
`;
export const SHomeComponentsSelectors = styled.div`
	width: 100%;
	min-height: 15rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	gap: 5rem;
`;
export const SHomeComponentsTitle = styled.h2`
	font-size: 20px;
	width: 25rem;
	margin-bottom: 10px;
	border-radius: 3rem;
	padding: 2rem 3rem;
	text-align: center;
	cursor: pointer;
	box-shadow: 0 0 1rem 0.3rem ${theme.colors.secondaryColor}55,
		inset 0 0 2rem 0.5rem ${theme.colors.secondaryColor}77;
`;

export const SHomeComponentsRow = styled.div<IHomeComponentsRow>`
	height: calc(100% - 30px);
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	justify-content: flex-start;
	padding-bottom: 2rem;
	gap: 5rem;
	flex-wrap: wrap;

	${({ type, align }): Interpolation<IHomeComponentsRow> => {
		switch (type) {
			case "mini":
				return css`
					flex-wrap: wrap;
					}
				`;

			case "overflow":
				return css`
					${align === "start" &&
					css`
						justify-content: flex-start;
					`}
					${align === "center" &&
					css`
						justify-content: space-between;
					`}
					overflow-x: auto;
					&::-webkit-scrollbar-track {
						background-color: #3333cc;
					}
					&::-webkit-scrollbar {
						width: 0.8vw;
						background: #3333cc;
					}
					&::-webkit-scrollbar-thumb {
						background: #5353ec;
						box-shadow: 0 0 3rem 0 #3333cc,
							inset 0 0 1.8rem 0.5rem #ffffff33;
						border-radius: 20px;
					}
				`;

			default:
				return css`
					flex-wrap: wrap;
				`;
		}
	}}
	overflow-x: auto;

	&::-webkit-scrollbar-track {
		background-color: #3333cc;
	}
	&::-webkit-scrollbar {
		height: 1vh;
		background: #5353ec;
	}
	&::-webkit-scrollbar-thumb {
		background: #5353ec;
		box-shadow: 0 0 3rem 0 #3333cc, inset 0 0 1.8rem 0.5rem #3333cc33;
		border-radius: 20px;
	}
`;

export const SArrowBack = styled.div`
	font-size: 40px;
	border: solid 1px #fff;
	border: none;
	cursor: pointer;
`;

export const SArrowFoward = styled.div`
	font-size: 40px;
	border: solid 1px #fff;
	border: none;
	cursor: pointer;
`;
