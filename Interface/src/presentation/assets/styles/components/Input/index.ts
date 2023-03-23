import styled from "styled-components/macro";
import { theme } from "../../theme";

export const Values = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-content: center;
	gap: 0.5em;
	font-size: 8px;
	label {
		font-size: 14px;
		margin-bottom: 0.7em;
		color: ${theme.colors.baseLine};
	}
	input {
		height: 35px;
		margin-bottom: 0.7em;
		background: ${theme.colors.baseBg2};
		color: ${theme.colors.primaryColor};
		border: none;
		border-radius: 0.5em;
		padding-left: 1em;
		outline: 0;
	}
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		-webkit-text-fill-color: ${theme.colors.baseLine};
		box-shadow: 0 0 0px 100px ${theme.colors.baseBg2} inset;
		transition: background-color 5000s ease-in-out 0s;
	}
`;

export const Blind = styled.span`
	position: absolute;
	right: 0.5em;
	bottom: calc(50% - 1.2em);
	max-height: 100%;
	font-size: 2em;
	text-shadow: 0 0 1px #fff;
	color: #000b;
	cursor: pointer;
`;
