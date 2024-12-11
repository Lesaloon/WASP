import ITokenResponses from "./ITokenResponses.interface";

export default interface ICustomResponses {
	status: "success" | "error";
	payload: Array<any> | Object;
	token?: ITokenResponses;
	error?: {
		message: string | undefined;
		stack: string | undefined;
		name: string | undefined;
	};
}